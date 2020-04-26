import {
  html,
  component,
  useMemo,
  useCallback,
} from "../dependencies/index.js";
import { startGame, getOptions } from "../game-engine.js";
import { chooseOption } from "../api.js";
import { useGame } from "../hooks/useGame.js";

// const initialGame = startGame([
//   { name: "Julia", position: "1" },
//   { name: "Serena", position: "2" },
//   { name: "Larry", position: "3" },
//   { name: "Noodle", position: "4" },
// ]);

const DebugApp = () => {
  const gameId = location.pathname.split("/debug-game/")[1];
  const { data: gameData, forceAcquire, hasError, isLoading } = useGame(gameId);
  const players = useMemo(() => {
    if (!isLoading && !hasError) {
      return gameData.game.phase.teams.reduce(
        (accumulator, team) => accumulator.concat(team.players),
        []
      );
    }
    return [];
  }, [isLoading, hasError]);
  const handleOptionSelection = (position) => async (option) => {
    await chooseOption({ gameId: gameData.game.id, option, position });
    forceAcquire();
  };
  if (isLoading && !gameData) {
    debugger;
    return html`<be-loading .color=${"#000"} .message=${"Making move..."} />`;
  }
  const { phase } = gameData.game;
  return html`<style>
      .players {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      }
      .tricks {
        display: grid;
        grid-auto-flow: column;
        gap: 2rem;
        align-items: flex-end;
        width: max-content;
      }
      .tricks > * {
        width: 9.4rem;
      }
    </style>
    <be-game-header .game=${phase}></be-game-header>
    <div class="tricks">
      ${phase.finishedTricks &&
      phase.finishedTricks.map(
        (trick) => html`<be-trick .trick=${trick}></be-trick>`
      )}
      ${phase.currentTrick && phase.currentTrick.length > 0
        ? html`<be-current-trick
            .currentTrick=${phase.currentTrick}
          ></be-current-trick>`
        : null}
    </div>
    <div class="players">
      ${players.map(
        (player) =>
          html`<debug-player
            .options=${getOptions(phase, player.position)}
            .name=${player.name}
            .hand=${player.hand}
            .onOptionSelection=${handleOptionSelection(player.position)}
          ></debug-player>`
      )}
    </div>`;
};

customElements.define("be-debug-app", component(DebugApp));
