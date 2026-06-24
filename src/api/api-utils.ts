export function getQueryParams(params: URLSearchParams) {
  return Array.from(params.entries());
}

export function setQueryParams(params?: unknown) {
  const urlSearchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => urlSearchParams.append(key, item));
      } else {
        urlSearchParams.set(key, value);
      }
    });
  }
  return urlSearchParams.toString();
}
