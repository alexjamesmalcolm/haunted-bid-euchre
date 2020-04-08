import { html, useState } from "../dependencies.js";
import { startGame } from "../game-engine.js";

const initialGame = startGame([
  { name: "Julia", position: "1" },
  { name: "Serena", position: "2" },
  { name: "Larry", position: "3" },
  { name: "Noodle", position: "4" },
]);

export const App = ({ name }) => {
  const [game, setGame] = useState(initialGame);
  return html`<div class="container">
    <be-game-header></be-game-header><be-player></be-player
    ><be-player></be-player><be-player></be-player><be-player></be-player>
  </div>`;
};
