import CheckIcon from "../icons/check.svg";

type Props = { status: "pending" | "success" | "error" };

export function StatusIcon({ status }: Props) {
  return (
    <>
      {status === "pending" && (
        <div className="size-5 rounded-full border-2 border-app-gray-5 border-t-transparent animate-spin shrink-0" />
      )}
      {status === "success" && (
        <div className="size-5 bg-app-green-3 rounded-full flex items-center justify-center shrink-0">
          <CheckIcon className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      {status === "error" && (
        <div className="size-5 bg-red-500 rounded-full flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-bold leading-none">
            !
          </span>
        </div>
      )}
    </>
  );
}
