import { LogoAvatar } from "./logo-avatar";

type Props = {
  question: string;
};

export function QuestionCard({ question }: Props) {
  return (
    <div className="bg-app-indigo-1 rounded-xl border border-app-indigo-3 p-4 mb-3">
      <div className="flex items-center gap-2.5 mb-3">
        <LogoAvatar
          className="size-6 rounded-[10px] bg-linear-to-r from-app-indigo-10 to-app-violet-2"
          iconClassName="size-[13px]"
        />
        <div className="flex gap-2">
          <span className="text-xs font-bold text-app-indigo-12">Vera</span>
          <span className="text-[11px] text-app-indigo-5">AI Interviewer</span>
        </div>
      </div>
      <p className="text-sm text-app-gray-9 leading-relaxed">{question}</p>
    </div>
  );
}
