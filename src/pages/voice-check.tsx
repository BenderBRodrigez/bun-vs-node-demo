import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import type { InterviewQuestionPublic } from "../api/generated-types";
import type { MutationVariables } from "../api/types";
import { useApi } from "../api/use-api";
import { Card } from "../components/card";
import { Logo } from "../components/logo";
import { MainButton } from "../components/main-button";
import { MicrophoneLevelCard } from "../components/microphone-level-card";
import { SelectInput, type SelectOption } from "../components/select-input";
import { StatusIcon } from "../components/status-icon";
import { useNetCheck } from "../hooks/use-net-check";
import HeadphonesIcon from "../icons/headphones.svg";
import MicIcon from "../icons/mic.svg";
import WifiIcon from "../icons/wifi.svg";
import type { Status } from "../types";

const backgroundStyles = {
  pending: null,
  error: "bg-red-500/15",
  success: "bg-app-green-3/15",
};

const iconStyles = {
  pending: null,
  error: "text-red-400",
  success: "text-app-green-2",
};

export function VoiceCheck() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { interviewId } = state ?? {};

  const { mutationFn, onError } = useApi();
  const { mutate: startInterview, isPending } = useMutation<
    InterviewQuestionPublic,
    Error,
    MutationVariables
  >({
    mutationFn,
    onSuccess: (data) =>
      navigate("/interview", { state: { question: data, interviewId } }),
    onError,
  });

  const [mics, setMics] = useState<SelectOption[]>([
    { id: "", label: "Unknown" },
  ]);
  const [speakers, setSpeakers] = useState<SelectOption[]>([
    { id: "", label: "Unknown" },
  ]);
  const [selectedMic, setSelectedMic] = useState("");
  const [micStatus, setMicStatus] = useState<Status>("pending");
  const { netStatus } = useNetCheck();

  const handleDevicesLoaded = useCallback(
    (
      audioInputs: SelectOption[],
      audioOutputs: SelectOption[],
      firstMicId: string,
    ) => {
      if (audioInputs.length) setMics(audioInputs);
      if (audioOutputs.length) setSpeakers(audioOutputs);
      setSelectedMic(firstMicId);
    },
    [],
  );

  return (
    <div className="min-h-screen bg-app-gray-11 flex justify-center items-center p-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <Logo size="md" className="p-2" />

        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Check your audio
          </h1>
          <p className="text-sm text-app-gray-5 leading-relaxed">
            This interview is audio-only — make sure your
            <br />
            microphone is working
          </p>
        </div>

        <MicrophoneLevelCard
          selectedMic={selectedMic}
          onStatusChange={setMicStatus}
          onDevicesLoaded={handleDevicesLoaded}
        />

        <Card>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-app-gray-5 mb-4">
            System Check
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div
                className={twMerge([
                  "size-8 rounded-[14px] flex items-center justify-center shrink-0",
                  backgroundStyles[micStatus],
                ])}
              >
                <MicIcon
                  className={twMerge(["size-4 ", iconStyles[micStatus]])}
                />
              </div>
              <span className="flex-1 text-sm">Microphone</span>
              <StatusIcon status={micStatus} />
            </div>
            <div className="flex items-center gap-3">
              <div
                className={twMerge([
                  "size-8 rounded-[14px] flex items-center justify-center shrink-0",
                  backgroundStyles[netStatus],
                ])}
              >
                <WifiIcon
                  className={twMerge(["size-4 ", iconStyles[netStatus]])}
                />
              </div>
              <span className="flex-1 text-sm">Network</span>
              <StatusIcon status={netStatus} />
            </div>
          </div>
        </Card>

        <Card className="gap-2">
          <SelectInput
            label="Microphone"
            IconComponent={MicIcon}
            options={mics}
            value={selectedMic}
            onChange={(e) => setSelectedMic(e.target.value)}
          />
          <SelectInput
            label="Speaker"
            IconComponent={HeadphonesIcon}
            options={speakers}
          />
        </Card>

        <MainButton
          onClick={() => startInterview({ path: `interview/${interviewId}` })}
          disabled={!interviewId || isPending || !selectedMic}
          text="Enter interview"
          LeadingIconComponent={MicIcon}
        />
      </div>
    </div>
  );
}
