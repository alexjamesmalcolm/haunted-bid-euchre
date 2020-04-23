import { html, component, Router, useCallback } from "../dependencies/index.js";
import { getAllLobbies, joinLobby } from "../api.js";
import { useTypicalRequest } from "../hooks/useTypicalRequest.js";
import { Store } from "../store.js";

const LobbiesView = () => {
  const { data, hasError, isLoading } = useTypicalRequest(getAllLobbies);
  const { name } = Store;
  if (hasError) {
    return html`<p>There was an issue loading the lobbies.</p>`;
  }
  if (isLoading) {
    return html`<p>Loading lobbies...</p>`;
  }
  const { lobbies } = data;
  const handleJoin = useCallback(
    async (e, lobbyId) => {
      e.preventDefault();
      await joinLobby({ lobbyId, name });
      Router.go(`/lobby/${lobbyId}`);
    },
    [name]
  );
  const handleGoBack = useCallback(() => Router.go("/"), []);
  return html`<style>
      .container {
        display: grid;
        gap: 1rem;
        width: 100vw;
      }
      .lobby {
        border-radius: 1rem;
        padding: 1rem;
        border: 1px black solid;
        display: grid;
        grid-template-columns: auto max-content max-content;
        gap: 1rem;
        font-size: 20px;
        align-items: center;
      }
      .lobby > * {
        margin: 0;
      }
      .lobby .join {
        text-decoration: none;
        color: white;
        user-select: none;
        font-size: 20px;
      }
      .lobby .leader {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    </style>
    <div class="container">
      <header>
        <be-button .onclick=${handleGoBack}>Back</be-button>
        <h2>Lobbies</h2>
      </header>
      ${lobbies.map(
        (lobby) =>
          html`<div class="lobby">
            <p class="leader">Leader: ${lobby.lobbyLeader}</p>
            <p>${lobby.players.length} / 4</p>
            <be-button>
              <a
                class="join"
                href="/lobby/${lobby.id}"
                .onclick=${(e) => handleJoin(e, lobby.id)}
                >Join</a
              >
            </be-button>
          </div>`
      )}
    </div>`;
};

customElements.define("lobbies-view", component(LobbiesView));
