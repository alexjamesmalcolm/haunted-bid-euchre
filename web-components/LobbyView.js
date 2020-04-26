import {
  html,
  component,
  useMemo,
  useCallback,
  Router,
  useEffect,
} from "../dependencies/index.js";
import { useLobby } from "../hooks/useLobby.js";
import {
  leaveLobby,
  endLobby,
  swapPositionsInLobby,
  startGame,
} from "../api.js";
import { useStore } from "../hooks/useStore.js";

const LobbyView = () => {
  const lobbyId = location.pathname.split("/lobby/")[1];
  const { data: lobbyData, hasError, isLoading, forceAcquire } = useLobby(
    lobbyId
  );
  const { name } = useStore();
  const isLeader = useMemo(
    () => lobbyData && lobbyData.lobby && lobbyData.lobby.lobbyLeader === name,
    [lobbyData, name]
  );
  const isLobbyReady = useMemo(
    () => lobbyData && lobbyData.lobby && lobbyData.lobby.players.length === 4,
    [lobbyData]
  );
  const handleEndLobby = useCallback(async () => {
    await endLobby(lobbyId);
    Router.go("/lobby");
  }, [lobbyId]);
  const handleLeaveLobby = useCallback(async () => {
    await leaveLobby({ lobbyId, name });
    Router.go("/lobby");
  }, [lobbyId, name]);
  const handleStartGame = useCallback(async () => {
    const gameData = await startGame(lobbyId);
    const { id: gameId } = gameData.game;
    Router.go(`/game/${gameId}`);
  }, [lobbyId]);
  useEffect(() => {
    if (lobbyData && lobbyData.lobby && lobbyData.lobby.game) {
      Router.go(`/game/${lobbyData.lobby.game.id}`);
    }
  }, [lobbyData]);
  useEffect(() => {
    if (hasError) Router.go("/lobby");
  }, [hasError]);
  if (isLoading && !lobbyData) return html`<p>Loading...</p>`;
  if (hasError)
    return html`<p>
      There was an issue loading the lobby. Please complain to Alex.
    </p>`;
  const { players, lobbyLeader } = lobbyData.lobby;
  const you = players.find((player) => player.name === name);
  return html`<style>
      .teams {
        display: grid;
        gap: 1rem;
        margin: 0.25rem;
      }
      .team {
        border: 1px black solid;
        border-radius: 0.25rem;
      }
      .player-slot {
        display: grid;
        gap: 1rem;
        grid-template-columns: max-content 1fr max-content;
        justify-content: center;
        align-items: center;
        padding: 0 1rem;
      }
    </style>
    <div class="container">
      ${isLeader
        ? html`<be-button .onclick=${handleEndLobby} .color=${"danger"}>
            End Lobby
          </be-button>`
        : html`<be-button .onclick=${handleLeaveLobby} .color=${"danger"}>
            Leave
          </be-button>`}
      <div class="teams">
        ${[
          ["1", "3"],
          ["2", "4"],
        ].map(
          (team) => html`<div class="team">
          ${team.map((playerSlotPosition) => {
            const player = players.find(
              (p) => p.position === playerSlotPosition
            );
            const isPlayerYou = player && player.name === name;
            return html`<div class="player-slot">
              <p class="player-seat">Seat: ${playerSlotPosition}</p>
              <p class="player-name">${player ? player.name : "Empty"}</p>
              ${isPlayerYou
                ? ""
                : html`<be-button
                    .onclick=${async () => {
                      await swapPositionsInLobby({
                        desiredPosition: playerSlotPosition,
                        position: you.position,
                        lobbyId,
                      });
                      forceAcquire();
                    }}
                  >
                    Swap
                  </be-button>`}
            </div>`;
          })}</div>
        </div>`
        )}
      </div>
      ${isLobbyReady
        ? isLeader
          ? html`<be-button .onclick=${handleStartGame}>Start</be-button>`
          : html`<p>Waiting for ${lobbyLeader} to start the game</p>`
        : html`<p>Waiting for more players...</p>`}
    </div>`;
};

customElements.define("lobby-view", component(LobbyView));
