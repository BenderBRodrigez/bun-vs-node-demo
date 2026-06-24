import {
  QueryClient,
  QueryClientProvider,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { type PropsWithChildren, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import { ApiContext } from "./api-context";
import { setQueryParams } from "./api-utils";
import type { MutationVariables } from "./types";

export const ApiProvider = ({ children }: PropsWithChildren) => {
  const mutationFn = useCallback(
    async ({ path, method, headers, body }: MutationVariables) => {
      const response = await fetch(
        `${process.env.BUN_PUBLIC_API_URL || window.location.origin}/api/${path}`,
        {
          method: method ?? "POST",
          headers: {
            ...(!(body instanceof FormData) && {
              "Content-Type": "application/json",
            }),
            ...headers,
          },
          body,
        },
      );
      if (response.ok) {
        return await response.json();
      }
      const error = await response.text();
      throw new Error(error);
    },
    [],
  );

  const queryFn = useCallback(
    async ({ queryKey, signal }: QueryFunctionContext) => {
      const [path, params] = queryKey;
      const urlSearchParams = setQueryParams(params);
      const response = await fetch(
        `${process.env.BUN_PUBLIC_API_URL || window.location.origin}/api/${path}?${urlSearchParams.toString()}`,
        { signal },
      );
      if (response.ok) {
        return await response.json();
      }
      const status = response.status;
      throw new Error(`Network error: status ${status}`);
    },
    [],
  );

  const onError = useCallback((error: Error) => {
    let message = "Network error";
    try {
      const validationError = JSON.parse(error.message);
      if (typeof validationError.detail === "string") {
        message = validationError.detail;
      } else {
        message = (validationError.detail as Record<string, string>[]) //todo: get validation error typings from backend
          .map((item) => item.msg)
          .join("\n");
      }
    } catch (e) {
      message = error.message || (e as Error).message;
    }
    toast.error(message);
    return false;
  }, []);

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn,
            retry: 3,
            refetchOnWindowFocus: false,
            staleTime: Number.POSITIVE_INFINITY,
          },
        },
      }),
    [queryFn],
  );

  return (
    <ApiContext.Provider value={{ mutationFn, onError }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApiContext.Provider>
  );
};
