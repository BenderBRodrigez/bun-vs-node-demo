import { ComponentType, SVGProps, SelectHTMLAttributes } from "react";

import ChevronDownIcon from "../icons/chevron-down.svg?react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  IconComponent: ComponentType<SVGProps<SVGSVGElement>>;
  options: SelectOption[];
  label: string;
};

export type SelectOption = {
  id: string;
  label: string;
};

export function SelectInput({
  IconComponent,
  options,
  label,
  ...props
}: Props) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-widest uppercase text-app-gray-6 mb-0.5">
        {label}
      </p>
      <div className="relative">
        <IconComponent className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-app-gray-6" />
        <select
          className="w-full bg-white/4 border border-white/6 rounded-[10px] px-8 py-2.5 text-sm text-gray-300 appearance-none outline-none focus:border-indigo-500 cursor-pointer"
          {...props}
        >
          {options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-3 text-app-gray-7 pointer-events-none" />
      </div>
    </div>
  );
}
