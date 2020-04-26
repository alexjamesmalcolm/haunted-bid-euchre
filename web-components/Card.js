import { html, component } from "../dependencies/index.js";

const Card = ({ rank, suit, isFacingUp = true }) => {
  const getShortRank = () => (rank == "10" ? "10" : rank.slice(0, 1));
  const getShortSuit = () => suit.slice(0, 1);
  return html`<style>
      .card {
        width: 3.5rem;
      }
    </style>
    ${isFacingUp
      ? html`<img
          alt="${rank} of ${suit}"
          class="card"
          src="/images/cards/${getShortRank()}${getShortSuit()}.svg"
        />`
      : html`<img
          alt="Face down card"
          class="card"
          src="/images/cards/RED_BACK.svg"
        />`}`;
};

customElements.define("be-card", component(Card, { useShadowDOM: false }));
