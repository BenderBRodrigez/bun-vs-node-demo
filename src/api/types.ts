import type { MutationFunction } from "@tanstack/react-query";

export type MutationVariables = {
  path: string;
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiContextType<T = any> = {
  mutationFn: MutationFunction<T, MutationVariables>;
  onError: (error: Error) => boolean;
};
