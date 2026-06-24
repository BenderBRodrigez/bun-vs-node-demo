type Props = {
  index: number;
};

export function QuestionDivider({ index }: Props) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[10px] font-bold text-app-indigo-8 border border-app-indigo-14 rounded-full px-2.5 py-0.5 bg-app-indigo-2 shrink-0">
        Q{index}
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}
