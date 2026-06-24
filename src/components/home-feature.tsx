import type { ComponentType, SVGProps } from "react";

type Props = {
  IconComponent: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
  index: number;
};

export function HomeFeature({ IconComponent, text, index }: Props) {
  return (
    <>
      {!!index && <span className="size-1 rounded-full bg-app-gray-4" />}
      <div className="flex items-center gap-1.5">
        <IconComponent className="size-3" />
        <span>{text}</span>
      </div>
    </>
  );
}
