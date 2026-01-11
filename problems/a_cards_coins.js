// Cards / Coins Problem
// ---------------------
// Goal:
// Collect all coins.
//
// At each step, the algorithm can choose to:
// - collect 1 coin
// - collect 2 coins
//
// This problem demonstrates:
// - basic recursion
// - branching choices
// - stopping when a goal is reached
//
// No pruning is needed because all paths are valid.

export default {
  name: "Cards / Coins",

  description:
    "The goal is to collect all coins. At each recursive step, the algorithm chooses to collect either one or two coins until all coins are collected.",

  // Visited states ARE useful here because
  // collecting the same number of coins again
  // would repeat the same work.
  useVisited: true,

  initialState() {
    return { coins: 3, collected: 0 };
  },

  // States are uniquely identified by how many coins are collected
  stateKey(s) {
    return `${s.collected}`;
  },

  // The goal is reached when all coins are collected
  isGoal(s) {
    return s.collected === s.coins;
  },

  // Generate all valid next choices
  getNextStates(s) {
    const next = [];

    if (s.collected + 1 <= s.coins) {
      next.push({ ...s, collected: s.collected + 1 });
    }

    if (s.collected + 2 <= s.coins) {
      next.push({ ...s, collected: s.collected + 2 });
    }

    return next;
  },

  explainState(state) {
    return `Collected ${state.collected} out of ${state.coins} coins so far.`;
  },

  // Visual representation of the coins
  renderState(s, ctx) {
    ctx.font = "26px monospace";
    ctx.fillStyle = "black";
    ctx.fillText(`Collected: ${s.collected}/${s.coins}`, 10, 40);

    for (let i = 0; i < s.coins; i++) {
      ctx.beginPath();
      ctx.arc(100 + i * 80, 240, 30, 0, Math.PI * 2);
      ctx.fillStyle = i < s.collected ? "gold" : "gray";
      ctx.fill();
      ctx.stroke();
    }
  }
};
