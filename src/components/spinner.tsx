import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Spinner({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge("flex items-center justify-center", className)}>
      <div className="size-12 rounded-full border-4 border-app-indigo-9 border-t-transparent animate-spin" />
    </div>
  );
}
