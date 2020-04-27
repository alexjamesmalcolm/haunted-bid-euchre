import {
  html,
  component,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "../dependencies/index.js";
import { useGame } from "../hooks/useGame.js";
import { useStore } from "../hooks/useStore.js";
import { chooseOption } from "../api.js";
import { getPositionOfWinnerOfTrick, getOptions } from "../game-engine.js";

const getPlayers = (phase) =>
  phase.teams[0].players.concat(phase.teams[1].players);

const getPlayer = (phase, name) =>
  getPlayers(phase).find((player) => player.name === name);

const getPlayerByPosition = (phase, position) => {
  const players = getPlayers(phase);
  return players.find((player) => player.position === position);
};

const getTeamByMemberPosition = (phase, position) => {
  const { teams } = phase;
  return teams.find((team) =>
    team.players.some((player) => player.position === position)
  );
};

const getTricksTakenForPosition = (phase, position) => {
  if (phase && phase.finishedTricks) {
    return phase.finishedTricks.filter((trick) => {
      const trickWinner = getPositionOfWinnerOfTrick(trick, phase.trump);
      return trickWinner === position;
    }).length;
  }
  return "";
};

const getTurnOrderForPosition = (dealerPosition, position) => {
  if (dealerPosition === position) return "Dealer";
  if (dealerPosition === getNextPosition(position)) return "3rd";
  if (dealerPosition === getNextPosition(getNextPosition(position)))
    return "2nd";
  return "1st";
};

const getBidChoiceForPosition = (bids, position) => {
  if (!bids) return "";
  const bid = bids.find((bid) => bid.playerPosition === position);
  return bid ? bid.choice : "";
};

const getNextPosition = (position) => {
  if (position === "4") return "1";
  if (position === "1") return "2";
  if (position === "2") return "3";
  return "4";
};

const getPreviousPosition = (position) =>
  getNextPosition(getNextPosition(getNextPosition(position)));

const GameView = () => {
  const gameId = location.pathname.split("/game/")[1];
  const [position, setPosition] = useState("");
  const { data: gameData, hasError, isLoading, forceAcquire } = useGame(
    gameId,
    position
  );
  const { name } = useStore();
  useEffect(() => {
    if (!isLoading && !hasError && gameData.game) {
      const player = getPlayer(gameData.game.phase, name);
      if (player && player.position) setPosition(player.position);
    }
  }, [isLoading, hasError]);
  const options = useMemo(() => {
    if (gameData && gameData.game) {
      return getOptions(gameData.game.phase, position);
    }
    return [];
  }, [gameData, position]);
  const handleOptionSelection = useCallback(
    async (option) => {
      await chooseOption({ gameId, option, position });
      forceAcquire();
    },
    [gameId, position]
  );
  const detailContent = useMemo(() => {
    if (gameData && gameData.game && gameData.game.phase) {
      const { phase } = gameData.game;
      if (phase.name === "Picking Trump") {
        const { choice, playerPosition } = phase.winningBid;
        const player = getPlayerByPosition(phase, playerPosition);
        return html`Winning bid: ${choice} by ${player.name}`;
      }
      if (phase.name === "Trick-Taking") {
        const {
          trump,
          winningBid: { choice, playerPosition },
        } = phase;
        const player = getPlayerByPosition(phase, playerPosition);
        return html`Trump: ${trump} for ${choice} by ${player.name}`;
      }
    }
    return "";
  }, [gameData]);
  const playerContent = useMemo(() => {
    if (gameData && gameData.game) {
      const { phase } = gameData.game;
      if (phase.name === "Trick-Taking") {
        const { currentTrick } = phase;
        if (currentTrick.length > 0)
          return html`<div class="current-trick">
            <p>
              Current Trick
              (${getPlayerByPosition(phase, currentTrick[0].owner).name} led):
            </p>
            ${currentTrick.map(
              ({ card }) =>
                html`<be-card .suit=${card.suit} .rank=${card.rank}></be-card>`
            )}
          </div>`;
      }
    }
    return "";
  }, [gameData]);
  const currentPlayerPosition = useMemo(() => {
    if (gameData && gameData.game) {
      const { phase } = gameData.game;
      if (phase.bidPosition) return phase.bidPosition;
      if (phase.cardPosition) return phase.cardPosition;
      if (phase.winningBid) return phase.winningBid.playerPosition;
    }
    return "";
  }, [gameData]);
  if ((isLoading && !gameData) || !position) {
    return html`<be-loading .color=${"#000"} .message=${"Making move..."} />`;
  }
  const player = getPlayer(gameData.game.phase, name);
  if (!player) {
    return html`<p>I don't think you're in this game, ${name}</p>`;
  }
  const { phase } = gameData.game;

  const leftPosition = getNextPosition(position);
  const teammatePosition = getNextPosition(getNextPosition(position));
  const rightPosition = getPreviousPosition(position);

  const leftPlayer = getPlayerByPosition(phase, leftPosition);
  const teammatePlayer = getPlayerByPosition(phase, teammatePosition);
  const rightPlayer = getPlayerByPosition(phase, rightPosition);

  const ourTeam = getTeamByMemberPosition(phase, teammatePosition);
  const theirTeam = getTeamByMemberPosition(phase, leftPosition);

  return html`<style>
      .container {
        display: grid;
        justify-content: center;
        grid-template-rows: auto auto ${phase.name === "Bidding"
            ? "5rem"
            : "10.8rem"};
      }
      .other-players {
        display: grid;
        grid-auto-flow: column;
        width: 100vw;
      }
      .detail-line {
        text-align: center;
      }
      .score {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 1rem;
      }
      .score > *:first-child {
        text-align: right;
      }
    </style>
    <div class="container">
      <p class="score">
        <span>Us: ${ourTeam.points}</span>
        <span>–</span>
        <span>Them: ${theirTeam.points}</span>
      </p>
      <p class="detail-line">${detailContent}</p>
      <div class="other-players">
        <other-player
          .player=${leftPlayer}
          .positionEmoji=${html`↖️`}
          .isItTheirTurn=${currentPlayerPosition === leftPosition}
          .isShowingCardCount=${phase.name !== "Bidding"}
          .turnOrder=${getTurnOrderForPosition(phase.dealer, leftPosition)}
          .bidChoice=${getBidChoiceForPosition(phase.bids, leftPosition)}
          .isBidWinner=${phase.winningBid &&
          phase.winningBid.playerPosition === leftPosition}
          .tricksTaken=${getTricksTakenForPosition(phase, leftPosition)}
        ></other-player>
        <other-player
          .player=${teammatePlayer}
          .positionEmoji=${html`⬆️`}
          .isItTheirTurn=${currentPlayerPosition === teammatePosition}
          .isShowingCardCount=${phase.name !== "Bidding"}
          .turnOrder=${getTurnOrderForPosition(phase.dealer, teammatePosition)}
          .bidChoice=${getBidChoiceForPosition(phase.bids, teammatePosition)}
          .isBidWinner=${phase.winningBid &&
          phase.winningBid.playerPosition === teammatePosition}
          .tricksTaken=${getTricksTakenForPosition(phase, teammatePosition)}
        ></other-player>
        <other-player
          .player=${rightPlayer}
          .positionEmoji=${html`↗️`}
          .isItTheirTurn=${currentPlayerPosition === rightPosition}
          .isShowingCardCount=${phase.name !== "Bidding"}
          .turnOrder=${getTurnOrderForPosition(phase.dealer, rightPosition)}
          .bidChoice=${getBidChoiceForPosition(phase.bids, rightPosition)}
          .isBidWinner=${phase.winningBid &&
          phase.winningBid.playerPosition === rightPosition}
          .tricksTaken=${getTricksTakenForPosition(phase, rightPosition)}
        ></other-player>
      </div>
      <be-player
        .options=${options}
        .hand=${player.hand}
        .onOptionSelection=${handleOptionSelection}
        .tricksTaken=${getTricksTakenForPosition(phase, player.position)}
        >${playerContent}</be-player
      >
    </div>`;
};

customElements.define(
  "game-view",
  component(GameView, { useShadowDOM: false })
);
