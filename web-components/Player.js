import { html, component } from "../dependencies/index.js";

const Player = ({
  options,
  hand,
  onOptionSelection: handleOptionSelection,
  tricksTaken = "",
}) => html`<style>
      .options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(4, 1fr);
        width: 100%;
        gap: 1rem 0.4rem;
      }
      .options > * {
        width: 100%;
      }
      .option {
        font-size: 1rem;
        overflow-wrap: break-word;
      }
      .cards {
        display: grid;
        grid-template-columns: repeat(3, max-content);
        width: auto;
        gap: 0.65rem 0.9rem;
        justify-content: center;
      }
      .card-option {
        padding: 3px;
        margin: -3px;
        border: 1px black solid;
      }
      .option-button-contents {
        font-size: 16px;
      }
      .option-button-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      h3 {
        margin-top: 4px;
        margin-bottom: 6px;
      }
      * {
        margin: 0;
      }
    </style>
    <slot></slot>
    ${
      tricksTaken !== "" ? html`<p>Tricks you've taken: ${tricksTaken}</p>` : ""
    }
    ${options.length > 0 ? html`<p>It's your turn!</p>` : ""}
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
              <be-card .suit=${card.suit} .rank=${card.rank}></be-card>
            </button>`
          : html`<be-card .suit=${card.suit} .rank=${card.rank}></be-card>`
      )}
    </div>
    ${
      options.length > 0 && typeof options[0] === "string"
        ? html`<h3>Options</h3>
            <div class="options">
              ${options.map(
                (option) => html`<div class="option-button-container">
                  <be-button
                    .onclick=${() => handleOptionSelection(option)}
                    class="option"
                    .color=${"primary"}
                  >
                    <span class="option-button-contents">${option}</span>
                  </be-button>
                </div>`
              )}
            </div>`
        : null
    }
    </div>`;

customElements.define("be-player", component(Player));
