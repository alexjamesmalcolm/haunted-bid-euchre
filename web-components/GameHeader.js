import { html } from "../dependencies.js";
import { determineIfPhaseIsLegal } from "../game-engine.js";

export const GameHeader = ({ game }) => {
  const [isPhaseLegal, errorMessage] = determineIfPhaseIsLegal(game);
  return html`<div class="container">
    <h1>Phase: ${game.name}</h1>
    <!-- <p>Is Phase Legal: ${isPhaseLegal ? "Yes!" : "Nope!"}</p> -->
    ${!isPhaseLegal ? html`<p>Here's what's wrong: ${errorMessage}</p>` : null}
    <h2>Points</h2>
    ${game.teams.map(
      (team) =>
        html`<p>
          ${team.players.map((player) => player.name).join("/")}: ${team.points}
        </p>`
    )}
  </div>`;
};
