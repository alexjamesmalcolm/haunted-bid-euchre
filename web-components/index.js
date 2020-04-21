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

import { Router } from "https://unpkg.com/@vaadin/router@1.7.1/dist/vaadin-router.js";

const outlet = document.getElementById("root");
const router = new Router(outlet);
router.setRoutes([
  { path: "/", component: "home-view" },
  { path: "/lobby", component: "lobbies-view" },
  { path: "/lobby/:id", component: "lobby-view" },
  { path: "(.*)", component: "not-found-view" },
]);
