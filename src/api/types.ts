import type { MutationFunction } from "@tanstack/react-query";

export type MutationVariables = {
  path: string;
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
};

// biome-ignore lint/suspicious/noExplicitAny: generic default for untyped callers
export type ApiContextType<T = any> = {
  mutationFn: MutationFunction<T, MutationVariables>;
  onError: (error: Error) => boolean;
};
