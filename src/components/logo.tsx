import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { LogoAvatar } from "./logo-avatar";

type Props = HTMLAttributes<HTMLDivElement> & {
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg";
};

const textStyles = {
  light: "text-gray-800",
  dark: "text-white",
};

const textSizes = {
  lg: "text-xl",
  md: "text-lg",
  sm: "text-base",
};

const logoStyles = {
  light: "bg-app-indigo-11",
  dark: "bg-app-indigo-9",
};

const logoSizes = {
  lg: "size-8 rounded-[14px]",
  md: "size-7 rounded-[10px]",
  sm: "size-6 rounded-[10px]",
};

const iconSizes = {
  lg: "size-[15px]",
  md: "size-[13px]",
  sm: "size-[11px]",
};

export function Logo({ className, theme = "dark", size = "sm" }: Props) {
  return (
    <div className={twMerge(["flex items-center gap-2", className])}>
      <LogoAvatar
        className={twMerge([logoSizes[size], logoStyles[theme]])}
        iconClassName={iconSizes[size]}
      />
      <span
        className={twMerge([
          "font-semibold",
          textSizes[size],
          textStyles[theme],
        ])}
      >
        candid
      </span>
    </div>
  );
}
