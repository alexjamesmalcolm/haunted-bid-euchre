import { html } from "../dependencies.js";

export const Card = ({ rank, suit }) => {
  return html`<style>
      .container {
        border: 1px grey solid;
        border-radius: 25%;
        padding: 1rem;
      }
    </style>
    <div class="container">
      <p>Rank: ${rank}</p>
      <p>Suit: ${suit}</p>
    </div>`;
};
