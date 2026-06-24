import { Card } from "./card";
import { Spinner } from "./spinner";

export function ReviewPlaceholder() {
  return (
    <div className="max-w-[1320px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-5 items-start sm:px-6">
      <Card theme="light" className="lg:sticky lg:top-6">
        <div className="border-t border-gray-100 mt-12 h-24" />
      </Card>

      <Card theme="light" className=" lg:min-h-[calc(100vh-6rem)]">
        <div className="border-t border-gray-100 mt-12 h-120 lg:flex lg:flex-1 lg:justify-center lg:items-center">
          <Spinner className="h-full" />
        </div>
      </Card>

      <Card theme="light" className="lg:sticky lg:top-6">
        <div className="border-t border-gray-100 mt-12 h-80" />
      </Card>
    </div>
  );
}
