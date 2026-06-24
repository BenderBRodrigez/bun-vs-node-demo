import { useCallback, useEffect, useState } from "react";
import SpeakerIcon from "../icons/speaker.svg";
import type { Status } from "../types";
import { Card } from "./card";
import type { SelectOption } from "./select-input";
import { SoundIndicator } from "./sound-indicator";

type Props = {
  selectedMic: string;
  onStatusChange: (status: Status) => void;
  onDevicesLoaded: (
    mics: SelectOption[],
    speakers: SelectOption[],
    firstMicId: string,
  ) => void;
};

export function MicrophoneLevelCard({
  selectedMic,
  onStatusChange,
  onDevicesLoaded,
}: Props) {
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [status, setStatus] = useState<Status>("pending");

  const updateStatus = useCallback(
    (s: Status) => {
      setStatus(s);
      onStatusChange(s);
    },
    [onStatusChange],
  );

  useEffect(() => {
    async function loadDevices() {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();

        const audioInputs = devices
          .filter((d) => d.kind === "audioinput")
          .map((d) => ({
            id: d.deviceId,
            label: d.label || `Microphone ${d.deviceId.slice(0, 6)}`,
          }));
        const audioOutputs = devices
          .filter((d) => d.kind === "audiooutput")
          .map((d) => ({
            id: d.deviceId,
            label: d.label || `Speaker ${d.deviceId.slice(0, 6)}`,
          }));

        const firstMicId = audioInputs[0]?.id ?? "";
        onDevicesLoaded(audioInputs, audioOutputs, firstMicId);
      } catch {
        updateStatus("error");
      }
    }
    loadDevices();
  }, [onDevicesLoaded, updateStatus]);

  useEffect(() => {
    if (selectedMic === "") return;

    let ctx: AudioContext | null = null;
    let stream: MediaStream | null = null;

    async function startMicMonitor() {
      try {
        const constraints = {
          audio: selectedMic ? { deviceId: { exact: selectedMic } } : true,
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        ctx = new AudioContext();
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        source.connect(analyser);
        setAnalyserNode(analyser);
        updateStatus("success");
      } catch {
        updateStatus("error");
      }
    }

    startMicMonitor();

    return () => {
      setAnalyserNode(null);
      if (stream) for (const t of stream.getTracks()) t.stop();
      ctx?.close();
    };
  }, [selectedMic, updateStatus]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-app-gray-5">
          Microphone Level
        </span>
        <SpeakerIcon className="w-4 h-4 text-app-gray-6" />
      </div>

      <SoundIndicator
        analyser={analyserNode}
        className="flex items-end gap-[3px] h-10 mb-3"
      />

      <p className="text-xs text-app-gray-7">
        {status === "error" && "Microphone not detected"}
        {status === "success" && "Microphone detected — speak to test"}
      </p>
    </Card>
  );
}
