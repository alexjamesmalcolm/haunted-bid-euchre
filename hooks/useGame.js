import { useMemo } from "../dependencies/index.js";
import { getGame } from "../api.js";
import { useTypicalRequest } from "./useTypicalRequest.js";

export const useGame = (gameId, position = "") => {
  const request = useMemo(() => {
    if (gameId) {
      return () => getGame({ gameId, position });
    }
  }, [gameId, position]);
  const { data, hasError, isLoading, forceAcquire } = useTypicalRequest(
    request,
    1500
  );
  return { data, hasError, isLoading, forceAcquire };
};
