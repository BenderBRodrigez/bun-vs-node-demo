import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import PauseIcon from "../icons/pause.svg?react";
import PlayIcon from "../icons/play.svg?react";
import { toast } from "react-toastify";

type Props = {
  audioUrl: string | null;
  barCount?: number;
};

export function AnswerPlayer({ audioUrl, barCount = 48 }: Props) {
  const [bars, setBars] = useState<number[]>([]);
  const [duration, setDuration] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioUrl) return;

    let cancelled = false;
    const audioContext = window.AudioContext ?? window.webkitAudioContext;
    const ctx = new audioContext();

    const fetchAudio = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || window.location.origin}/api/media/${audioUrl}`,
      );
      const arrayBuffer = await response.arrayBuffer();
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      if (cancelled) return;
      try {
        setDuration(decoded.duration);
        const data = decoded.getChannelData(0);
        const blockSize = Math.floor(data.length / barCount);
        const peaks = Array.from({ length: barCount }, (_, i) => {
          let max = 0;
          for (let j = 0; j < blockSize; j++) {
            const abs = Math.abs(data[i * blockSize + j]);
            if (abs > max) max = abs;
          }
          return max;
        });

        const maxPeak = Math.max(...peaks, 0.001);
        setBars(peaks.map((p) => Math.max(8, (p / maxPeak) * 100)));
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        ctx.close();
      }
    };

    fetchAudio();

    return () => {
      cancelled = true;
    };
  }, [audioUrl, barCount]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const resolvedUrl = audioUrl
    ? `${import.meta.env.VITE_API_URL || window.location.origin}/api/media/${audioUrl}`
    : null;

  const togglePlay = useCallback(() => {
    if (!resolvedUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(resolvedUrl);
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime ?? 0);
      });
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [resolvedUrl, isPlaying]);

  const formatDuration = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, []);

  const displayBars = useMemo(
    () =>
      bars.length > 0
        ? bars
        : Array.from({ length: barCount }, (_, i) => {
            const h =
              30 + Math.abs(Math.sin(i * 0.9) * 55 + Math.sin(i * 1.7) * 25);
            return Math.max(6, Math.min(100, h));
          }),
    [bars, barCount],
  );

  const progress = duration ? currentTime / duration : 0;
  const playedBars = Math.ceil(progress * barCount);

  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex-1 flex items-center gap-px h-13 p-2.5 rounded-xl border border-app-green-8 bg-app-green-9">
        <button
          onClick={togglePlay}
          disabled={!audioUrl}
          className="shrink-0 mr-2 size-8 flex items-center justify-center rounded-full bg-app-green-5 text-white shadow-app-green-sm hover:bg-app-green-4 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {isPlaying ? (
            <PauseIcon className="w-4 h-4" />
          ) : (
            <PlayIcon className="w-4 h-4" />
          )}
        </button>
        {displayBars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-colors ${i < playedBars ? "bg-app-green-5" : "bg-app-green-7"}`}
            style={{ height: `${h}%` }}
          />
        ))}
        {!!duration && (
          <span className="text-xs text-app-gray-5 tabular-nums shrink-0 ml-2">
            {formatDuration(currentTime)}/{formatDuration(duration)}
          </span>
        )}
      </div>
    </div>
  );
}
