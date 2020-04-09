// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

// @ts-nocheck
/* eslint-disable */
let System, __instantiateAsync, __instantiate;

(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };

  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }

  __instantiateAsync = async (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExpA(m);
  };

  __instantiate = (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExp(m);
  };
})();

System.register("FixedLengthArray", [], function (exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [],
    execute: function () {},
  };
});
System.register("definitions", [], function (exports_2, context_2) {
  "use strict";
  var __moduleName = context_2 && context_2.id;
  return {
    setters: [],
    execute: function () {},
  };
});
System.register("shuffle", [], function (exports_3, context_3) {
  "use strict";
  var inPlaceShuffle, shuffle;
  var __moduleName = context_3 && context_3.id;
  return {
    setters: [],
    execute: function () {
      inPlaceShuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
          // swap elements array[i] and array[j]
          // we use "destructuring assignment" syntax to achieve that
          // you'll find more details about that syntax in later chapters
          // same can be written as:
          // let t = array[i]; array[i] = array[j]; array[j] = t
          [array[i], array[j]] = [array[j], array[i]];
        }
      };
      shuffle = (array) => {
        const result = array.map((a) => a);
        inPlaceShuffle(result);
        return result;
      };
      exports_3("default", shuffle);
    },
  };
});
System.register("utils", ["shuffle"], function (exports_4, context_4) {
  "use strict";
  var shuffle_ts_1,
    bidHierarchy,
    getHigherBid,
    getNextPosition,
    getPositionOfPartner,
    isFirstBidGreaterThanSecond,
    getHigherBids,
    getSameColorSuit,
    getCardsOfSuitWhenTrumpOrderedByHierarchyDesc,
    isSameCard,
    randomNumberBothInclusive,
    randomPlayerPosition,
    getAllCards,
    shuffleAndDealFourHands,
    getIndex,
    getHandSliceViaPosition;
  var __moduleName = context_4 && context_4.id;
  return {
    setters: [
      function (shuffle_ts_1_1) {
        shuffle_ts_1 = shuffle_ts_1_1;
      },
    ],
    execute: function () {
      bidHierarchy = [
        "Going Alone",
        "Partner's Best Card",
        "6",
        "5",
        "4",
        "3",
        "Pass",
      ];
      exports_4(
        "getHigherBid",
        (getHigherBid = (bidA, bidB) =>
          bidHierarchy.filter(
            (element) => element === bidA || element === bidB
          )[0])
      );
      exports_4(
        "getNextPosition",
        (getNextPosition = (position) => {
          if (position === "1") {
            return "2";
          } else if (position === "2") {
            return "3";
          } else if (position === "3") {
            return "4";
          } else {
            return "1";
          }
        })
      );
      exports_4(
        "getPositionOfPartner",
        (getPositionOfPartner = (position) => {
          if (position === "1") {
            return "3";
          } else if (position === "2") {
            return "4";
          } else if (position === "3") {
            return "1";
          } else {
            return "2";
          }
        })
      );
      isFirstBidGreaterThanSecond = (first, second) =>
        getHigherBid(first, second) === first;
      exports_4(
        "getHigherBids",
        (getHigherBids = (bid) =>
          bidHierarchy.filter(
            (element) =>
              element === "Pass" ||
              (bid !== element && isFirstBidGreaterThanSecond(element, bid))
          ))
      );
      getSameColorSuit = (suit) => {
        if (suit === "Clubs") {
          return "Spades";
        } else if (suit === "Spades") {
          return "Clubs";
        } else if (suit === "Diamonds") {
          return "Hearts";
        } else {
          return "Diamonds";
        }
      };
      exports_4(
        "getCardsOfSuitWhenTrumpOrderedByHierarchyDesc",
        (getCardsOfSuitWhenTrumpOrderedByHierarchyDesc = (suit, trump) => {
          if (trump === "Low" || trump === "High") {
            const cards = [
              { rank: "9", suit },
              { rank: "10", suit },
              { rank: "Jack", suit },
              { rank: "Queen", suit },
              { rank: "King", suit },
              { rank: "Ace", suit },
            ];
            return trump === "Low" ? cards : cards.reverse();
          } else {
            const leftBowerSuit = getSameColorSuit(suit);
            if (suit === trump) {
              const cards = [
                { rank: "Jack", suit },
                { rank: "Jack", suit: leftBowerSuit },
                { rank: "Ace", suit },
                { rank: "King", suit },
                { rank: "Queen", suit },
                { rank: "10", suit },
                { rank: "9", suit },
              ];
              return cards;
            } else {
              if (leftBowerSuit === suit) {
                const cards = [
                  { rank: "Ace", suit },
                  { rank: "King", suit },
                  { rank: "Queen", suit },
                  { rank: "10", suit },
                  { rank: "9", suit },
                ];
                return cards;
              } else {
                const cards = [
                  { rank: "Ace", suit },
                  { rank: "King", suit },
                  { rank: "Queen", suit },
                  { rank: "Jack", suit },
                  { rank: "10", suit },
                  { rank: "9", suit },
                ];
                return cards;
              }
            }
          }
        })
      );
      exports_4(
        "isSameCard",
        (isSameCard = (a, b) => a.rank === b.rank && a.suit === b.suit)
      );
      randomNumberBothInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      exports_4(
        "randomPlayerPosition",
        (randomPlayerPosition = () => {
          const playerPositions = ["1", "2", "3", "4"];
          return playerPositions[randomNumberBothInclusive(0, 3)];
        })
      );
      getAllCards = () => [
        { rank: "9", suit: "Clubs" },
        { rank: "10", suit: "Clubs" },
        { rank: "Jack", suit: "Clubs" },
        { rank: "Queen", suit: "Clubs" },
        { rank: "King", suit: "Clubs" },
        { rank: "Ace", suit: "Clubs" },
        { rank: "9", suit: "Diamonds" },
        { rank: "10", suit: "Diamonds" },
        { rank: "Jack", suit: "Diamonds" },
        { rank: "Queen", suit: "Diamonds" },
        { rank: "King", suit: "Diamonds" },
        { rank: "Ace", suit: "Diamonds" },
        { rank: "9", suit: "Hearts" },
        { rank: "10", suit: "Hearts" },
        { rank: "Jack", suit: "Hearts" },
        { rank: "Queen", suit: "Hearts" },
        { rank: "King", suit: "Hearts" },
        { rank: "Ace", suit: "Hearts" },
        { rank: "9", suit: "Spades" },
        { rank: "10", suit: "Spades" },
        { rank: "Jack", suit: "Spades" },
        { rank: "Queen", suit: "Spades" },
        { rank: "King", suit: "Spades" },
        { rank: "Ace", suit: "Spades" },
      ];
      exports_4(
        "shuffleAndDealFourHands",
        (shuffleAndDealFourHands = () => {
          const allCardsShuffled = shuffle_ts_1.default(getAllCards());
          return [
            [
              allCardsShuffled[0],
              allCardsShuffled[1],
              allCardsShuffled[2],
              allCardsShuffled[3],
              allCardsShuffled[4],
              allCardsShuffled[5],
            ],
            [
              allCardsShuffled[6],
              allCardsShuffled[7],
              allCardsShuffled[8],
              allCardsShuffled[9],
              allCardsShuffled[10],
              allCardsShuffled[11],
            ],
            [
              allCardsShuffled[12],
              allCardsShuffled[13],
              allCardsShuffled[14],
              allCardsShuffled[15],
              allCardsShuffled[16],
              allCardsShuffled[17],
            ],
            [
              allCardsShuffled[18],
              allCardsShuffled[19],
              allCardsShuffled[20],
              allCardsShuffled[21],
              allCardsShuffled[22],
              allCardsShuffled[23],
            ],
          ];
        })
      );
      getIndex = (position) => {
        if (position === "1") {
          return 0;
        } else if (position === "2") {
          return 1;
        } else if (position === "3") {
          return 2;
        }
        return 3;
      };
      exports_4(
        "getHandSliceViaPosition",
        (getHandSliceViaPosition = (position, fourShuffledHands) =>
          fourShuffledHands[getIndex(position)])
      );
    },
  };
});
System.register(
  "choose_option_utils/choose_for_bidding_phase",
  ["utils"],
  function (exports_5, context_5) {
    "use strict";
    var utils_ts_1, getWinningBid, chooseOptionForBiddingPhase;
    var __moduleName = context_5 && context_5.id;
    return {
      setters: [
        function (utils_ts_1_1) {
          utils_ts_1 = utils_ts_1_1;
        },
      ],
      execute: function () {
        getWinningBid = (bids) =>
          bids.reduce((previousValue, currentValue) => {
            const highestBidChoice = utils_ts_1.getHigherBid(
              previousValue.choice,
              currentValue.choice
            );
            return highestBidChoice === previousValue.choice
              ? previousValue
              : currentValue;
          });
        exports_5(
          "chooseOptionForBiddingPhase",
          (chooseOptionForBiddingPhase = (option, phase, currentPlayer) => {
            const bid = { choice: option, playerPosition: currentPlayer };
            const bids = phase.bids.concat([bid]);
            const isThisTheLastBid = currentPlayer === phase.dealer;
            if (isThisTheLastBid) {
              const winningBid = getWinningBid(bids);
              const nextPhase = {
                name: "Picking Trump",
                dealer: phase.dealer,
                teams: phase.teams,
                winningBid,
              };
              return nextPhase;
            } else {
              const nextPhase = {
                name: "Bidding",
                bidPosition: utils_ts_1.getNextPosition(phase.bidPosition),
                bids,
                dealer: phase.dealer,
                teams: phase.teams,
              };
              return nextPhase;
            }
          })
        );
      },
    };
  }
);
System.register(
  "choose_option_utils/choose_for_picking_trump_phase",
  ["utils"],
  function (exports_6, context_6) {
    "use strict";
    var utils_ts_2, chooseOptionForPickingTrumpPhase;
    var __moduleName = context_6 && context_6.id;
    return {
      setters: [
        function (utils_ts_2_1) {
          utils_ts_2 = utils_ts_2_1;
        },
      ],
      execute: function () {
        exports_6(
          "chooseOptionForPickingTrumpPhase",
          (chooseOptionForPickingTrumpPhase = (option, phase) => {
            const dealer = phase.dealer;
            const partner = utils_ts_2.getPositionOfPartner(
              phase.winningBid.playerPosition
            );
            const teams = phase.teams;
            if (phase.winningBid.choice === "Partner's Best Card") {
              const nextPhase = {
                name: "Picking Partner's Best Card",
                dealer,
                trump: option,
                partner,
                teams,
                winningBid: phase.winningBid,
              };
              return nextPhase;
            } else {
              const nextPhase = {
                name: "Trick-Taking",
                dealer,
                trump: option,
                winningBid: phase.winningBid,
                cardPosition: utils_ts_2.getNextPosition(dealer),
                teams,
                currentTrick: [],
                finishedTricks: [],
              };
              if (phase.winningBid.choice === "Going Alone") {
                nextPhase.playerSittingOut = partner;
              }
              return nextPhase;
            }
          })
        );
      },
    };
  }
);
System.register(
  "choose_option_utils/choose_for_partners_best_card_phase",
  ["utils"],
  function (exports_7, context_7) {
    "use strict";
    var utils_ts_3, chooseOptionForPickingPartnersBestCardPhase;
    var __moduleName = context_7 && context_7.id;
    return {
      setters: [
        function (utils_ts_3_1) {
          utils_ts_3 = utils_ts_3_1;
        },
      ],
      execute: function () {
        exports_7(
          "chooseOptionForPickingPartnersBestCardPhase",
          (chooseOptionForPickingPartnersBestCardPhase = (option, phase) => {
            const positionOfPlayerWhoIsPlayingWithoutPartner = utils_ts_3.getPositionOfPartner(
              phase.partner
            );
            const mapTeam = (team) => {
              const isTeamTheBidWinner = team.players.some(
                (player) => player.position === phase.partner
              );
              const mapPlayer = (player) => {
                const isPlayerSolo =
                  player.position ===
                  positionOfPlayerWhoIsPlayingWithoutPartner;
                const changedPlayer = isPlayerSolo
                  ? { ...player, hand: player.hand.concat([option]) }
                  : {
                      ...player,
                      hand: player.hand.filter(
                        (card) =>
                          card.rank !== option.rank && card.suit !== option.suit
                      ),
                    };
                return changedPlayer;
              };
              if (isTeamTheBidWinner) {
                const result = {
                  ...team,
                  players: [
                    mapPlayer(team.players[0]),
                    mapPlayer(team.players[1]),
                  ],
                };
                return result;
              } else {
                return team;
              }
            };
            const teams = [mapTeam(phase.teams[0]), mapTeam(phase.teams[1])];
            return {
              name: "Trick-Taking",
              playerSittingOut: phase.partner,
              dealer: phase.dealer,
              teams,
              winningBid: phase.winningBid,
              trump: phase.trump,
              currentTrick: [],
              finishedTricks: [],
              cardPosition: utils_ts_3.getNextPosition(phase.dealer),
            };
          })
        );
      },
    };
  }
);
System.register(
  "choose_option_utils/choose_for_trick_taking_phase",
  ["utils"],
  function (exports_8, context_8) {
    "use strict";
    var utils_ts_4,
      getHighestCard,
      getPositionOfWinnerOfTrick,
      getTricksNeededToMakeBid,
      getPointsReceivedForMakingBid,
      howManyPointsDoesTheTeamGetForBidding,
      chooseLastCardInLastTrickThenMoveDealerAndDeal,
      chooseOptionForTrickTakingPhase;
    var __moduleName = context_8 && context_8.id;
    return {
      setters: [
        function (utils_ts_4_1) {
          utils_ts_4 = utils_ts_4_1;
        },
      ],
      execute: function () {
        getHighestCard = (leadingSuit, trump, cards) => {
          const highestValueCardsInTrump = utils_ts_4.getCardsOfSuitWhenTrumpOrderedByHierarchyDesc(
            leadingSuit,
            trump
          );
          const highestValueCardsThatWereFound = highestValueCardsInTrump.filter(
            (card) =>
              cards.some((trickCard) => utils_ts_4.isSameCard(trickCard, card))
          );
          return highestValueCardsThatWereFound[0];
        };
        getPositionOfWinnerOfTrick = (trick, trump) => {
          const winningCard = getHighestCard(
            trick[0].card.suit,
            trump,
            trick.map((upCard) => {
              return upCard.card;
            })
          );
          const winner = trick.filter((upCard) =>
            utils_ts_4.isSameCard(upCard.card, winningCard)
          )[0].owner;
          return winner;
        };
        getTricksNeededToMakeBid = (bid) => {
          if (bid === "3") {
            return 3;
          } else if (bid === "4") {
            return 4;
          } else if (bid === "5") {
            return 5;
          } else {
            return 6;
          }
        };
        getPointsReceivedForMakingBid = (bid) => {
          if (bid === "Partner's Best Card") {
            return 12;
          } else if (bid === "Going Alone") {
            return 24;
          } else {
            return getTricksNeededToMakeBid(bid);
          }
        };
        howManyPointsDoesTheTeamGetForBidding = (bid, tricksTakenCount) => {
          const tricksNeeded = getTricksNeededToMakeBid(bid);
          const pointsReceivedForMakingBid = getPointsReceivedForMakingBid(bid);
          return tricksTakenCount < tricksNeeded
            ? pointsReceivedForMakingBid * -1
            : Math.max(tricksTakenCount, pointsReceivedForMakingBid);
        };
        chooseLastCardInLastTrickThenMoveDealerAndDeal = (
          option,
          phase,
          currentPlayer
        ) => {
          const fourShuffledHands = utils_ts_4.shuffleAndDealFourHands();
          const mapPlayer = (player) => {
            return {
              ...player,
              hand: [
                ...utils_ts_4.getHandSliceViaPosition(
                  player.position,
                  fourShuffledHands
                ),
              ],
            };
          };
          const firstCard = phase.currentTrick[0];
          const secondCard = phase.currentTrick[1];
          const thirdCard = phase.currentTrick[2];
          const fourthCard = { card: option, owner: currentPlayer };
          const lastTrick = [firstCard, secondCard, thirdCard, fourthCard];
          const allFinishedTricks = phase.finishedTricks.concat([lastTrick]);
          const mapTeams = (team) => {
            const trickTakenCount = allFinishedTricks.reduce(
              (points, trick) => {
                // if (trick.length !== 4) {
                //   jsonPrint({ trick });
                //   throw `Trick's length should be 4 but it's ${trick.length}`;
                // }
                const winner = getPositionOfWinnerOfTrick(trick, phase.trump);
                return (
                  points +
                  (team.players.some((player) => player.position === winner)
                    ? 1
                    : 0)
                );
              },
              0
            );
            // const trickTakenCount: number = allFinishedTricks.filter((trick: FinishedTrick) => {}).length;
            const didBidBelongToThisTeam = team.players.some(
              (player) => player.position === phase.winningBid.playerPosition
            );
            const pointsTaken = didBidBelongToThisTeam
              ? howManyPointsDoesTheTeamGetForBidding(
                  phase.winningBid.choice,
                  trickTakenCount
                )
              : trickTakenCount;
            return {
              points: team.points + pointsTaken,
              players: [mapPlayer(team.players[0]), mapPlayer(team.players[1])],
            };
          };
          return {
            name: "Bidding",
            bidPosition: "1",
            bids: [],
            dealer: "1",
            teams: [mapTeams(phase.teams[0]), mapTeams(phase.teams[1])],
          };
        };
        exports_8(
          "chooseOptionForTrickTakingPhase",
          (chooseOptionForTrickTakingPhase = (option, phase, currentPlayer) => {
            const {
              currentTrick,
              finishedTricks,
              dealer,
              trump,
              winningBid,
              playerSittingOut,
              teams,
              cardPosition,
            } = phase;
            const isLastTrick = finishedTricks.length === 5;
            const isLastCardInTrick = currentTrick.length === 3;
            if (isLastTrick && isLastCardInTrick) {
              return chooseLastCardInLastTrickThenMoveDealerAndDeal(
                option,
                phase,
                currentPlayer
              );
            }
            const transformPlayer = (player) => ({
              name: player.name,
              position: player.position,
              hand: player.hand.filter(
                (card) => !utils_ts_4.isSameCard(option, card)
              ),
            });
            const transformTeam = (team) => ({
              players: [
                transformPlayer(team.players[0]),
                transformPlayer(team.players[1]),
              ],
              points: team.points,
            });
            if (isLastCardInTrick) {
              const trick = [
                currentTrick[0],
                currentTrick[1],
                currentTrick[2],
                { owner: currentPlayer, card: option },
              ];
              const trickWinner = getPositionOfWinnerOfTrick(trick, trump);
              const nextPhase = {
                name: "Trick-Taking",
                cardPosition: trickWinner,
                currentTrick: [],
                dealer,
                finishedTricks: [...finishedTricks, trick],
                trump,
                winningBid,
                playerSittingOut,
                teams: [transformTeam(teams[0]), transformTeam(teams[1])],
              };
              return nextPhase;
            } else {
              const nextPhase = {
                name: "Trick-Taking",
                cardPosition: utils_ts_4.getNextPosition(cardPosition),
                currentTrick: [
                  ...currentTrick,
                  { owner: currentPlayer, card: option },
                ],
                dealer,
                finishedTricks,
                trump,
                winningBid,
                playerSittingOut,
                teams: [transformTeam(teams[0]), transformTeam(teams[1])],
              };
              return nextPhase;
            }
          })
        );
      },
    };
  }
);
System.register("get_options_utils/get_for_bidding_phase", ["utils"], function (
  exports_9,
  context_9
) {
  "use strict";
  var utils_ts_5, getOptionsForBiddingPhase;
  var __moduleName = context_9 && context_9.id;
  return {
    setters: [
      function (utils_ts_5_1) {
        utils_ts_5 = utils_ts_5_1;
      },
    ],
    execute: function () {
      exports_9(
        "getOptionsForBiddingPhase",
        (getOptionsForBiddingPhase = (phase, currentPlayer) => {
          if (phase.bidPosition !== currentPlayer) {
            return [];
          }
          if (phase.bids.length === 0) {
            return [
              "Going Alone",
              "Partner's Best Card",
              "6",
              "5",
              "4",
              "3",
              "Pass",
            ];
          }
          const highestBid = phase.bids
            .map((bid) => bid.choice)
            .reduce((previousValue, currentValue) =>
              utils_ts_5.getHigherBid(previousValue, currentValue)
            );
          const isPlayerDealer = currentPlayer === phase.dealer;
          const hasEveryoneElsePassed = phase.bids.every(
            (bid) => bid.choice === "Pass"
          );
          const isDealerFucked = isPlayerDealer && hasEveryoneElsePassed;
          const higherBids = utils_ts_5.getHigherBids(highestBid);
          return isDealerFucked
            ? higherBids.filter((bid) => bid !== "Pass")
            : higherBids;
        })
      );
    },
  };
});
System.register("get_options_utils/get_for_trump_picking_phase", [], function (
  exports_10,
  context_10
) {
  "use strict";
  var getOptionsForTrumpPickingPhase;
  var __moduleName = context_10 && context_10.id;
  return {
    setters: [],
    execute: function () {
      exports_10(
        "getOptionsForTrumpPickingPhase",
        (getOptionsForTrumpPickingPhase = (phase, currentPlayer) => {
          if (phase.winningBid.playerPosition === currentPlayer) {
            if (phase.winningBid.choice === "3") {
              return ["Clubs", "Diamonds", "Hearts", "Spades"];
            } else {
              return ["Clubs", "Diamonds", "Hearts", "Spades", "High", "Low"];
            }
          }
          return [];
        })
      );
    },
  };
});
System.register(
  "get_options_utils/get_for_trick_taking_phase",
  ["utils"],
  function (exports_11, context_11) {
    "use strict";
    var utils_ts_6, getOptionsForTrickTakingPhase;
    var __moduleName = context_11 && context_11.id;
    return {
      setters: [
        function (utils_ts_6_1) {
          utils_ts_6 = utils_ts_6_1;
        },
      ],
      execute: function () {
        exports_11(
          "getOptionsForTrickTakingPhase",
          (getOptionsForTrickTakingPhase = (phase, currentPlayer) => {
            if (phase.cardPosition !== currentPlayer) return [];
            const players = phase.teams[0].players.concat(
              phase.teams[1].players
            );
            const player = players.find(
              (player) => player.position === currentPlayer
            );
            const handOfCurrentPlayer = player ? player.hand : [];
            if (phase.currentTrick.length > 0) {
              const cardsOfSameSuitAsLead = utils_ts_6.getCardsOfSuitWhenTrumpOrderedByHierarchyDesc(
                phase.currentTrick[0].card.suit,
                phase.trump
              );
              const doesPlayerHaveCardOfSameLeadingSuit = cardsOfSameSuitAsLead.some(
                (card) =>
                  handOfCurrentPlayer.some((cardInHand) =>
                    utils_ts_6.isSameCard(cardInHand, card)
                  )
              );
              if (doesPlayerHaveCardOfSameLeadingSuit) {
                return handOfCurrentPlayer.filter((card) =>
                  cardsOfSameSuitAsLead.some((cardOfSameSuitAsLead) =>
                    utils_ts_6.isSameCard(cardOfSameSuitAsLead, card)
                  )
                );
              }
            }
            return handOfCurrentPlayer;
          })
        );
      },
    };
  }
);
System.register(
  "get_options_utils/get_for_partners_best_card_picking_phase",
  [],
  function (exports_12, context_12) {
    "use strict";
    var getOptionsForPartnersBestCardPickingPhase;
    var __moduleName = context_12 && context_12.id;
    return {
      setters: [],
      execute: function () {
        exports_12(
          "getOptionsForPartnersBestCardPickingPhase",
          (getOptionsForPartnersBestCardPickingPhase = (
            phase,
            currentPlayer
          ) => {
            if (phase.partner !== currentPlayer) return [];
            const player = phase.teams[0].players
              .concat(phase.teams[1].players)
              .find((p) => p.position === currentPlayer);
            return player ? player.hand : [];
          })
        );
      },
    };
  }
);
System.register(
  "index",
  [
    "choose_option_utils/choose_for_bidding_phase",
    "choose_option_utils/choose_for_picking_trump_phase",
    "choose_option_utils/choose_for_partners_best_card_phase",
    "choose_option_utils/choose_for_trick_taking_phase",
    "get_options_utils/get_for_bidding_phase",
    "get_options_utils/get_for_trump_picking_phase",
    "get_options_utils/get_for_trick_taking_phase",
    "get_options_utils/get_for_partners_best_card_picking_phase",
    "utils",
  ],
  function (exports_13, context_13) {
    "use strict";
    var choose_for_bidding_phase_ts_1,
      choose_for_picking_trump_phase_ts_1,
      choose_for_partners_best_card_phase_ts_1,
      choose_for_trick_taking_phase_ts_1,
      get_for_bidding_phase_ts_1,
      get_for_trump_picking_phase_ts_1,
      get_for_trick_taking_phase_ts_1,
      get_for_partners_best_card_picking_phase_ts_1,
      utils_ts_7,
      isCard,
      isBidChoice,
      isTrump,
      determineIfPhaseIsLegal,
      getOptions,
      isLegalOption,
      chooseOption,
      startGame;
    var __moduleName = context_13 && context_13.id;
    return {
      setters: [
        function (choose_for_bidding_phase_ts_1_1) {
          choose_for_bidding_phase_ts_1 = choose_for_bidding_phase_ts_1_1;
        },
        function (choose_for_picking_trump_phase_ts_1_1) {
          choose_for_picking_trump_phase_ts_1 = choose_for_picking_trump_phase_ts_1_1;
        },
        function (choose_for_partners_best_card_phase_ts_1_1) {
          choose_for_partners_best_card_phase_ts_1 = choose_for_partners_best_card_phase_ts_1_1;
        },
        function (choose_for_trick_taking_phase_ts_1_1) {
          choose_for_trick_taking_phase_ts_1 = choose_for_trick_taking_phase_ts_1_1;
        },
        function (get_for_bidding_phase_ts_1_1) {
          get_for_bidding_phase_ts_1 = get_for_bidding_phase_ts_1_1;
        },
        function (get_for_trump_picking_phase_ts_1_1) {
          get_for_trump_picking_phase_ts_1 = get_for_trump_picking_phase_ts_1_1;
        },
        function (get_for_trick_taking_phase_ts_1_1) {
          get_for_trick_taking_phase_ts_1 = get_for_trick_taking_phase_ts_1_1;
        },
        function (get_for_partners_best_card_picking_phase_ts_1_1) {
          get_for_partners_best_card_picking_phase_ts_1 = get_for_partners_best_card_picking_phase_ts_1_1;
        },
        function (utils_ts_7_1) {
          utils_ts_7 = utils_ts_7_1;
        },
      ],
      execute: function () {
        isCard = (a) => {
          const card = a;
          return card.rank !== undefined && card.suit !== undefined;
        };
        isBidChoice = (a) =>
          [
            "Pass",
            "3",
            "4",
            "5",
            "6",
            "Partner's Best Card",
            "Going Alone",
          ].includes(a);
        isTrump = (a) =>
          ["Clubs", "Diamonds", "Hearts", "High", "Low", "Spades"].includes(a);
        exports_13(
          "determineIfPhaseIsLegal",
          (determineIfPhaseIsLegal = (phase) => {
            if (phase.teams.length !== 2) {
              return [false, "Team lengths were not two"];
            }
            const players = phase.teams[0].players.concat(
              phase.teams[1].players
            );
            if (
              phase.name !== "Trick-Taking" &&
              !players.every((player) => player.hand.length === 6)
            ) {
              return [
                false,
                "Not all players have 6 cards in their hands each even though we aren't in the Trick-Taking Phase yet.",
              ];
            }
            const cardsInHandsOfPlayers = players.reduce(
              (accumulator, currentValue) =>
                accumulator.concat(currentValue.hand),
              []
            );
            const doesEachFinishedTrickHaveOnlyOneCardFromEachOwner =
              phase.name === "Trick-Taking"
                ? phase.finishedTricks.every(
                    (trick) =>
                      [...new Set(trick.map((upCard) => upCard.owner))]
                        .length === trick.length
                  ) &&
                  [...new Set(phase.currentTrick.map((upCard) => upCard.owner))]
                    .length === phase.currentTrick.length
                : true;
            if (!doesEachFinishedTrickHaveOnlyOneCardFromEachOwner) {
              return [false, "One of the "];
            }
            const cardsInPlay =
              phase.name === "Trick-Taking"
                ? phase.finishedTricks
                    .flatMap((trick) => trick.map(({ card }) => card))
                    .concat(phase.currentTrick.map(({ card }) => card))
                : [];
            const cards = cardsInHandsOfPlayers.concat(cardsInPlay);
            const hasTwentyFourCards = cards.length === 24;
            if (!hasTwentyFourCards) {
              return [false, "Game does not have 24 cards in play."];
            }
            const isEveryCardUnique = cards.every((firstCard, firstIndex) => {
              return cards.every((secondCard, secondIndex) => {
                if (firstIndex === secondIndex) {
                  return true;
                }
                const areNotTheSame =
                  firstCard.rank !== secondCard.rank ||
                  firstCard.suit !== secondCard.suit;
                return areNotTheSame;
              });
            });
            if (!isEveryCardUnique) {
              return [false, "Not every card is unique"];
            }
            if (
              [...new Set(players.map((player) => player.position))].length !==
              4
            ) {
              return [
                false,
                "At least two of the players are sharing the same seat.",
              ];
            }
            if (
              !phase.teams.every((team) => {
                const positions = team.players.map((player) => player.position);
                return (
                  (positions.includes("1") && positions.includes("3")) ||
                  (positions.includes("2") && positions.includes("4"))
                );
              })
            ) {
              return [
                false,
                "Players of the same team are not sitting opposite each other.",
              ];
            }
            if (
              phase.name === "Trick-Taking" &&
              phase.currentTrick.length >= 4
            ) {
              return [
                false,
                "The current trick cannot have 4 or more cards in it, if it did then it wouldn't be considered the current trick and should instead be one of the finished tricks.",
              ];
            }
            return [true, "No issue detected"];
          })
        );
        exports_13(
          "getOptions",
          (getOptions = (phase, currentPlayer) => {
            if (!determineIfPhaseIsLegal(phase)[0]) {
              return [];
            }
            if (phase.name === "Bidding") {
              return get_for_bidding_phase_ts_1.getOptionsForBiddingPhase(
                phase,
                currentPlayer
              );
            } else if (phase.name === "Picking Trump") {
              return get_for_trump_picking_phase_ts_1.getOptionsForTrumpPickingPhase(
                phase,
                currentPlayer
              );
            } else if (phase.name === "Trick-Taking") {
              return get_for_trick_taking_phase_ts_1.getOptionsForTrickTakingPhase(
                phase,
                currentPlayer
              );
            } else if (phase.name === "Picking Partner's Best Card") {
              return get_for_partners_best_card_picking_phase_ts_1.getOptionsForPartnersBestCardPickingPhase(
                phase,
                currentPlayer
              );
            }
            return [];
          })
        );
        exports_13(
          "isLegalOption",
          (isLegalOption = (option, phase, currentPlayer) =>
            getOptions(phase, currentPlayer).includes(option))
        );
        exports_13(
          "chooseOption",
          (chooseOption = (option, phase, currentPlayer) => {
            if (
              !isLegalOption(option, phase, currentPlayer) ||
              !determineIfPhaseIsLegal(phase)
            ) {
              return phase;
            }
            const getPhase = () => {
              if (phase.name === "Bidding" && isBidChoice(option)) {
                return choose_for_bidding_phase_ts_1.chooseOptionForBiddingPhase(
                  option,
                  phase,
                  currentPlayer
                );
              } else if (phase.name === "Picking Trump" && isTrump(option)) {
                return choose_for_picking_trump_phase_ts_1.chooseOptionForPickingTrumpPhase(
                  option,
                  phase
                );
              } else if (
                phase.name === "Picking Partner's Best Card" &&
                isCard(option)
              ) {
                return choose_for_partners_best_card_phase_ts_1.chooseOptionForPickingPartnersBestCardPhase(
                  option,
                  phase
                );
              } else if (phase.name === "Trick-Taking" && isCard(option)) {
                return choose_for_trick_taking_phase_ts_1.chooseOptionForTrickTakingPhase(
                  option,
                  phase,
                  currentPlayer
                );
              }
              return phase;
            };
            const nextPhase = getPhase();
            return nextPhase.name === "Game Over" ||
              determineIfPhaseIsLegal(nextPhase)[0]
              ? nextPhase
              : phase;
          })
        );
        exports_13(
          "startGame",
          (startGame = (players) => {
            const dealer = utils_ts_7.randomPlayerPosition();
            const getPlayerInPosition = (position) =>
              players.filter((player) => player.position === position)[0];
            const fourShuffledHands = utils_ts_7.shuffleAndDealFourHands();
            const dealPlayer = (position) => ({
              ...getPlayerInPosition(position),
              hand: [
                ...utils_ts_7.getHandSliceViaPosition(
                  position,
                  fourShuffledHands
                ),
              ],
            });
            const phase = {
              name: "Bidding",
              bids: [],
              dealer,
              bidPosition: utils_ts_7.getNextPosition(dealer),
              teams: [
                {
                  points: 0,
                  players: [dealPlayer("1"), dealPlayer("3")],
                },
                {
                  points: 0,
                  players: [dealPlayer("2"), dealPlayer("4")],
                },
              ],
            };
            const result = determineIfPhaseIsLegal(phase);
            return result[0] ? phase : result;
          })
        );
      },
    };
  }
);

const __exp = __instantiate("index");
export const determineIfPhaseIsLegal = __exp["determineIfPhaseIsLegal"];
export const getOptions = __exp["getOptions"];
export const isLegalOption = __exp["isLegalOption"];
export const chooseOption = __exp["chooseOption"];
export const startGame = __exp["startGame"];
