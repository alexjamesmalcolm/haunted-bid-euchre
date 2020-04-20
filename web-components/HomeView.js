import {
  html,
  component,
  useCallback,
  useState,
  Router,
} from "../dependencies.js";
import { Store } from "../store.js";
import { startLobby } from "../api/index.js";

const HomeView = () => {
  const [hasConfirmedName, setHasConfirmedName] = useState(false);
  const { name, setName } = Store;
  const handleSubmit = useCallback(
    (e) => {
      const value =
        e.target.className === "form"
          ? e.target.name.value
          : e.target.parentElement.parentElement.name.value;
      setName(value);
      setHasConfirmedName(true);
    },
    [setName]
  );
  const handleCreateLobby = useCallback(async () => {
    const { lobby } = await startLobby(name);
    Router.go(`/lobby/${lobby.id}`);
  }, [name]);
  return html`<style>
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        flex-direction: column;
      }
      .container > * {
        width: max-content;
        margin-bottom: 1rem;
      }
      .button-content {
        color: white;
        text-decoration: none;
        font-size: 20px;
        margin: 0;
      }
      .form {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .form > * {
        margin-bottom: 5px;
      }
      .input {
        font-size: 20px;
        border: 1px #343a40 solid;
        padding: 3px;
        border-radius: 3px;
        text-align: center;
      }
      .confirm-contents {
        font-size: 20px;
      }
      .name-container {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        gap: 6px;
      }
    </style>
    <div class="container">
      ${hasConfirmedName
        ? html`<div class="name-container">
              <p>Name: ${name}</p>
              <be-button
                .color=${"secondary"}
                .onclick=${() => setHasConfirmedName(false)}
              >
                Change Name
              </be-button>
            </div>
            <be-button class="button">
              <a class="button-content" href="/lobby">
                Join a Lobby
              </a>
            </be-button>
            <be-button class="button" .onclick=${handleCreateLobby}>
              <p class="button-content" .onclick=${handleCreateLobby}>
                Create a Lobby
              </p>
            </be-button>`
        : html`<form class="form" .onsubmit=${handleSubmit}>
            <label for="name">What's your name?</label>
            <input id="name" class="input" autofocus value=${name} />
            <be-button .type=${"submit"}>
              <span class="confirm-contents" .onclick=${handleSubmit}>
                Confirm
              </span>
            </be-button>
          </form>`}
    </div>`;
};

customElements.define("home-view", component(HomeView));
