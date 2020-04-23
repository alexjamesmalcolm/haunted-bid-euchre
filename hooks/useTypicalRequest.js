import { useEffect, useState, useCallback } from "../dependencies/index.js";

const unresolvedPromise = new Promise(() => {});

export const useTypicalRequest = (request = () => unresolvedPromise) => {
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
  useEffect(() => makeRequest(), [makeRequest]);
  return { isLoading, hasError, data, forceAcquire: makeRequest };
};
