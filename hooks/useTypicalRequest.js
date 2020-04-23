import { useEffect, useState, useCallback } from "../dependencies/index.js";

const unresolvedPromise = new Promise(() => {});

export const useTypicalRequest = (
  request = () => unresolvedPromise,
  ttl = 0
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState();
  const makeRequest = useCallback(() => {
    setIsLoading(true);
    request()
      .then(setData)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [request]);
  useEffect(() => {
    if (!isLoading && ttl > 0) {
      const timeoutId = setTimeout(makeRequest, ttl);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, makeRequest, ttl]);
  useEffect(() => makeRequest(), [makeRequest]);
  return { isLoading, hasError, data, forceAcquire: makeRequest };
};
