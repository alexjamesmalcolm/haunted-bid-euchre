import { html, component } from "../dependencies/index.js";

const Trick = ({ trick }) => html` <style>
    .trick {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      width: max-content;
    }
    .card {
      width: 1rem;
    }
  </style>
  <div class="trick">
    ${trick.map(
      ({ card }) => html`<div class="card">
        <be-card .rank=${card.rank} .suit=${card.suit}></be-card>
      </div>`
    )}
  </div>`;

customElements.define("be-trick", component(Trick));
