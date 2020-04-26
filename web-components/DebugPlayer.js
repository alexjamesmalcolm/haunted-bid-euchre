import { html, component } from "../dependencies/index.js";

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
      .card-option {
        padding: 3px;
        margin: -3px;
      }
    </style>
    <h2>${name}</h2>
    <h3>Hand</h3>
    <div class="cards">
      ${hand.map((card) =>
        options.some(
          (option) =>
            typeof option !== "string" &&
            option.rank === card.rank &&
            option.suit === card.suit
        )
          ? html`<button
              .onclick=${() => handleOptionSelection(card)}
              class="card-option"
            >
              <be-card
                .suit=${card.suit}
                .rank=${card.rank}
                .isFacingUp=${options.length > 0}
              ></be-card>
            </button>`
          : html`<be-card
              .suit=${card.suit}
              .rank=${card.rank}
              .isFacingUp=${options.length > 0}
            ></be-card>`
      )}
    </div>
    ${
      options.length > 0 && typeof options[0] === "string"
        ? html`<h3>Options</h3>
            <div class="options">
              ${options.map(
                (option) => html`<button
                  .onclick=${() => handleOptionSelection(option)}
                  class="option"
                >
                  ${option}
                </button>`
              )}
            </div>`
        : null
    }
    </div>`;
};

customElements.define("debug-player", component(Player));
