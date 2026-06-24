import { ComponentType, SVGProps } from "react";

import { twMerge } from "tailwind-merge";

type Props = {
  IconComponent: ComponentType<SVGProps<SVGSVGElement>>;
  iconColor: string;
  bg: string;
  title: string;
  desc: string;
};

export function HomeFeatureCard({
  IconComponent,
  iconColor,
  bg,
  title,
  desc,
}: Props) {
  return (
    <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-app-gray-3/80">
      <div
        className={`size-8 ${bg} rounded-[14px] flex items-center justify-center shrink-0 mt-0.5`}
      >
        {<IconComponent className={twMerge(["size-4", iconColor])} />}
      </div>
      <div>
        <p className="text-left text-sm leading-5 font-semibold text-gray-800">
          {title}
        </p>
        <p className="text-left text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
