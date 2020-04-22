import { useCallback } from "../dependencies.js";
import { getLobby } from "../api.js";
import { useTypicalRequest } from "./useTypicalRequest.js";

export const useLobby = (lobbyId) => {
  const request = useCallback(() => getLobby(lobbyId), [lobbyId]);
  const { data, hasError, isLoading } = useTypicalRequest(request);
  return { data, hasError, isLoading };
};
