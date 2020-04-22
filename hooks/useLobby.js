import { useMemo } from "../dependencies.js";
import { getLobby } from "../api.js";
import { useTypicalRequest } from "./useTypicalRequest.js";

export const useLobby = (lobbyId) => {
  const request = useMemo(() => {
    if (lobbyId) {
      return () => getLobby(lobbyId);
    }
  }, [lobbyId]);
  const { data, hasError, isLoading, forceAcquire } = useTypicalRequest(
    request
  );
  return { data, hasError, isLoading, forceAcquire };
};
