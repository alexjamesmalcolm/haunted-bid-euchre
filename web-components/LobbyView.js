import {
  html,
  component,
  useMemo,
  useCallback,
  Router,
} from "../dependencies.js";
import { useLobby } from "../hooks/useLobby.js";
import { leaveLobby, endLobby, swapPositionsInLobby } from "../api.js";
import { Store } from "../store.js";

const LobbyView = () => {
  const lobbyId = location.pathname.split("/lobby/")[1];
  const { data: lobbyData, hasError, isLoading, forceAcquire } = useLobby(
    lobbyId
  );
  const { name } = Store;
  const isLeader = useMemo(
    () => lobbyData && lobbyData.lobby && lobbyData.lobby.lobbyLeader === name,
    [lobbyData, name]
  );
  const handleEndLobby = useCallback(async () => {
    await endLobby(lobbyId);
    Router.go("/lobby");
  }, [lobbyId]);
  const handleLeaveLobby = useCallback(async () => {
    await leaveLobby({ lobbyId, name });
    Router.go("/lobby");
  }, [lobbyId, name]);
  if (isLoading && !lobbyData) return html`<p>Loading...</p>`;
  if (hasError)
    return html`<p>
      There was an issue loading the lobby. Please complain to Alex.
    </p>`;
  const { players } = lobbyData.lobby;
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
    </div>`;
};

customElements.define("lobby-view", component(LobbyView));
