import CheckIcon from "../icons/check.svg?react";
import { Logo } from "./logo";
import { twMerge } from "tailwind-merge";
import { useCallback } from "react";

type Props = {
  questionCount?: number;
  activeIndex?: number;
};

const styles = {
  answered: "bg-app-green-5/15 border-app-green-5/30 text-app-green-6",
  active: "bg-app-indigo-8/20 border-app-indigo-8/40 text-app-indigo-6",
  notAnswered: "bg-white/4 border-white/6 text-app-gray-9",
};

const iconStyles = {
  answered: "size-2.5 text-app-green-6",
  active: "size-1.5 rounded-full bg-app-indigo-7 m-0.5",
  notAnswered: "size-1.5 rounded-full bg-app-gray-8 m-0.5",
};

export function Header({ questionCount = 0, activeIndex }: Props) {
  const getStatus = useCallback((index: number, activeIndex?: number) => {
    switch (true) {
      case activeIndex && index < activeIndex:
        return "answered";
      case index === activeIndex:
        return "active";
      default:
        return "notAnswered";
    }
  }, []);

  return (
    <header className="relative flex items-center justify-center px-5 py-3.5 border-b border-white/5">
      <Logo className="absolute top-3.5 left-5 p-px" />

      <div className="flex items-center gap-1.5">
        {Array.from({ length: questionCount }, (_, i) => {
          const displayIndex = i + 1;
          const status = getStatus(i, activeIndex);

          return (
            <div
              key={displayIndex}
              className={twMerge([
                "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border",
                styles[status],
              ])}
            >
              {status === "answered" ? (
                <CheckIcon className={iconStyles[status]} />
              ) : (
                <span className={iconStyles[status]} />
              )}
              Q{displayIndex}
            </div>
          );
        })}
      </div>
    </header>
  );
}
