import { useEffect, useState } from "../dependencies.js";

export const useTypicalRequest = (request) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    setIsLoading(true);
    request()
      .then(setData)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [request]);
  return { isLoading, hasError, data };
};
