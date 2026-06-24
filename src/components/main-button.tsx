import type { ButtonHTMLAttributes, ComponentType, SVGProps } from "react";
import { twMerge } from "tailwind-merge";
import ArrowRightIcon from "../icons/arrow-right.svg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  LeadingIconComponent?: ComponentType<SVGProps<SVGSVGElement>>;
  theme?: "light" | "dark";
};

const styles = {
  light: "shadow-app-btn-light",
  dark: "shadow-app-btn-dark",
};

export function MainButton({
  theme = "dark",
  LeadingIconComponent,
  text,
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={twMerge([
        "w-full bg-app-indigo-11 hover:bg-indigo-700 active:scale-[0.99] transition text-white font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 cursor-pointer",
        "disabled:opacity-70 disabled:shadow-none disabled:pointer-events-none",
        styles[theme],
        className,
      ])}
    >
      {LeadingIconComponent && (
        <LeadingIconComponent className="size-4 text-white" />
      )}
      {text}
      <ArrowRightIcon className="size-4 text-white" />
    </button>
  );
}
