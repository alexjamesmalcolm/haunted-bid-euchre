import { html, component, useMemo } from "../dependencies/index.js";

const OtherPlayer = ({
  player,
  turnOrder = "",
  isItTheirTurn = false,
  bidChoice,
  isSittingOut = false,
  isBidWinner = false,
  positionEmoji = "",
  isShowingCardCount = true,
  tricksTaken = "",
}) => {
  const { hand } = player;
  const detailContent = useMemo(() => {
    if (bidChoice) return html`Bid: ${bidChoice}`;
    if (tricksTaken !== "") return html`Tricks: ${tricksTaken}`;
    if (isBidWinner) return html`🎉`;
    return "";
  }, [bidChoice, isBidWinner, tricksTaken]);
  return html`<style>
      * {
        margin: 0;
      }
      .container {
        filter: ${isSittingOut ? "grayscale(1)" : "none"};
        text-align: center;
      }
      .cards {
        display: flex;
        width: max-content;
        margin: auto;
      }
      .cards > *:not(:first-child) {
        margin-left: -3rem;
      }
      .name {
        width: 33.3333vw;
        text-overflow: ellipsis;
        overflow: hidden;
        height: max-content;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      .turn-order {
        min-height: 26px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-top: -5px;
      }
      .detail-line {
        min-height: 26px;
      }
    </style>
    <div class="container">
      <p class="name">${positionEmoji}${player.name}</p>
      <p class="turn-order">${isItTheirTurn ? html`🔴` : ""}${turnOrder}</p>
      <p class="detail-line">${detailContent}</p>
      <div class="cards">
        ${hand
          .filter(() => isShowingCardCount)
          .map(
            (card) =>
              html`<be-card
                .rank=${card.rank}
                .suit=${card.suit}
                .isFacingUp=${false}
              ></be-card>`
          )}
      </div>
    </div>`;
};

customElements.define("other-player", component(OtherPlayer));
