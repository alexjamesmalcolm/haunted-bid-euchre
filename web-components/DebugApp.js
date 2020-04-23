import { html, component, useMemo } from "../dependencies/index.js";
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
      return game.teams.reduce(
        (accumulator, team) => accumulator.concat(team.players),
        []
      );
    }
    return [];
  }, [isLoading, hasError]);
  console.log(isLoading, hasError);
  if (isLoading) {
    return html`<be-loading .color=${"#000"} .message=${"Making move..."} />`;
  }
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
    <be-game-header .game=${game}></be-game-header>
    <div class="tricks">
      ${game.finishedTricks &&
      game.finishedTricks.map(
        (trick) => html`<be-trick .trick=${trick}></be-trick>`
      )}
      ${game.currentTrick && game.currentTrick.length > 0
        ? html`<be-current-trick
            .currentTrick=${game.currentTrick}
          ></be-current-trick>`
        : null}
    </div>
    <div class="players">
      ${players.map(
        (player) =>
          html`<be-player
            .options=${getOptions(game, player.position)}
            .name=${player.name}
            .hand=${player.hand}
            .onOptionSelection=${handleOptionSelection}
          ></be-player>`
      )}
    </div>`;
};

customElements.define("be-debug-app", component(DebugApp));
