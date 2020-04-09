import { html, component } from "../dependencies.js";

const Player = ({
  options,
  name = "Name",
  hand,
  onOptionSelection: handleOptionSelection,
}) => {
  return html`<style>
      .options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        gap: 1rem;
      }
      .option {
        font-size: 1rem;
        overflow-wrap: break-word;
      }
      .cards {
        display: grid;
        grid-template-columns: repeat(3, max-content);
        width: auto;
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
          html`<button
            .onclick=${() => handleOptionSelection(option)}
            class="option"
          >
            ${typeof option === "string"
              ? option
              : html`<be-card
                  .suit=${option.suit}
                  .rank=${option.rank}
                ></be-card>`}
          </button>`
      )}
    </div>`;
};

customElements.define("be-player", component(Player));
