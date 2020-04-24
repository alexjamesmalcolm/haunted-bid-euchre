import {
  html,
  component,
  useEffect,
  useState,
  useMemo,
} from "../dependencies/index.js";
import { useGame } from "../hooks/useGame.js";
import { useStore } from "../hooks/useStore.js";

const getPlayer = (phase, name) =>
  phase.teams[0].players
    .concat(phase.teams[1].players)
    .find((player) => player.name === name);

const GameView = () => {
  const gameId = location.pathname.split("/game/")[1];
  const [position, setPosition] = useState("");
  const { data: gameData, hasError, isLoading } = useGame(gameId, position);
  const { name } = useStore();
  useEffect(() => {
    if (!isLoading && !hasError && gameData.game) {
      console.log;
      const player = getPlayer(gameData.game.phase, name);
      if (player && player.position) setPosition(player.position);
    }
  }, [isLoading, hasError]);
  const options = useMemo(
    () => (gameData && gameData.options ? gameData.options : []),
    [gameData]
  );
  return html``;
};

customElements.define("game-view", component(GameView));
