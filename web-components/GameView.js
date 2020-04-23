import {
  html,
  component,
  useEffect,
  useState,
  useMemo,
} from "../dependencies/index.js";
import { useGame } from "../hooks/useGame.js";
import { Store } from "../store.js";

const getPlayer = (phase, name) =>
  phase.teams[0].players
    .concat(phase.teams[1].players)
    .find((player) => player.name === name);

const GameView = () => {
  const gameId = location.pathname.split("/game/")[1];
  const [position, setPosition] = useState("");
  const { data: gameData, hasError, isLoading } = useGame(gameId, position);
  const { name } = Store;
  useEffect(() => {
    if (!isLoading && !hasError && gameData.game) {
      const player = getPlayer(gameData.game.phase, name);
      setPosition(player.position);
    }
  }, [isLoading, hasError]);
  const options = useMemo(
    () => (gameData && gameData.options ? gameData.options : []),
    [gameData]
  );
  return html``;
};

customElements.define("game-view", component(GameView));
