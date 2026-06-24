import { useQuery } from "@tanstack/react-query";

export function useNetCheck() {
  const { status: netStatus } = useQuery({
    queryKey: ["health"],
    retry: false,
    queryFn: async ({ signal }) => {
      const timeout = AbortSignal.timeout(5000);
      const combined = AbortSignal.any([signal, timeout]);
      const base = import.meta.env.VITE_API_URL || window.location.origin;
      const response = await fetch(`${base}/api/health`, { signal: combined });
      if (!response.ok) throw new Error("not ok");
      return await response.json();
    },
  });

  return { netStatus };
}
