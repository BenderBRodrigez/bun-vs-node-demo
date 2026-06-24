import { HTMLAttributes } from "react";
import MicIcon from "../icons/mic.svg?react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLButtonElement> & {
  state: "unavailable" | "ready" | "recording";
};

const buttonStyles = {
  unavailable: "bg-white/4 border-white/8 outline-white/6",
  ready: "bg-app-indigo-8/15 border-app-indigo-8/35 outline-white/6",
  recording:
    "bg-linear-to-r from-app-indigo-10 to-app-violet-2 border-app-indigo-8/60 shadow-app-glow-indigo outline-white/6",
};

const iconStyles = {
  unavailable: "text-app-gray-9",
  ready: "text-app-indigo-6",
  recording: "size-5.5 rounded-xs bg-white",
};

export function MicButton({ onClick, state }: Props) {
  return (
    <div className="relative size-28">
      {state === "recording" && (
        <svg
          className="absolute -top-[9px] -left-[9px] pointer-events-none"
          width="130"
          height="130"
          viewBox="0 0 130 130"
        >
          <circle
            cx="65"
            cy="65"
            r="62.5"
            fill="none"
            strokeWidth="3"
            transform="rotate(-90, 65, 65)"
            style={{ animation: "mic-ring-dash 6s ease-in-out infinite" }}
          />
        </svg>
      )}
      <button
        disabled={state === "unavailable"}
        onClick={onClick}
        className={twMerge([
          "size-28 rounded-full border-2 outline-[3px] outline-offset-5 flex items-center justify-center transition-all",
          buttonStyles[state],
        ])}
      >
        {state === "recording" ? (
          <span className={iconStyles[state]} />
        ) : (
          <MicIcon
            className={twMerge([
              "size-6.5 transition-colors",
              iconStyles[state],
            ])}
          />
        )}
      </button>
    </div>
  );
}
