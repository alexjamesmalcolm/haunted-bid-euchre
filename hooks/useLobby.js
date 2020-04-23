import { useMemo } from "../dependencies/index.js";
import { getLobby } from "../api.js";
import { useTypicalRequest } from "./useTypicalRequest.js";

export const useLobby = (lobbyId) => {
  const request = useMemo(() => {
    if (lobbyId) {
      return () => getLobby(lobbyId);
    }
  }, [lobbyId]);
  const { data, hasError, isLoading, forceAcquire } = useTypicalRequest(
    request,
    5000
  );
  return { data, hasError, isLoading, forceAcquire };
};
