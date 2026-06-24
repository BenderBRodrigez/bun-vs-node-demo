import { Logo } from "../components/logo";
import { MainButton } from "../components/main-button";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-app-gray-11 flex flex-col items-center justify-center p-6 text-white">
      <div className="mb-16">
        <Logo />
      </div>

      <p className="text-[120px] font-bold leading-none text-white/5 select-none mb-2">
        404
      </p>

      <h1 className="text-xl font-semibold text-white mb-2">Page not found</h1>
      <p className="text-sm text-gray-500 mb-10">
        The page you're looking for doesn't exist.
      </p>

      <MainButton
        text="Go home"
        onClick={() => navigate("/")}
        className="max-w-sm"
      />
    </div>
  );
}
