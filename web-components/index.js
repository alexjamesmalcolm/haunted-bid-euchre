import { component } from "../dependencies.js";
import { App } from "./App.js";
import { GameHeader } from "./GameHeader.js";
import { Player } from "./Player.js";
import { Card } from "./Card.js";

customElements.define("be-app", component(App));
customElements.define("be-game-header", component(GameHeader));
customElements.define("be-player", component(Player));
customElements.define("be-card", component(Card));
