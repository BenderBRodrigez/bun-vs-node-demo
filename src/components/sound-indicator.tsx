import { useEffect, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";

type Props = {
  analyser: AnalyserNode | null;
  barCount?: number;
  initHeight?: number;
  className?: string;
  barClassName?: string;
};

export function SoundIndicator({
  analyser,
  barCount = 38,
  initHeight = 1,
  className,
  barClassName,
}: Props) {
  const [barHeights, setBarHeights] = useState<number[]>(() =>
    Array(barCount).fill(initHeight),
  );
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    cancelAnimationFrame(animFrameRef.current);

    if (!analyser) {
      const reset = () => setBarHeights(Array(barCount).fill(initHeight));
      reset();
      return;
    }
    const data = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      analyser?.getByteFrequencyData(data);
      setBarHeights(
        Array.from({ length: barCount }, (_, i) => {
          const val = data[i % data.length] ?? 0;
          return Math.max(2, (val / 255) * 44);
        }),
      );
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [analyser, barCount, initHeight]);

  return (
    <div
      className={twMerge([
        "w-full flex items-center gap-[2px] h-12",
        className,
      ])}
    >
      {barHeights.map((h, i) => (
        <div
          key={i}
          className={twMerge([
            "flex-1 rounded-full bg-app-green-2",
            barClassName,
            !analyser && "bg-white/8",
          ])}
          style={{
            height: `${h}px`,
            transition: analyser ? "height 60ms linear" : undefined,
          }}
        />
      ))}
    </div>
  );
}
