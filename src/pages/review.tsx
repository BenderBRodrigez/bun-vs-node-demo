import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { type InterviewPublic, ReviewDimension } from "../api/generated-types";
import { useApi } from "../api/use-api";
import { AnswerCard } from "../components/answer-card";
import { Card } from "../components/card";
import { Logo } from "../components/logo";
import { QuestionCard } from "../components/question-card";
import { QuestionDivider } from "../components/question-divider";
import { ReviewPlaceholder } from "../components/review-placeholder";
import { Spinner } from "../components/spinner";
import { useReviewWs } from "../hooks/use-review-ws";

const circleStyles = {
  specificity: "border-app-green-8",
  pragmatism: "border-app-indigo-14",
  empathy: "border-app-violet-5",
  clarity: "border-amber-200",
};

const barStyles = {
  specificity: "bg-app-green-5",
  pragmatism: "bg-app-indigo-8",
  empathy: "bg-app-violet-4",
  clarity: "bg-amber-500",
};

const textStyles = {
  specificity: "text-app-green-5",
  pragmatism: "text-app-indigo-8",
  empathy: "text-app-violet-4",
  clarity: "text-amber-500",
};

const cardStyles = {
  specificity: "bg-app-green-1 border-app-green-8",
  pragmatism: "bg-app-indigo-2 border-app-indigo-14",
  empathy: "bg-app-violet-1 border-app-violet-5",
  clarity: "bg-amber-50 border-amber-200",
};

export function Review() {
  const { interviewId } = useParams<{ interviewId: string }>();
  const { onError } = useApi();

  const {
    data: interview,
    isPending,
    isError,
  } = useQuery<InterviewPublic>({
    queryKey: [
      `interview/${interviewId}`,
      { expand: ["questions", "reviews"] },
    ],
    enabled: !!interviewId,
    throwOnError: onError,
  });
  const reviews = interview?.reviews ?? [];

  useReviewWs(
    interviewId,
    interview?.status === "completed" && !reviews.length,
  );

  const totalQuestions = interview?.questions?.length ?? 0;

  const [generalQuestions, clarificationQuestions] = useMemo(
    () =>
      interview?.questions?.reduce(
        (acc, q) => {
          if (q.attempt === 0) {
            acc[0]++;
          } else {
            acc[1]++;
          }
          return acc;
        },
        [0, 0],
      ) ?? [0, 0],
    [interview?.questions],
  );
  const questions = useMemo(
    () =>
      (interview?.questions ?? []).sort((a, b) => {
        if (a.number !== b.number) {
          return a.number - b.number;
        }
        return a.attempt - b.attempt;
      }),
    [interview?.questions],
  );

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Review link copied");
  }, []);

  const header = useMemo(
    () => (
      <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-center relative">
        <Logo className="absolute left-6" theme="light" size="sm" />
        <span className="text-xs font-semibold text-app-gray-5 bg-app-gray-3 border border-app-gray-2 rounded-xl px-3 py-1">
          Interview Review
        </span>
      </header>
    ),
    [],
  );

  if (isError || isPending) {
    return (
      <div className="min-h-screen bg-app-gray-2">
        {header}
        <ReviewPlaceholder />
      </div>
    );
  }

  if (interview?.status !== "completed") {
    return <Navigate replace to="/not-found" />;
  }

  return (
    <div className="min-h-screen bg-app-gray-2">
      {header}

      <div className="max-w-[1320px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-5 items-start sm:px-6">
        <Card theme="light" className="lg:sticky lg:top-6">
          <p className="font-semibold text-gray-900 text-base">
            {interview.username}
          </p>
          {interview.email && (
            <p className="text-sm mt-0.5">{interview.email}</p>
          )}

          <div className="border-t border-gray-100 mt-4 pt-4 space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span>Interview</span>
              <span className="font-medium text-gray-800">
                {interview.created_at &&
                  new Date(interview.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>General questions</span>
              <span className="font-medium text-gray-800">
                {generalQuestions} asked
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Clarification questions</span>
              <span className="font-medium text-gray-800">
                {clarificationQuestions} asked
              </span>
            </div>
            <div className="flex items-center text-sm">
              <button
                type="button"
                title="Save this link to access your results later."
                className="hover:text-app-gray-8 cursor-pointer"
                onClick={copyLink}
              >
                Copy review link
              </button>
            </div>
          </div>
        </Card>

        <Card theme="light" className="min-h-120 lg:min-h-[calc(100vh-6rem)]">
          <h2 className="font-semibold text-gray-900 text-base">
            Interview Transcript
          </h2>
          <p className="text-sm mt-0.5 mb-5">
            {totalQuestions} questions · audio responses
          </p>

          {!reviews.length ? (
            <Spinner className="flex-1" />
          ) : (
            <div className="space-y-4">
              {questions.map((q, idx) => (
                <div key={q.id}>
                  {(idx === 0 || q.number !== questions[idx - 1]?.number) && (
                    <QuestionDivider index={q.number + 1} />
                  )}
                  <QuestionCard question={q.text} />

                  {q.answer_transcription && (
                    <AnswerCard
                      key={q.id + q.attempt}
                      userName={interview.username}
                      answer={q.answer_transcription}
                      audioUrl={q.answer_audio}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card theme="light" className="lg:sticky lg:top-6">
          <h2 className="font-semibold text-gray-900 text-base">
            SPEC Evaluation
          </h2>
          <p className="text-sm mt-0.5 mb-4">AI-scored across 4 dimensions</p>

          <div className="space-y-3">
            {Object.values(ReviewDimension).map((dimension) => {
              const review = reviews.find(
                (item) => item.dimension === dimension,
              );
              return (
                <div
                  key={dimension}
                  className={twMerge([
                    "rounded-xl border p-4 bg-app-gray-1",
                    review && cardStyles[review.dimension],
                  ])}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={twMerge([
                          "size-7 rounded-full flex items-center justify-center text-xs font-bold bg-white border",
                          review && circleStyles[review.dimension],
                          review && textStyles[review.dimension],
                        ])}
                      >
                        {dimension.charAt(0).toUpperCase()}
                      </span>
                      <span
                        className={twMerge([
                          "text-sm font-semibold",
                          review && textStyles[review.dimension],
                        ])}
                      >
                        {dimension.charAt(0).toUpperCase() + dimension.slice(1)}
                      </span>
                    </div>
                    {review && (
                      <span
                        className={twMerge([
                          "text-[10px] self-start font-semibold px-2 py-0.5 rounded-full bg-white",
                          review
                            ? textStyles[review.dimension]
                            : "text-gray-600",
                        ])}
                      >
                        {review.rating}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2.5">
                    <div
                      className={twMerge([
                        "text-3xl font-bold",
                        review && textStyles[review.dimension],
                      ])}
                    >
                      {review?.score ?? "00"}
                    </div>
                    <div className="h-1.5 bg-black/8 rounded-full w-full">
                      <div
                        className={twMerge([
                          "h-full rounded-full",
                          review && barStyles[review.dimension],
                        ])}
                        style={{ width: review ? `${review.score}%` : 0 }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 leading-snug mt-2">
                    {review?.description ?? ""}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
