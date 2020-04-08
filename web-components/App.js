import { html, useState } from "../dependencies.js";
import { startGame, getOptions, chooseOption } from "../game-engine.js";

const initialGame = startGame([
  { name: "Julia", position: "1" },
  { name: "Serena", position: "2" },
  { name: "Larry", position: "3" },
  { name: "Noodle", position: "4" },
]);

export const App = () => {
  const [game, setGame] = useState(initialGame);
  const players = game.teams.reduce(
    (accumulator, team) => accumulator.concat(team.players),
    []
  );
  return html`<style>
      .players {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }
    </style>
    <be-game-header .game=${game}></be-game-header>
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
