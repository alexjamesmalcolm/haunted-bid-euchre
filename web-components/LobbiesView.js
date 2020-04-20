import { html, component, Router } from "../dependencies.js";
import { getAllLobbies, joinLobby } from "../api/index.js";
import { useTypicalRequest } from "../hooks/useTypicalRequest.js";

const Lobbies = () => {
  const { data, hasError, isLoading } = useTypicalRequest(getAllLobbies);
  if (hasError) {
    return html`<p>There was an issue loading the lobbies.</p>`;
  }
  if (isLoading) {
    return html`<p>Loading lobbies...</p>`;
  }
  const { lobbies } = data;
  const handleJoin = async (e, lobbyId) => {
    e.preventDefault();
    await joinLobby({ lobbyId, name });
    Router.go(`/lobby/${lobbyId}`);
  };
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
      <h2>Lobbies</h2>
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

customElements.define("be-lobbies", component(Lobbies));
