import { html } from "../dependencies.js";
import { determineIfPhaseIsLegal } from "../game-engine.js";

export const GameHeader = ({ game }) => {
  const [isPhaseLegal, errorMessage] = determineIfPhaseIsLegal(game);
  return html`<style>
      .container {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }
    </style>
    <div class="container">
      <h1>Bid Euchre</h1>
      <h2>Phase: ${game.name}</h2>
      ${!isPhaseLegal
        ? html`<p>Here's what's wrong: ${errorMessage}</p>`
        : null}
      <div>
        <h3>Points</h3>
        ${game.teams.map(
          (team) =>
            html`<p>
              ${team.players.map((player) => player.name).join("/")}:
              ${team.points}
            </p>`
        )}
      </div>
    </div>`;
};
