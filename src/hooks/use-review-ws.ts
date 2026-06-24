import type { ReviewPublic } from "../api/generated-types";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useReviewWs(interviewId: string | undefined, enabled: boolean) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || !interviewId) return;

    const wsUrl = `${import.meta.env.VITE_WS_URL}/api/interview/${interviewId}/reviews/ws`;

    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event: MessageEvent<string>) => {
      const reviews = JSON.parse(event.data) as ReviewPublic[];
      queryClient.setQueryData(
        [`interview/${interviewId}`, { expand: ["questions", "reviews"] }],
        (old: unknown) => {
          if (!old || typeof old !== "object") {
            return old;
          }
          return { ...old, reviews };
        },
      );
    };

    ws.onerror = () => ws.close();

    return () => ws.close();
  }, [interviewId, enabled, queryClient]);
}
