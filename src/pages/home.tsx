import BadgeIcon from "../icons/badge.svg?react";
import BarChartIcon from "../icons/bar-chart.svg?react";
import { Card } from "../components/card";
import ClockIcon from "../icons/clock.svg?react";
import GlobeIcon from "../icons/globe.svg?react";
import { HomeFeature } from "../components/home-feature";
import { HomeFeatureCard } from "../components/home-feature-card";
import { Logo } from "../components/logo";
import MessageIcon from "../icons/message.svg?react";
import ShieldIcon from "../icons/shield.svg?react";
import { UserForm } from "../components/user-form";
import { VacancyPublic } from "../api/generated-types";
import { useApi } from "../api/use-api";
import { useQuery } from "@tanstack/react-query";

export function Home() {
  const { onError } = useApi();

  const { data } = useQuery<VacancyPublic[]>({
    queryKey: ["vacancies"],
    throwOnError: onError,
  });
  const vacancy = data?.[0];

  return (
    <div className="min-h-screen bg-app-gray-1 flex flex-col items-center justify-between p-7.5">
      <div className="mb-6">
        <Logo theme="light" size="lg" />
      </div>

      <Card
        theme="light"
        className="max-w-md p-0 overflow-hidden shadow-app-card-light"
      >
        <div className="h-1 w-full bg-linear-to-r from-app-indigo-9 via-app-purple-1 to-app-fuchsia-1" />
        <div className="px-8 pt-9">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {vacancy?.title}
            </h1>
            <p className="text-sm leading-relaxed">
              You've been invited to complete an AI-led interview.
              <br />
              This takes approximately 15–20 minutes.
            </p>

            <div className="flex items-center justify-center gap-4 my-5 text-xs">
              {[
                {
                  IconComponent: ClockIcon,
                  text: "15–20 minutes",
                },
                {
                  IconComponent: GlobeIcon,
                  text: "English",
                },
                {
                  IconComponent: MessageIcon,
                  text: `${vacancy?.question_count ?? 0} questions`,
                },
              ].map((props, i) => (
                <HomeFeature key={i} index={i} {...props} />
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {[
                {
                  IconComponent: MessageIcon,
                  iconColor: "text-app-indigo-11",
                  bg: "bg-app-indigo-2",
                  title: "Talk with AI interviewer",
                  desc: "Answer 5 questions with Vera, our AI interviewer. Speak naturally — there are no trick questions.",
                },
                {
                  IconComponent: BarChartIcon,
                  iconColor: "text-app-violet-3",
                  bg: "bg-app-violet-1",
                  title: "AI scores your answers",
                  desc: "Your responses are evaluated across Specificity, Pragmatism, Empathy, and Clarity (SPEC).",
                },
                {
                  IconComponent: BadgeIcon,
                  iconColor: "text-app-green-4",
                  bg: "bg-app-green-1",
                  title: "See your results",
                  desc: "Receive a detailed SPEC breakdown and see how your answers compare to top candidates.",
                },
              ].map((props) => (
                <HomeFeatureCard key={props.title} {...props} />
              ))}
            </div>

            <UserForm vacancyId={vacancy?.id}>
              <div className="text-left bg-blue-50/60 border border-app-indigo-3 rounded-xl p-4 mb-4">
                <div className="flex gap-3 mb-1.5">
                  <ShieldIcon className="size-3.5 my-1 text-app-indigo-7 shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-app-indigo-13">
                      Fair & bias-free evaluation
                    </span>
                    <p className="text-xs text-app-indigo-9 leading-relaxed">
                      Candid's AI is trained to evaluate skills, not
                      demographics. Your responses are never used for model
                      training. All interviews are reviewed by a human
                      recruiter.
                    </p>
                  </div>
                </div>
              </div>
            </UserForm>
          </div>
        </div>
      </Card>

      <p className="mt-14 text-xs text-app-gray-4">
        Powered by <span className="text-app-indigo-7 font-medium">candid</span>
        {" · "}AI-led hiring
      </p>
    </div>
  );
}
