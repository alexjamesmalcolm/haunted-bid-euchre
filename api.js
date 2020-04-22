const resourceName =
  location.hostname === "localhost" ? "localhost:3000" : "euchre.bid";

const createEndpoint = (path) =>
  `${location.protocol}//${resourceName}/api/${path}`;

const headers = { "Content-Type": "application/json" };

const endpoints = {
  status: createEndpoint("status"),
  lobby: createEndpoint("lobby"),
  singleLobby: (lobbyId) => createEndpoint(`lobby/${lobbyId}`),
  game: createEndpoint("game"),
  singleGame: (gameId, position = "") =>
    createEndpoint(`game/${gameId}${position ? `?position=${position}` : ""}`),
};

const getJsonOrRejectIfError = (response = new Response()) =>
  response.ok ? response.json() : Promise.reject();

export const checkIfApiIsUp = () =>
  fetch(endpoints.status).then((response) => response.ok);

export const getAllLobbies = () =>
  fetch(endpoints.lobby).then(getJsonOrRejectIfError);

export const getLobby = (lobbyId) =>
  fetch(endpoints.singleLobby(lobbyId))
    .then(getJsonOrRejectIfError)
    .then((data) => (data["error"] ? Promise.reject(data) : data));

export const startLobby = (name) =>
  fetch(endpoints.lobby, {
    method: "POST",
    body: JSON.stringify({ name }),
    headers,
  }).then(getJsonOrRejectIfError);

const updatePlayersInLobby = (lobbyId, players) =>
  fetch(endpoints.singleLobby(lobbyId), {
    method: "PATCH",
    body: JSON.stringify({ players }),
    headers,
  }).then(getJsonOrRejectIfError);

export const joinLobby = async ({ lobbyId, name }) => {
  const { lobby } = await getLobby(lobbyId);
  const { players } = lobby;
  return updatePlayersInLobby(
    lobbyId,
    players.concat([{ name, position: new String(players.length + 1) }])
  );
};

export const leaveLobby = async ({ lobbyId, name }) => {
  const { lobby } = await getLobby(lobbyId);
  const { players } = lobby;
  return updatePlayersInLobby(
    lobbyId,
    players.filter((player) => player.name !== name)
  );
};

export const swapPositionsInLobby = async ({
  position,
  desiredPosition,
  lobbyId,
}) => {
  const { lobby } = await getLobby(lobbyId);
  const { players } = lobby;
  return updatePlayersInLobby(
    lobbyId,
    players.map((player) => {
      if (player.position === position)
        return { ...player, position: desiredPosition };
      if (player.position === desiredPosition) return { ...player, position };
      return player;
    })
  );
};

export const endLobby = (lobbyId) =>
  fetch(endpoints.singleLobby(lobbyId), { method: "DELETE" }).then(
    (response) => response.ok
  );

export const getAllGames = () =>
  fetch(endpoints.game).then(getJsonOrRejectIfError);

export const getGame = ({ gameId, position }) =>
  fetch(endpoints.singleGame(gameId, position)).then((response) =>
    response.json()
  );

export const startGame = (lobbyId) =>
  fetch(endpoints.game, {
    method: "POST",
    body: JSON.stringify({ lobbyId }),
    headers,
  }).then(getJsonOrRejectIfError);

export const chooseOption = ({ gameId, option, position }) =>
  fetch(endpoints.singleGame(gameId), {
    method: "PATCH",
    body: JSON.stringify({ option, position }),
    headers,
  }).then(getJsonOrRejectIfError);
