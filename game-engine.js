let System, __instantiateAsync, __instantiate;
(() => {
  const e = new Map();
  function t(t, n) {
    return {
      id: t,
      import: (n) =>
        (async function (t, n) {
          let i = t.replace(/\.\w+$/i, "");
          if (i.includes("./")) {
            const [e, ...t] = i.split("/").reverse(),
              [, ...r] = n.split("/").reverse(),
              s = [e];
            let a,
              o = 0;
            for (; (a = t.shift()); )
              if (".." === a) o++;
              else {
                if ("." === a) break;
                s.push(a);
              }
            o < r.length && s.push(...r.slice(o)), (i = s.reverse().join("/"));
          }
          return e.has(i) ? r(i) : import(t);
        })(n, t),
      meta: { url: t, main: n },
    };
  }
  function n(e) {
    return (t, n) => {
      n = "string" == typeof t ? { [t]: n } : t;
      for (const [t, i] of Object.entries(n))
        Object.defineProperty(e, t, { value: i, writable: !0, enumerable: !0 });
    };
  }
  function i(i) {
    for (const [r, s] of e.entries()) {
      const { f: e, exp: a } = s,
        { execute: o, setters: u } = e(n(a), t(r, r === i));
      delete s.f, (s.e = o), (s.s = u);
    }
  }
  async function r(t) {
    if (!e.has(t)) return;
    const n = e.get(t);
    if (n.s) {
      const { d: e, e: t, s: i } = n;
      delete n.s, delete n.e;
      for (let t = 0; t < i.length; t++) i[t](await r(e[t]));
      const s = t();
      s && (await s);
    }
    return n.exp;
  }
  (System = {
    register(t, n, i) {
      e.set(t, { d: n, f: i, exp: {} });
    },
  }),
    (__instantiateAsync = async (e) => (
      (System = __instantiateAsync = __instantiate = void 0), i(e), r(e)
    )),
    (__instantiate = (t) => (
      (System = __instantiateAsync = __instantiate = void 0),
      i(t),
      (function t(n) {
        if (!e.has(n)) return;
        const i = e.get(n);
        if (i.s) {
          const { d: e, e: n, s: r } = i;
          delete i.s, delete i.e;
          for (let n = 0; n < r.length; n++) r[n](t(e[n]));
          n();
        }
        return i.exp;
      })(t)
    ));
})(),
  System.register("FixedLengthArray", [], function (e, t) {
    "use strict";
    t && t.id;
    return { setters: [], execute: function () {} };
  }),
  System.register("definitions", [], function (e, t) {
    "use strict";
    t && t.id;
    return { setters: [], execute: function () {} };
  }),
  System.register("shuffle", [], function (e, t) {
    "use strict";
    var n;
    t && t.id;
    return {
      setters: [],
      execute: function () {
        (n = (e) => {
          for (let t = e.length - 1; t > 0; t--) {
            let n = Math.floor(Math.random() * (t + 1));
            [e[t], e[n]] = [e[n], e[t]];
          }
        }),
          e("default", (e) => {
            const t = e.map((e) => e);
            return n(t), t;
          });
      },
    };
  }),
  System.register("utils", ["shuffle"], function (e, t) {
    "use strict";
    var n, i, r, s, a, o, u;
    t && t.id;
    return {
      setters: [
        function (e) {
          n = e;
        },
      ],
      execute: function () {
        (i = [
          "Going Alone",
          "Partner's Best Card",
          "6",
          "5",
          "4",
          "3",
          "Pass",
        ]),
          e(
            "getHigherBid",
            (r = (e, t) => i.filter((n) => n === e || n === t)[0])
          ),
          e("getNextPosition", (e) =>
            "1" === e ? "2" : "2" === e ? "3" : "3" === e ? "4" : "1"
          ),
          e("getPositionOfPartner", (e) =>
            "1" === e ? "3" : "2" === e ? "4" : "3" === e ? "1" : "2"
          ),
          (s = (e, t) => r(e, t) === e),
          e("getHigherBids", (e) =>
            i.filter((t) => "Pass" === t || (e !== t && s(t, e)))
          ),
          (a = (e) =>
            "Clubs" === e
              ? "Spades"
              : "Spades" === e
              ? "Clubs"
              : "Diamonds" === e
              ? "Hearts"
              : "Diamonds"),
          e("getCardsOfSuitWhenTrumpOrderedByHierarchyDesc", (e, t) => {
            if ("Low" === t || "High" === t) {
              const n = [
                { rank: "9", suit: e },
                { rank: "10", suit: e },
                { rank: "Jack", suit: e },
                { rank: "Queen", suit: e },
                { rank: "King", suit: e },
                { rank: "Ace", suit: e },
              ];
              return "Low" === t ? n : n.reverse();
            }
            {
              const n = a(e);
              if (e === t) {
                return [
                  { rank: "Jack", suit: e },
                  { rank: "Jack", suit: n },
                  { rank: "Ace", suit: e },
                  { rank: "King", suit: e },
                  { rank: "Queen", suit: e },
                  { rank: "10", suit: e },
                  { rank: "9", suit: e },
                ];
              }
              if (n === e) {
                return [
                  { rank: "Ace", suit: e },
                  { rank: "King", suit: e },
                  { rank: "Queen", suit: e },
                  { rank: "10", suit: e },
                  { rank: "9", suit: e },
                ];
              }
              return [
                { rank: "Ace", suit: e },
                { rank: "King", suit: e },
                { rank: "Queen", suit: e },
                { rank: "Jack", suit: e },
                { rank: "10", suit: e },
                { rank: "9", suit: e },
              ];
            }
          }),
          e("isSameCard", (e, t) => e.rank === t.rank && e.suit === t.suit),
          (o = (e, t) => (
            (e = Math.ceil(e)),
            (t = Math.floor(t)),
            Math.floor(Math.random() * (t - e + 1)) + e
          )),
          e("randomPlayerPosition", () => {
            return ["1", "2", "3", "4"][o(0, 3)];
          }),
          () => [
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
          ],
          e("shuffleAndDealFourHands", () => {
            const e = n.default([
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
            ]);
            return [
              [e[0], e[1], e[2], e[3], e[4], e[5]],
              [e[6], e[7], e[8], e[9], e[10], e[11]],
              [e[12], e[13], e[14], e[15], e[16], e[17]],
              [e[18], e[19], e[20], e[21], e[22], e[23]],
            ];
          }),
          (u = (e) => ("1" === e ? 0 : "2" === e ? 1 : "3" === e ? 2 : 3)),
          e("getHandSliceViaPosition", (e, t) => t[u(e)]);
      },
    };
  }),
  System.register(
    "choose_option_utils/choose_for_bidding_phase",
    ["utils"],
    function (e, t) {
      "use strict";
      var n, i;
      t && t.id;
      return {
        setters: [
          function (e) {
            n = e;
          },
        ],
        execute: function () {
          (i = (e) =>
            e.reduce((e, t) => {
              return n.getHigherBid(e.choice, t.choice) === e.choice ? e : t;
            })),
            e("chooseOptionForBiddingPhase", (e, t, r) => {
              const s = { choice: e, playerPosition: r },
                a = t.bids.concat([s]);
              if (r === t.dealer) {
                const e = i(a);
                return {
                  name: "Picking Trump",
                  dealer: t.dealer,
                  teams: t.teams,
                  winningBid: e,
                };
              }
              return {
                name: "Bidding",
                bidPosition: n.getNextPosition(t.bidPosition),
                bids: a,
                dealer: t.dealer,
                teams: t.teams,
              };
            });
        },
      };
    }
  ),
  System.register(
    "choose_option_utils/choose_for_picking_trump_phase",
    ["utils"],
    function (e, t) {
      "use strict";
      var n;
      t && t.id;
      return {
        setters: [
          function (e) {
            n = e;
          },
        ],
        execute: function () {
          e("chooseOptionForPickingTrumpPhase", (e, t) => {
            const i = t.dealer,
              r = n.getPositionOfPartner(t.winningBid.playerPosition),
              s = t.teams;
            if ("Partner's Best Card" === t.winningBid.choice) {
              return {
                name: "Picking Partner's Best Card",
                dealer: i,
                trump: e,
                partner: r,
                teams: s,
                winningBid: t.winningBid,
              };
            }
            {
              const a = {
                name: "Trick-Taking",
                dealer: i,
                trump: e,
                winningBid: t.winningBid,
                cardPosition: n.getNextPosition(i),
                teams: s,
                currentTrick: [],
                finishedTricks: [],
              };
              return (
                "Going Alone" === t.winningBid.choice &&
                  (a.playerSittingOut = r),
                a
              );
            }
          });
        },
      };
    }
  ),
  System.register(
    "choose_option_utils/choose_for_partners_best_card_phase",
    ["utils"],
    function (e, t) {
      "use strict";
      var n;
      t && t.id;
      return {
        setters: [
          function (e) {
            n = e;
          },
        ],
        execute: function () {
          e("chooseOptionForPickingPartnersBestCardPhase", (e, t) => {
            const i = n.getPositionOfPartner(t.partner),
              r = (n) => {
                const r = (t) => {
                  return t.position === i
                    ? { ...t, hand: t.hand.concat([e]) }
                    : {
                        ...t,
                        hand: t.hand.filter(
                          (t) => t.rank !== e.rank && t.suit !== e.suit
                        ),
                      };
                };
                if (n.players.some((e) => e.position === t.partner)) {
                  return { ...n, players: [r(n.players[0]), r(n.players[1])] };
                }
                return n;
              },
              s = [r(t.teams[0]), r(t.teams[1])];
            return {
              name: "Trick-Taking",
              playerSittingOut: t.partner,
              dealer: t.dealer,
              teams: s,
              winningBid: t.winningBid,
              trump: t.trump,
              currentTrick: [],
              finishedTricks: [],
              cardPosition: n.getNextPosition(t.dealer),
            };
          });
        },
      };
    }
  ),
  System.register(
    "choose_option_utils/choose_for_trick_taking_phase",
    ["utils"],
    function (e, t) {
      "use strict";
      var n, i, r, s, a, o, u;
      t && t.id;
      return {
        setters: [
          function (e) {
            n = e;
          },
        ],
        execute: function () {
          (i = (e, t, i) => {
            return n
              .getCardsOfSuitWhenTrumpOrderedByHierarchyDesc(e, t)
              .filter((e) => i.some((t) => n.isSameCard(t, e)))[0];
          }),
            (r = (e, t) => {
              const r = i(
                e[0].card.suit,
                t,
                e.map((e) => e.card)
              );
              return e.filter((e) => n.isSameCard(e.card, r))[0].owner;
            }),
            (s = (e) => ("3" === e ? 3 : "4" === e ? 4 : "5" === e ? 5 : 6)),
            (a = (e) =>
              "Partner's Best Card" === e
                ? 12
                : "Going Alone" === e
                ? 24
                : s(e)),
            (o = (e, t) => {
              const n = s(e),
                i = a(e);
              return t < n ? -1 * i : Math.max(t, i);
            }),
            (u = (e, t, i) => {
              const s = n.shuffleAndDealFourHands(),
                a = (e) => ({
                  ...e,
                  hand: [...n.getHandSliceViaPosition(e.position, s)],
                }),
                u = [
                  t.currentTrick[0],
                  t.currentTrick[1],
                  t.currentTrick[2],
                  { card: e, owner: i },
                ],
                c = t.finishedTricks.concat([u]),
                d = (e) => {
                  const n = c.reduce((n, i) => {
                      const s = r(i, t.trump);
                      return (
                        n + (e.players.some((e) => e.position === s) ? 1 : 0)
                      );
                    }, 0),
                    i = e.players.some(
                      (e) => e.position === t.winningBid.playerPosition
                    )
                      ? o(t.winningBid.choice, n)
                      : n;
                  return {
                    points: e.points + i,
                    players: [a(e.players[0]), a(e.players[1])],
                  };
                };
              return {
                name: "Bidding",
                bidPosition: "1",
                bids: [],
                dealer: "1",
                teams: [d(t.teams[0]), d(t.teams[1])],
              };
            }),
            e("chooseOptionForTrickTakingPhase", (e, t, i) => {
              const {
                  currentTrick: s,
                  finishedTricks: a,
                  dealer: o,
                  trump: c,
                  winningBid: d,
                  playerSittingOut: p,
                  teams: g,
                  cardPosition: l,
                } = t,
                k = 5 === a.length,
                h = 3 === s.length;
              if (k && h) return u(e, t, i);
              const f = (t) => ({
                  name: t.name,
                  position: t.position,
                  hand: t.hand.filter((t) => !n.isSameCard(e, t)),
                }),
                m = (e) => ({
                  players: [f(e.players[0]), f(e.players[1])],
                  points: e.points,
                });
              if (h) {
                const t = [s[0], s[1], s[2], { owner: i, card: e }];
                return {
                  name: "Trick-Taking",
                  cardPosition: r(t, c),
                  currentTrick: [],
                  dealer: o,
                  finishedTricks: [...a, t],
                  trump: c,
                  winningBid: d,
                  playerSittingOut: p,
                  teams: [m(g[0]), m(g[1])],
                };
              }
              return {
                name: "Trick-Taking",
                cardPosition: n.getNextPosition(l),
                currentTrick: [...s, { owner: i, card: e }],
                dealer: o,
                finishedTricks: a,
                trump: c,
                winningBid: d,
                playerSittingOut: p,
                teams: [m(g[0]), m(g[1])],
              };
            });
        },
      };
    }
  ),
  System.register(
    "get_options_utils/get_for_bidding_phase",
    ["utils"],
    function (e, t) {
      "use strict";
      var n;
      t && t.id;
      return {
        setters: [
          function (e) {
            n = e;
          },
        ],
        execute: function () {
          e("getOptionsForBiddingPhase", (e, t) => {
            if (e.bidPosition !== t) return [];
            if (0 === e.bids.length)
              return [
                "Going Alone",
                "Partner's Best Card",
                "6",
                "5",
                "4",
                "3",
                "Pass",
              ];
            const i = e.bids
                .map((e) => e.choice)
                .reduce((e, t) => n.getHigherBid(e, t)),
              r = t === e.dealer,
              s = e.bids.every((e) => "Pass" === e.choice),
              a = r && s,
              o = n.getHigherBids(i);
            return a ? o.filter((e) => "Pass" !== e) : o;
          });
        },
      };
    }
  ),
  System.register(
    "get_options_utils/get_for_trump_picking_phase",
    [],
    function (e, t) {
      "use strict";
      t && t.id;
      return {
        setters: [],
        execute: function () {
          e("getOptionsForTrumpPickingPhase", (e, t) =>
            e.winningBid.playerPosition === t
              ? "3" === e.winningBid.choice
                ? ["Clubs", "Diamonds", "Hearts", "Spades"]
                : ["Clubs", "Diamonds", "Hearts", "Spades", "High", "Low"]
              : []
          );
        },
      };
    }
  ),
  System.register(
    "get_options_utils/get_for_trick_taking_phase",
    ["utils"],
    function (e, t) {
      "use strict";
      var n;
      t && t.id;
      return {
        setters: [
          function (e) {
            n = e;
          },
        ],
        execute: function () {
          e("getOptionsForTrickTakingPhase", (e, t) => {
            if (e.cardPosition !== t) return [];
            const i = e.teams[0].players
                .concat(e.teams[1].players)
                .find((e) => e.position === t),
              r = i ? i.hand : [];
            if (e.currentTrick.length > 0) {
              const t = n.getCardsOfSuitWhenTrumpOrderedByHierarchyDesc(
                e.currentTrick[0].card.suit,
                e.trump
              );
              if (t.some((e) => r.some((t) => n.isSameCard(t, e))))
                return r.filter((e) => t.some((t) => n.isSameCard(t, e)));
            }
            return r;
          });
        },
      };
    }
  ),
  System.register(
    "get_options_utils/get_for_partners_best_card_picking_phase",
    [],
    function (e, t) {
      "use strict";
      t && t.id;
      return {
        setters: [],
        execute: function () {
          e("getOptionsForPartnersBestCardPickingPhase", (e, t) => {
            if (e.partner !== t) return [];
            const n = e.teams[0].players
              .concat(e.teams[1].players)
              .find((e) => e.position === t);
            return n ? n.hand : [];
          });
        },
      };
    }
  ),
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
    function (e, t) {
      "use strict";
      var n, i, r, s, a, o, u, c, d, p, g, l, k, h, f;
      t && t.id;
      return {
        setters: [
          function (e) {
            n = e;
          },
          function (e) {
            i = e;
          },
          function (e) {
            r = e;
          },
          function (e) {
            s = e;
          },
          function (e) {
            a = e;
          },
          function (e) {
            o = e;
          },
          function (e) {
            u = e;
          },
          function (e) {
            c = e;
          },
          function (e) {
            d = e;
          },
        ],
        execute: function () {
          (p = (e) => {
            const t = e;
            return void 0 !== t.rank && void 0 !== t.suit;
          }),
            (g = (e) =>
              [
                "Pass",
                "3",
                "4",
                "5",
                "6",
                "Partner's Best Card",
                "Going Alone",
              ].includes(e)),
            (l = (e) =>
              ["Clubs", "Diamonds", "Hearts", "High", "Low", "Spades"].includes(
                e
              )),
            e(
              "determineIfPhaseIsLegal",
              (k = (e) => {
                if (2 !== e.teams.length)
                  return [!1, "Team lengths were not two"];
                const t = e.teams[0].players.concat(e.teams[1].players);
                if (
                  "Trick-Taking" !== e.name &&
                  !t.every((e) => 6 === e.hand.length)
                )
                  return [
                    !1,
                    "Not all players have 6 cards in their hands each even though we aren't in the Trick-Taking Phase yet.",
                  ];
                const n = t.reduce((e, t) => e.concat(t.hand), []);
                if (
                  !(
                    "Trick-Taking" !== e.name ||
                    (e.finishedTricks.every(
                      (e) =>
                        [...new Set(e.map((e) => e.owner))].length === e.length
                    ) &&
                      [...new Set(e.currentTrick.map((e) => e.owner))]
                        .length === e.currentTrick.length)
                  )
                )
                  return [!1, "One of the "];
                const i =
                    "Trick-Taking" === e.name
                      ? e.finishedTricks
                          .flatMap((e) => e.map(({ card: e }) => e))
                          .concat(e.currentTrick.map(({ card: e }) => e))
                      : [],
                  r = n.concat(i);
                return 24 === r.length
                  ? r.every((e, t) =>
                      r.every((n, i) => {
                        if (t === i) return !0;
                        return e.rank !== n.rank || e.suit !== n.suit;
                      })
                    )
                    ? 4 !== [...new Set(t.map((e) => e.position))].length
                      ? [
                          !1,
                          "At least two of the players are sharing the same seat.",
                        ]
                      : e.teams.every((e) => {
                          const t = e.players.map((e) => e.position);
                          return (
                            (t.includes("1") && t.includes("3")) ||
                            (t.includes("2") && t.includes("4"))
                          );
                        })
                      ? "Trick-Taking" === e.name && e.currentTrick.length >= 4
                        ? [
                            !1,
                            "The current trick cannot have 4 or more cards in it, if it did then it wouldn't be considered the current trick and should instead be one of the finished tricks.",
                          ]
                        : [!0, "No issue detected"]
                      : [
                          !1,
                          "Players of the same team are not sitting opposite each other.",
                        ]
                    : [!1, "Not every card is unique"]
                  : [!1, "Game does not have 24 cards in play."];
              })
            ),
            e(
              "getOptions",
              (h = (e, t) =>
                k(e)[0]
                  ? "Bidding" === e.name
                    ? a.getOptionsForBiddingPhase(e, t)
                    : "Picking Trump" === e.name
                    ? o.getOptionsForTrumpPickingPhase(e, t)
                    : "Trick-Taking" === e.name
                    ? u.getOptionsForTrickTakingPhase(e, t)
                    : "Picking Partner's Best Card" === e.name
                    ? c.getOptionsForPartnersBestCardPickingPhase(e, t)
                    : []
                  : [])
            ),
            e("isLegalOption", (f = (e, t, n) => h(t, n).includes(e))),
            e("chooseOption", (e, t, a) => {
              if (!f(e, t, a) || !k(t)) return t;
              const o = (() =>
                "Bidding" === t.name && g(e)
                  ? n.chooseOptionForBiddingPhase(e, t, a)
                  : "Picking Trump" === t.name && l(e)
                  ? i.chooseOptionForPickingTrumpPhase(e, t)
                  : "Picking Partner's Best Card" === t.name && p(e)
                  ? r.chooseOptionForPickingPartnersBestCardPhase(e, t)
                  : "Trick-Taking" === t.name && p(e)
                  ? s.chooseOptionForTrickTakingPhase(e, t, a)
                  : t)();
              return "Game Over" === o.name || k(o)[0] ? o : t;
            }),
            e("startGame", (e) => {
              const t = d.randomPlayerPosition(),
                n = (t) => e.filter((e) => e.position === t)[0],
                i = d.shuffleAndDealFourHands(),
                r = (e) => ({
                  ...n(e),
                  hand: [...d.getHandSliceViaPosition(e, i)],
                }),
                s = {
                  name: "Bidding",
                  bids: [],
                  dealer: t,
                  bidPosition: d.getNextPosition(t),
                  teams: [
                    { points: 0, players: [r("1"), r("3")] },
                    { points: 0, players: [r("2"), r("4")] },
                  ],
                },
                a = k(s);
              return a[0] ? s : a;
            });
        },
      };
    }
  );
const __exp = __instantiate("index");
export const determineIfPhaseIsLegal = __exp.determineIfPhaseIsLegal;
export const getOptions = __exp.getOptions;
export const isLegalOption = __exp.isLegalOption;
export const chooseOption = __exp.chooseOption;
export const startGame = __exp.startGame;
