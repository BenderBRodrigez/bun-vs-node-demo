declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export type Status = "pending" | "success" | "error";
