const resourceName =
  location.hostname === "localhost" ? "localhost:3000" : "euchre.bid/api";

const createEndpoint = (path) =>
  `${location.protocol}//${resourceName}/${path}`;

const headers = { "Content-Type": "application/json" };

const endpoints = {
  status: createEndpoint("status"),
  lobby: createEndpoint("lobby"),
  singleLobby: (lobbyId) => createEndpoint(`lobby/${lobbyId}`),
  game: createEndpoint("game"),
  singleGame: (gameId, position = "") =>
    createEndpoint(`game/${gameId}${position ? `?position=${position}` : ""}`),
};

export const checkIfApiIsUp = () =>
  fetch(endpoints.status).then((response) => response.status === 200);

export const getAllLobbies = () =>
  fetch(endpoints.lobby).then((response) => response.json());

export const getLobby = (lobbyId) =>
  fetch(endpoints.singleLobby(lobbyId)).then((response) => response.json());

export const startLobby = (name) =>
  fetch(endpoints.lobby, {
    method: "POST",
    body: JSON.stringify({ name }),
    headers,
  }).then((response) => response.json());

const updateLobby = (lobby) =>
  fetch(endpoints.lobby, {
    method: "PUT",
    body: JSON.stringify({ lobby }),
    headers,
  }).then((response) => response.json());

export const joinLobby = async ({ lobbyId, name }) => {
  const { lobby } = await getLobby(lobbyId);
  const { players } = lobby;
  return updateLobby({
    ...lobby,
    players: players.concat([
      { name, position: new String(players.length + 1) },
    ]),
  });
};

export const leaveLobby = async ({ lobbyId, name }) => {
  const { lobby } = await getLobby(lobbyId);
  const { players } = lobby;
  return updateLobby({
    ...lobby,
    players: players.filter((player) => player.name !== name),
  });
};

export const swapPositionsInLobby = async ({
  position,
  desiredPosition,
  lobbyId,
}) => {
  const { lobby } = await getLobby(lobbyId);
  const { players } = lobby;
  return updateLobby({
    ...lobby,
    players: players.map((player) => {
      if (player.position === position)
        return { ...player, position: desiredPosition };
      if (player.position === desiredPosition) return { ...player, position };
      return player;
    }),
  });
};

export const getAllGames = () =>
  fetch(endpoints.game).then((response) => response.json());

export const getGame = ({ gameId, position }) =>
  fetch(endpoints.singleGame(gameId, position)).then((response) =>
    response.json()
  );

export const startGame = (lobbyId) =>
  fetch(endpoints.game, {
    method: "POST",
    body: JSON.stringify({ lobbyId }),
    headers,
  }).then((response) => response.json());

export const chooseOption = ({ gameId, option, position }) =>
  fetch(endpoints.singleGame(gameId), {
    method: "PATCH",
    body: JSON.stringify({ option, position }),
    headers,
  }).then((response) => response.json());
