import {
  html,
  component,
  useCallback,
  useEffect,
  useMemo,
  Router,
} from "../dependencies/index.js";
import { startLobby, getAllLobbies, getAllGames } from "../api.js";
import { useTypicalRequest } from "../hooks/useTypicalRequest.js";
import { useGoogleLogin } from "../hooks/googleLogin/useGoogleLogin.js";
import { useStore } from "../hooks/useStore.js";

const HomeView = () => {
  const {
    data: lobbyData,
    hasError: lobbyHasError,
    isLoading: isLoadingLobby,
  } = useTypicalRequest(getAllLobbies);
  const {
    data: gameData,
    hasError: gameHasError,
    isLoading: isLoadingGame,
  } = useTypicalRequest(getAllGames);
  const { hasLoggedIn, name, setHasLoggedIn, setName } = useStore();
  const onSuccess = useCallback(
    (res) => {
      setName(res.profileObj.name);
      setHasLoggedIn(true);
      debugger;
    },
    [setName, setHasLoggedIn]
  );
  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    onFailure: (res) => {
      console.warn(res);
    },
    clientId:
      "1046915334052-fg0ah1qglsbu2ef240e4ddiiftv70nrq.apps.googleusercontent.com",
  });
  const lobbyPlayerIsIn = useMemo(() => {
    if (!lobbyData || !hasLoggedIn) return false;
    const { lobbies } = lobbyData;
    return lobbies.find((lobby) =>
      lobby.players.map((player) => player.name).includes(name)
    );
  }, [lobbyData, name, hasLoggedIn]);

  const gamePlayerIsIn = useMemo(
    () =>
      lobbyPlayerIsIn && lobbyPlayerIsIn.game ? lobbyPlayerIsIn.game : false,
    [lobbyPlayerIsIn]
  );

  useEffect(() => {
    if (gamePlayerIsIn) {
      Router.go(`/game/${gamePlayerIsIn.id}`);
    } else if (lobbyPlayerIsIn) {
      Router.go(`/lobby/${lobbyPlayerIsIn.id}`);
    }
  }, [gamePlayerIsIn]);

  const handleCreateLobby = useCallback(async () => {
    const { lobby } = await startLobby(name);
    Router.go(`/lobby/${lobby.id}`);
  }, [name]);

  if (!loaded) return html`<be-loading .color=${"#000"}></be-loading>`;
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
      .loginText {
        font-size: 1rem;
      }
    </style>
    <div class="container">
      ${hasLoggedIn
        ? html`<div class="name-container">
              <p>Name: ${name}</p>
            </div>
            <be-button class="button">
              <a class="button-content" href="/lobby">
                Join a Lobby
              </a>
            </be-button>
            <be-button class="button" .onclick=${handleCreateLobby}>
              <p class="button-content">
                Create a Lobby
              </p>
            </be-button>`
        : html`<be-button .onclick=${signIn}
            ><span class="loginText">Login</span></be-button
          >`}
    </div>`;
};

customElements.define(
  "home-view",
  component(HomeView, { useShadowDOM: false })
);
