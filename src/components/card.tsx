import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLDivElement> & {
  theme?: "light" | "dark";
};

const styles = {
  light: "bg-white border-app-gray-2 text-gray-400",
  dark: "bg-app-gray-10 border-white/6 text-app-gray-4",
};

export function Card({ children, className, theme = "dark" }: Props) {
  return (
    <div
      className={twMerge([
        "w-full flex flex-col border rounded-2xl p-5 font-normal",
        styles[theme],
        className,
      ])}
    >
      {children}
    </div>
  );
}
