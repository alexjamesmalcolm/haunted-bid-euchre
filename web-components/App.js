import { html, component, useState, useEffect } from "../dependencies.js";
import { startGame, getOptions, chooseOption } from "../game-engine.js";
import { checkIfApiIsUp } from "../api/index.js";

const initialGame = startGame([
  { name: "Julia", position: "1" },
  { name: "Serena", position: "2" },
  { name: "Larry", position: "3" },
  { name: "Noodle", position: "4" },
]);

const App = () => {
  const [game, setGame] = useState(initialGame);
  console.log({ game });
  const [isServerUp, setIsServerUp] = useState(false);
  const players = game.teams.reduce(
    (accumulator, team) => accumulator.concat(team.players),
    []
  );
  useEffect(() => {
    checkIfApiIsUp().then(setIsServerUp);
  }, []);
  if (!isServerUp) {
    return html`<be-loading
      .color=${"#000"}
      .message=${"Connecting to server..."}
    />`;
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
            .onOptionSelection=${(option) =>
              setGame(chooseOption(option, game, player.position))}
          ></be-player>`
      )}
    </div>`;
};

customElements.define("be-app", component(App));
