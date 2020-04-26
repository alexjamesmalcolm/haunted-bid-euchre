import "./GameHeader.js";
import "./Player.js";
import "./Card.js";
import "./CurrentTrick.js";
import "./Loading.js";
import "./Trick.js";
import "./LobbiesView.js";
import "./Header.js";
import "./NotFoundView.js";
import "./HomeView.js";
import "./Button.js";
import "./LobbyView.js";
import "./GameView.js";
import "./DebugApp.js";
import "./DebugPlayer.js";
import "./OtherPlayer.js";

import { Router } from "../dependencies/index.js";

const outlet = document.getElementById("root");
const router = new Router(outlet);
router.setRoutes([
  { path: "/", component: "home-view" },
  { path: "/lobby", component: "lobbies-view" },
  { path: "/lobby/:id", component: "lobby-view" },
  { path: "/game/:id", component: "game-view" },
  { path: "/debug-game/:id", component: "be-debug-app" },
  { path: "(.*)", component: "not-found-view" },
]);
