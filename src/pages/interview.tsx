import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type {
  InterviewQuestionPublic,
  VacancyPublic,
} from "../api/generated-types";
import type { MutationVariables } from "../api/types";
import { useApi } from "../api/use-api";
import { Card } from "../components/card";
import { Header } from "../components/header";
import { LogoAvatar } from "../components/logo-avatar";
import { MicButton } from "../components/mic-button";
import { SoundIndicator } from "../components/sound-indicator";
import SkipForwardIcon from "../icons/skip-forward.svg";

export function Interview() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { question: initialQuestion, interviewId } = state ?? {};
  const [question, setQuestion] =
    useState<InterviewQuestionPublic>(initialQuestion);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext>(null);
  const mediaRecorderRef = useRef<MediaRecorder>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  const { mutationFn, onError } = useApi();

  const { data } = useQuery<VacancyPublic[]>({
    queryKey: ["vacancies"],
    throwOnError: onError,
  });
  const vacancy = data?.[0];
  const isFinish = vacancy && vacancy.question_count <= question.number;

  const { mutate: answerQuestion, isPending } = useMutation<
    InterviewQuestionPublic,
    Error,
    MutationVariables
  >({
    mutationFn,
    onSuccess: (data) => setQuestion(data),
    onError,
  });

  const { mutate: skipQuestion, isPending: isSkipPending } = useMutation<
    InterviewQuestionPublic,
    Error,
    MutationVariables
  >({
    mutationFn,
    onSuccess: (data) => setQuestion(data),
    onError,
  });

  const buttonState = useMemo(() => {
    switch (true) {
      case isPending || isSkipPending || isFinish:
        return "unavailable";
      case recording === true:
        return "recording";
      case recording === false:
        return "ready";
      default:
        return "unavailable";
    }
  }, [isPending, isSkipPending, isFinish, recording]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioContextRef.current = new (
        window.AudioContext || window.webkitAudioContext
      )();
      const analyser = audioContextRef.current.createAnalyser();
      const microphone =
        audioContextRef.current.createMediaStreamSource(stream);
      analyser.fftSize = 512;
      microphone.connect(analyser);
      setAnalyserNode(analyser);

      mediaRecorderRef.current = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        setAnalyserNode(null);
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", audioBlob, "answer.webm");
        answerQuestion({
          path: `interview/${interviewId}/answer/${question.id}`,
          body: formData,
        });

        for (const track of stream.getTracks()) track.stop();
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      toast.error(`Failed to access microphone: ${(error as Error).message}`);
    }
  }, [answerQuestion, interviewId, question.id]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current?.stop();
    }
  }, []);

  useEffect(() => {
    if (recording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [recording, startRecording, stopRecording]);

  useEffect(() => {
    if (isFinish) {
      setTimeout(() => navigate(`/review/${interviewId}`), 1500);
    }
  }, [interviewId, isFinish, navigate]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: question?.id triggers reset when question changes even if text is identical
  useEffect(() => {
    const text = question?.text ?? "";
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      if (i < text.length) {
        i++;
      } else {
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [question?.id, question?.text]);

  return (
    <div className="min-h-screen bg-app-gray-11 flex flex-col text-white">
      <Header
        questionCount={vacancy?.question_count}
        activeIndex={question?.number ?? 0}
      />

      <main className="flex-1 flex flex-col items-center justify-between px-6 pt-10 pb-12 max-w-2xl mx-auto w-full">
        <div className="w-full">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <LogoAvatar
                className="size-9 rounded-[14px] bg-linear-to-br from-app-indigo-10 to-app-violet-2 shadow-app-glow-indigo-sm"
                iconClassName="size-[15px]"
              />
              <div>
                <p className="text-sm font-semibold">Vera</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  AI Interviewer
                </p>
              </div>
            </div>

            <p className="text-base leading-relaxed">{displayedText}</p>
          </Card>

          <p className="text-center text-xs text-gray-600 mt-4">
            Take a moment, then tap the mic to begin your answer
          </p>
        </div>

        <div className="flex flex-col w-full my-8 items-center">
          <SoundIndicator
            analyser={analyserNode}
            initHeight={4}
            barClassName="bg-app-indigo-8"
            className="w-48"
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <MicButton
            onClick={() => setRecording((r) => !r)}
            state={buttonState}
          />

          <p className="text-base font-semibold text-white">
            {recording
              ? "Recording… tap to stop"
              : "Tap the mic to start your answer"}
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors mt-8 disabled:opacity-40 disabled:pointer-events-none"
          disabled={recording || isPending || isSkipPending || isFinish}
          onClick={() =>
            skipQuestion({
              path: `interview/${interviewId}/skip/${question.id}`,
            })
          }
        >
          <SkipForwardIcon className="w-3.5 h-3.5" />
          Skip question
        </button>
      </main>
    </div>
  );
}
