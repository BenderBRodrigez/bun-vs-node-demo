export function getQueryParams(params: URLSearchParams) {
  return Array.from(params.entries());
}

export function setQueryParams(params?: unknown) {
  const urlSearchParams = new URLSearchParams();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        for (const item of value) urlSearchParams.append(key, item);
      } else {
        urlSearchParams.set(key, value);
      }
    }
  }
  return urlSearchParams.toString();
}
