import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextInput({ label, error, ...props }: Props) {
  return (
    <div>
      <label htmlFor={label} className="block text-left text-sm text-gray-800">
        {label}
      </label>
      <input
        id={label}
        className={twMerge([
          "w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 transition",
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
            : "border-gray-200 focus:border-indigo-400 focus:ring-indigo-100",
        ])}
        {...props}
      />
      <p className="text-left text-xs text-red-500 mt-1 h-3">{error}</p>
    </div>
  );
}
