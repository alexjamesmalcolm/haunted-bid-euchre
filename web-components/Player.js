import { html, component, useState } from "../dependencies.js";
import {} from "../game-engine.js";

export const Player = ({
  options,
  name = "Name",
  hand,
  onOptionSelection: handleOptionSelection,
}) => {
  return html`<style>
      .options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: max-content;
        gap: 1rem;
      }
      .cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        width: max-content;
        gap: 1rem;
      }
    </style>
    <h2>${name}</h2>
    <h3>Hand</h3>
    <div class="cards">
      ${hand.map(
        (card) =>
          html`<be-card .suit=${card.suit} .rank=${card.rank}></be-card>`
      )}
    </div>
    ${options.length > 0 ? html`<h3>Options</h3>` : null}
    <div class="options">
      ${options.map(
        (option) =>
          html`<button .onclick=${() => handleOptionSelection(option)}>
            ${typeof option === "string"
              ? option
              : `${option.rank} of ${option.suit}`}
          </button>`
      )}
    </div>`;
};
