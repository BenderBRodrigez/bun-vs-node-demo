import { HTMLAttributes } from "react";
import LogoIcon from "../icons/logo.svg?react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLDivElement> & {
  iconClassName?: string;
};

export function LogoAvatar({ className, iconClassName }: Props) {
  return (
    <div
      className={twMerge([
        "flex items-center justify-center shrink-0",
        className,
      ])}
    >
      <LogoIcon className={twMerge(["text-white", iconClassName])} />
    </div>
  );
}
