import { AnswerPlayer } from "./answer-player";
import { UserAvatar } from "./user-avatar";

type Props = {
  userName: string;
  answer: string;
  audioUrl?: string | null;
};

export function AnswerCard({ userName, answer, audioUrl }: Props) {
  return (
    <div className="bg-white rounded-xl border border-l-4 border-app-green-5 shadow-app-green p-4 mb-3">
      <div className="flex items-center gap-2.5 mb-3">
        <UserAvatar name={userName} />
        <p className="text-xs font-bold text-gray-900">{userName}</p>
      </div>

      <AnswerPlayer audioUrl={audioUrl ?? null} />

      <p className="text-sm text-app-gray-9 leading-relaxed">{answer}</p>
    </div>
  );
}
