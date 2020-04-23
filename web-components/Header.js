import { html, component } from "../dependencies/index.js";

const Header = () => html`<style>
    .header {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
    .header * {
      margin: 1rem 0;
    }
  </style>
  <header class="header">
    <h1>Bid Euchre</h1>
  </header>`;

customElements.define("be-header", component(Header));
