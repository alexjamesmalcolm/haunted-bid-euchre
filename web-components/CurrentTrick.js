import { html, component } from "../dependencies.js";

const CurrentTrick = ({ currentTrick = [] }) => {
  return html` <style>
      .container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: max-content;
      }
      .card-container {
        width: 1rem;
      }
    </style>
    <h2>Current Trick</h2>
    <div class="container">
      ${currentTrick.map(
        (upCard) =>
          html`<div class="card-container">
            <be-card
              .suit=${upCard.card.suit}
              .rank=${upCard.card.rank}
            ></be-card>
          </div>`
      )}
    </div>`;
};

customElements.define("be-current-trick", component(CurrentTrick));
