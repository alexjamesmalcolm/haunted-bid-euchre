let System, __instantiateAsync, __instantiate;
(() => {
  const e = new Map();
  function t(t, i) {
    return {
      id: t,
      import: (i) =>
        (async function (t, i) {
          let n = t.replace(/\.\w+$/i, "");
          if (n.includes("./")) {
            const [e, ...t] = n.split("/").reverse(),
              [, ...r] = i.split("/").reverse(),
              s = [e];
            let o,
              a = 0;
            for (; (o = t.shift()); )
              if (".." === o) a++;
              else {
                if ("." === o) break;
                s.push(o);
              }
            a < r.length && s.push(...r.slice(a)), (n = s.reverse().join("/"));
          }
          return e.has(n) ? r(n) : import(t);
        })(i, t),
      meta: { url: t, main: i },
    };
  }
  function i(e) {
    return (t, i) => {
      i = "string" == typeof t ? { [t]: i } : t;
      for (const [t, n] of Object.entries(i))
        Object.defineProperty(e, t, { value: n, writable: !0, enumerable: !0 });
    };
  }
  function n(n) {
    for (const [r, s] of e.entries()) {
      const { f: e, exp: o } = s,
        { execute: a, setters: c } = e(i(o), t(r, r === n));
      delete s.f, (s.e = a), (s.s = c);
    }
  }
  async function r(t) {
    if (!e.has(t)) return;
    const i = e.get(t);
    if (i.s) {
      const { d: e, e: t, s: n } = i;
      delete i.s, delete i.e;
      for (let t = 0; t < n.length; t++) n[t](await r(e[t]));
      const s = t();
      s && (await s);
    }
    return i.exp;
  }
  (System = {
    register(t, i, n) {
      e.set(t, { d: i, f: n, exp: {} });
    },
  }),
    (__instantiateAsync = async (e) => (
      (System = __instantiateAsync = __instantiate = void 0), n(e), r(e)
    )),
    (__instantiate = (t) => (
      (System = __instantiateAsync = __instantiate = void 0),
      n(t),
      (function t(i) {
        if (!e.has(i)) return;
        const n = e.get(i);
        if (n.s) {
          const { d: e, e: i, s: r } = n;
          delete n.s, delete n.e;
          for (let i = 0; i < r.length; i++) r[i](t(e[i]));
          i();
        }
        return n.exp;
      })(t)
    ));
})(),
  System.register("definitions", [], function (e, t) {
    "use strict";
    t && t.id;
    return { setters: [], execute: function () {} };
  }),
  System.register("shuffle", [], function (e, t) {
    "use strict";
    var i;
    t && t.id;
    return {
      setters: [],
      execute: function () {
        (i = (e) => {
          for (let t = e.length - 1; t > 0; t--) {
            let i = Math.floor(Math.random() * (t + 1));
            [e[t], e[i]] = [e[i], e[t]];
          }
        }),
          e("default", (e) => {
            const t = e.map((e) => e);
            return i(t), t;
          });
      },
    };
  }),
  System.register("utils", ["shuffle"], function (e, t) {
    "use strict";
    var i, n, r, s, o, a, c, u, d, p, g;
    t && t.id;
    return {
      setters: [
        function (e) {
          i = e;
        },
      ],
      execute: function () {
        (n = [
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
            (r = (e, t) => n.filter((i) => i === e || i === t)[0])
          ),
          e("getNextPosition", (e) =>
            "1" === e ? "2" : "2" === e ? "3" : "3" === e ? "4" : "1"
          ),
          e("getPositionOfPartner", (e) =>
            "1" === e ? "3" : "2" === e ? "4" : "3" === e ? "1" : "2"
          ),
          (s = (e, t) => r(e, t) === e),
          e("getHigherBids", (e) =>
            n.filter((t) => "Pass" === t || (e !== t && s(t, e)))
          ),
          (o = (e) =>
            "Clubs" === e
              ? "Spades"
              : "Spades" === e
              ? "Clubs"
              : "Diamonds" === e
              ? "Hearts"
              : "Diamonds"),
          e("cardsContainCard", (a = (e, t) => e.some((e) => u(t, e)))),
          e("getAllCardsOrderedByHierarchyDesc", (e, t) => {
            if ("Low" === t || "High" === t) {
              const i = c(e, t),
                n = p().filter((e) => !a(i, e));
              return i.concat(n);
            }
            const i = c(t, t),
              n = c(e, t),
              r = p().filter((e) => !a(i, e) && !a(n, e));
            return i.concat(n).concat(r);
          }),
          e(
            "getCardsOfSuitWhenTrumpOrderedByHierarchyDesc",
            (c = (e, t) => {
              if ("Low" === t || "High" === t) {
                const i = [
                  { rank: "9", suit: e },
                  { rank: "10", suit: e },
                  { rank: "Jack", suit: e },
                  { rank: "Queen", suit: e },
                  { rank: "King", suit: e },
                  { rank: "Ace", suit: e },
                ];
                return "Low" === t ? i : i.reverse();
              }
              {
                const i = o(t);
                if (e === t) {
                  return [
                    { rank: "Jack", suit: e },
                    { rank: "Jack", suit: i },
                    { rank: "Ace", suit: e },
                    { rank: "King", suit: e },
                    { rank: "Queen", suit: e },
                    { rank: "10", suit: e },
                    { rank: "9", suit: e },
                  ];
                }
                if (i === e) {
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
            })
          ),
          e(
            "isSameCard",
            (u = (e, t) => e.rank === t.rank && e.suit === t.suit)
          ),
          (d = (e, t) => (
            (e = Math.ceil(e)),
            (t = Math.floor(t)),
            Math.floor(Math.random() * (t - e + 1)) + e
          )),
          e("randomPlayerPosition", () => {
            return ["1", "2", "3", "4"][d(0, 3)];
          }),
          (p = () => [
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
          ]),
          e("shuffleAndDealFourHands", () => {
            const e = i.default(p());
            return [
              [e[0], e[1], e[2], e[3], e[4], e[5]],
              [e[6], e[7], e[8], e[9], e[10], e[11]],
              [e[12], e[13], e[14], e[15], e[16], e[17]],
              [e[18], e[19], e[20], e[21], e[22], e[23]],
            ];
          }),
          (g = (e) => ("1" === e ? 0 : "2" === e ? 1 : "3" === e ? 2 : 3)),
          e("getHandSliceViaPosition", (e, t) => t[g(e)]),
          e("getPlayerByPosition", (e, t) => {
            const i = t.teams[0].players
              .concat(t.teams[1].players)
              .find((t) => t.position === e);
            if (i) return i;
            throw `Could not find player of position ${e}`;
          });
      },
    };
  }),
  System.register(
    "choose_option_utils/choose_for_bidding_phase",
    ["utils"],
    function (e, t) {
      "use strict";
      var i, n;
      t && t.id;
      return {
        setters: [
          function (e) {
            i = e;
          },
        ],
        execute: function () {
          (n = (e) =>
            e.reduce((e, t) => {
              return i.getHigherBid(e.choice, t.choice) === e.choice ? e : t;
            })),
            e("chooseOptionForBiddingPhase", (e, t, r) => {
              const s = { choice: e, playerPosition: r },
                o = t.bids.concat([s]);
              if (r === t.dealer) {
                const e = n(o);
                return {
                  name: "Picking Trump",
                  dealer: t.dealer,
                  teams: t.teams,
                  winningBid: e,
                };
              }
              return {
                name: "Bidding",
                bidPosition: i.getNextPosition(t.bidPosition),
                bids: o,
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
      var i;
      t && t.id;
      return {
        setters: [
          function (e) {
            i = e;
          },
        ],
        execute: function () {
          e("chooseOptionForPickingTrumpPhase", (e, t) => {
            const n = t.dealer,
              r = i.getPositionOfPartner(t.winningBid.playerPosition),
              s = t.teams;
            if ("Partner's Best Card" === t.winningBid.choice) {
              return {
                name: "Picking Partner's Best Card",
                dealer: n,
                trump: e,
                partner: r,
                teams: s,
                winningBid: t.winningBid,
              };
            }
            {
              const o = {
                name: "Trick-Taking",
                dealer: n,
                trump: e,
                winningBid: t.winningBid,
                cardPosition: i.getNextPosition(n),
                teams: s,
                currentTrick: [],
                finishedTricks: [],
              };
              return (
                "Going Alone" === t.winningBid.choice &&
                  (o.playerSittingOut = r),
                o
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
      var i;
      t && t.id;
      return {
        setters: [
          function (e) {
            i = e;
          },
        ],
        execute: function () {
          e("chooseOptionForPickingPartnersBestCardPhase", (e, t, n) => {
            const r = t.partner,
              s = i.getPositionOfPartner(r),
              o = 5 === i.getPlayerByPosition(s, t).hand.length,
              a = (t) => ({
                ...t,
                hand:
                  t.position === n
                    ? t.hand.filter((t) => !i.isSameCard(t, e))
                    : t.hand.concat([e]),
              }),
              c = (e) => {
                if (e.players.some((e) => e.position === t.partner)) {
                  return { ...e, players: [a(e.players[0]), a(e.players[1])] };
                }
                return e;
              };
            return o
              ? {
                  name: "Trick-Taking",
                  playerSittingOut: t.partner,
                  dealer: t.dealer,
                  teams: [c(t.teams[0]), c(t.teams[1])],
                  winningBid: t.winningBid,
                  trump: t.trump,
                  currentTrick: [],
                  finishedTricks: [],
                  cardPosition: i.getNextPosition(t.dealer),
                }
              : { ...t, teams: [c(t.teams[0]), c(t.teams[1])] };
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
      var i, n, r, s, o, a, c;
      t && t.id;
      return {
        setters: [
          function (e) {
            i = e;
          },
        ],
        execute: function () {
          (n = (e, t, n) =>
            i
              .getAllCardsOrderedByHierarchyDesc(e, t)
              .filter((e) => i.cardsContainCard(n, e))[0]),
            e(
              "getPositionOfWinnerOfTrick",
              (r = (e, t) => {
                const r = n(
                  e[0].card.suit,
                  t,
                  e.map((e) => e.card)
                );
                return e.filter((e) => i.isSameCard(e.card, r))[0].owner;
              })
            ),
            (s = (e) => ("3" === e ? 3 : "4" === e ? 4 : "5" === e ? 5 : 6)),
            (o = (e) =>
              "Partner's Best Card" === e
                ? 12
                : "Going Alone" === e
                ? 24
                : s(e)),
            (a = (e, t) => {
              const i = s(e),
                n = o(e);
              return t < i ? -1 * n : Math.max(t, n);
            }),
            (c = (e, t, n) => {
              const s = i.shuffleAndDealFourHands(),
                o = (e) => ({
                  ...e,
                  hand: [...i.getHandSliceViaPosition(e.position, s)],
                }),
                c = [...t.currentTrick, { card: e, owner: n }],
                u = t.finishedTricks.concat([c]),
                d = (e) => {
                  const i = u.reduce((i, n) => {
                      const s = r(n, t.trump);
                      return (
                        i + (e.players.some((e) => e.position === s) ? 1 : 0)
                      );
                    }, 0),
                    n = e.players.some(
                      (e) => e.position === t.winningBid.playerPosition
                    )
                      ? a(t.winningBid.choice, i)
                      : i;
                  return {
                    points: e.points + n,
                    players: [o(e.players[0]), o(e.players[1])],
                  };
                };
              return {
                name: "Bidding",
                bidPosition: i.getNextPosition(i.getNextPosition(t.dealer)),
                bids: [],
                dealer: i.getNextPosition(t.dealer),
                teams: [d(t.teams[0]), d(t.teams[1])],
              };
            }),
            e("chooseOptionForTrickTakingPhase", (e, t, n) => {
              const {
                  currentTrick: s,
                  finishedTricks: o,
                  dealer: a,
                  trump: u,
                  winningBid: d,
                  playerSittingOut: p,
                  teams: g,
                  cardPosition: l,
                } = t,
                h = 5 === o.length,
                f = 3 === s.length || (!!p && 2 === s.length);
              if (h && f) return c(e, t, n);
              const m = (t) => ({
                  name: t.name,
                  position: t.position,
                  hand: t.hand.filter((t) => !i.isSameCard(e, t)),
                }),
                k = (e) => ({
                  players: [m(e.players[0]), m(e.players[1])],
                  points: e.points,
                });
              if (f) {
                const t = [...s, { owner: n, card: e }];
                return {
                  name: "Trick-Taking",
                  cardPosition: r(t, u),
                  currentTrick: [],
                  dealer: a,
                  finishedTricks: [...o, t],
                  trump: u,
                  winningBid: d,
                  playerSittingOut: p,
                  teams: [k(g[0]), k(g[1])],
                };
              }
              return {
                name: "Trick-Taking",
                cardPosition:
                  p && i.getNextPosition(l) === p
                    ? i.getNextPosition(i.getNextPosition(l))
                    : i.getNextPosition(l),
                currentTrick: [...s, { owner: n, card: e }],
                dealer: a,
                finishedTricks: o,
                trump: u,
                winningBid: d,
                playerSittingOut: p,
                teams: [k(g[0]), k(g[1])],
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
      var i;
      t && t.id;
      return {
        setters: [
          function (e) {
            i = e;
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
            const n = e.bids
                .map((e) => e.choice)
                .reduce((e, t) => i.getHigherBid(e, t)),
              r = t === e.dealer,
              s = e.bids.every((e) => "Pass" === e.choice),
              o = r && s,
              a = i.getHigherBids(n);
            return o ? a.filter((e) => "Pass" !== e) : a;
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
      var i;
      t && t.id;
      return {
        setters: [
          function (e) {
            i = e;
          },
        ],
        execute: function () {
          e("getOptionsForTrickTakingPhase", (e, t) => {
            if (e.cardPosition !== t) return [];
            const n = e.teams[0].players
                .concat(e.teams[1].players)
                .find((e) => e.position === t),
              r = n ? n.hand : [];
            if (e.currentTrick.length > 0) {
              const t = e.currentTrick[0].card,
                n = i.getCardsOfSuitWhenTrumpOrderedByHierarchyDesc(
                  "High" !== e.trump &&
                    "Low" !== e.trump &&
                    i
                      .getCardsOfSuitWhenTrumpOrderedByHierarchyDesc(
                        e.trump,
                        e.trump
                      )
                      .some((e) => i.isSameCard(t, e))
                    ? e.trump
                    : t.suit,
                  e.trump
                );
              if (n.some((e) => r.some((t) => i.isSameCard(t, e))))
                return r.filter((e) => n.some((t) => i.isSameCard(t, e)));
            }
            return r;
          });
        },
      };
    }
  ),
  System.register(
    "get_options_utils/get_for_partners_best_card_picking_phase",
    ["utils"],
    function (e, t) {
      "use strict";
      var i;
      t && t.id;
      return {
        setters: [
          function (e) {
            i = e;
          },
        ],
        execute: function () {
          e("getOptionsForPartnersBestCardPickingPhase", (e, t) => {
            const n = e.partner,
              r = i.getPositionOfPartner(n),
              s = 5 === i.getPlayerByPosition(r, e).hand.length ? n : r;
            return t !== s ? [] : i.getPlayerByPosition(s, e).hand;
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
      var i, n, r, s, o, a, c, u, d, p, g, l, h, f, m;
      t && t.id;
      return {
        setters: [
          function (e) {
            i = e;
          },
          function (e) {
            n = e;
          },
          function (e) {
            r = e;
          },
          function (e) {
            s = e;
          },
          function (e) {
            o = e;
          },
          function (e) {
            a = e;
          },
          function (e) {
            c = e;
          },
          function (e) {
            u = e;
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
              (h = (e) => {
                if (
                  "Trick-Taking" === e.name &&
                  e.playerSittingOut &&
                  e.playerSittingOut === e.cardPosition
                )
                  return [
                    !1,
                    "The player sitting out shouldn't be able to play",
                  ];
                if (2 !== e.teams.length)
                  return [!1, "Team lengths were not two"];
                const t = e.teams[0].players.concat(e.teams[1].players);
                if (
                  "Trick-Taking" !== e.name &&
                  "Picking Partner's Best Card" !== e.name &&
                  !t.every((e) => 6 === e.hand.length)
                )
                  return [
                    !1,
                    "Not all players have 6 cards in their hands each even though we aren't in the Trick-Taking Phase yet.",
                  ];
                const i = t.reduce((e, t) => e.concat(t.hand), []);
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
                  return [
                    !1,
                    "One of the finished tricks has more than one card from the same player.",
                  ];
                const n =
                    "Trick-Taking" === e.name
                      ? e.finishedTricks
                          .flatMap((e) => e.map(({ card: e }) => e))
                          .concat(e.currentTrick.map(({ card: e }) => e))
                      : [],
                  r = i.concat(n);
                return 24 === r.length
                  ? r.every((e, t) =>
                      r.every((i, n) => {
                        if (t === n) return !0;
                        return e.rank !== i.rank || e.suit !== i.suit;
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
              (f = (e, t) =>
                h(e)[0]
                  ? "Bidding" === e.name
                    ? o.getOptionsForBiddingPhase(e, t)
                    : "Picking Trump" === e.name
                    ? a.getOptionsForTrumpPickingPhase(e, t)
                    : "Trick-Taking" === e.name
                    ? c.getOptionsForTrickTakingPhase(e, t)
                    : "Picking Partner's Best Card" === e.name
                    ? u.getOptionsForPartnersBestCardPickingPhase(e, t)
                    : []
                  : [])
            ),
            e(
              "isLegalOption",
              (m = (e, t, i) =>
                f(t, i).some((t) => JSON.stringify(t) === JSON.stringify(e)))
            ),
            e("chooseOption", (e, t, o) => {
              if (!m(e, t, o) || !h(t)) {
                if (m(e, t, o)) {
                  const [, e] = h(t);
                  console.warn(e);
                } else console.warn("Option is illegal");
                return t;
              }
              const a = (() =>
                "Bidding" === t.name && g(e)
                  ? i.chooseOptionForBiddingPhase(e, t, o)
                  : "Picking Trump" === t.name && l(e)
                  ? n.chooseOptionForPickingTrumpPhase(e, t)
                  : "Picking Partner's Best Card" === t.name && p(e)
                  ? r.chooseOptionForPickingPartnersBestCardPhase(e, t, o)
                  : "Trick-Taking" === t.name && p(e)
                  ? s.chooseOptionForTrickTakingPhase(e, t, o)
                  : t)();
              if ("Game Over" === a.name) return a;
              const [c, u] = h(a);
              return c ? a : (console.warn(u), t);
            }),
            e("startGame", (e) => {
              const t = d.randomPlayerPosition(),
                i = (t) => e.filter((e) => e.position === t)[0],
                n = d.shuffleAndDealFourHands(),
                r = (e) => ({
                  ...i(e),
                  hand: [...d.getHandSliceViaPosition(e, n)],
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
                o = h(s);
              return o[0] ? s : o;
            });
        },
      };
    }
  ),
  System.register(
    "mod",
    ["index", "choose_option_utils/choose_for_trick_taking_phase"],
    function (e, t) {
      "use strict";
      t && t.id;
      return {
        setters: [
          function (t) {
            e({
              chooseOption: t.chooseOption,
              determineIfPhaseIsLegal: t.determineIfPhaseIsLegal,
              getOptions: t.getOptions,
              isLegalOption: t.isLegalOption,
              startGame: t.startGame,
            });
          },
          function (t) {
            e({ getPositionOfWinnerOfTrick: t.getPositionOfWinnerOfTrick });
          },
        ],
        execute: function () {},
      };
    }
  );
const __exp = __instantiate("mod");
export const chooseOption = __exp.chooseOption;
export const determineIfPhaseIsLegal = __exp.determineIfPhaseIsLegal;
export const getOptions = __exp.getOptions;
export const isLegalOption = __exp.isLegalOption;
export const startGame = __exp.startGame;
export const Phase = __exp.Phase;
export const Option = __exp.Option;
export const PlayerPosition = __exp.PlayerPosition;
export const LobbyPlayer = __exp.LobbyPlayer;
export const getPositionOfWinnerOfTrick = __exp.getPositionOfWinnerOfTrick;
