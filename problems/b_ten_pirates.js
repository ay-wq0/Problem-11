// Ten Pirates and Gold Problem
// -----------------------------
// Goal:
// Distribute gold among pirates in every possible way.
//
// At each recursive step:
// - the algorithm assigns some amount of gold to the next pirate
//
// This problem demonstrates:
// - combinatorial explosion
// - exponential growth
// - why brute-force recursion becomes expensive
//
// No pruning is applied here on purpose.

export default {
  name: "Ten Pirates and Gold",

  description:
    "Gold is distributed among pirates one by one. The algorithm explores all possible ways of assigning gold, demonstrating how recursive branching grows exponentially.",

  // We disable visited states because
  // different distributions with the same remaining gold
  // are still meaningful and should be explored.
  useVisited: false,

  initialState() {
    return { pirates: 3, gold: 5, distributed: [] };
  },

  // The state is defined by remaining gold and past assignments
  stateKey(s) {
    return `${s.gold}|${s.distributed.join(",")}`;
  },

  // Goal is reached when every pirate has been assigned gold
  isGoal(s) {
    return s.distributed.length === s.pirates;
  },

  // Generate all possible gold assignments for the next pirate
  getNextStates(s) {
    const next = [];

    if (s.distributed.length >= s.pirates) return next;

    for (let g = 0; g <= s.gold; g++) {
      next.push({
        pirates: s.pirates,
        gold: s.gold - g,
        distributed: [...s.distributed, g]
      });
    }

    return next;
  },

  explainState(state) {
    let text = "Gold distribution so far:\n";

    state.distributed.forEach((g, i) => {
      text += `Pirate ${i} has ${g} gold. `;
    });

    text += `Remaining gold: ${state.gold}.`;
    return text;
  },

  // Visualize gold stacks for each pirate
  renderState(s, ctx) {
    ctx.fillStyle = "black";
    ctx.fillText(`Remaining Gold: ${s.gold}`, 10, 40);

    s.distributed.forEach((g, i) => {
      ctx.fillText(`Pirate ${i}`, 80 + i * 150, 150);
      const baseY = 260;

      for (let j = 0; j < g; j++) {
        ctx.fillStyle = "gold";
        ctx.fillRect(70 + i * 150, baseY - j * 18, 40, 15);
        ctx.strokeRect(70 + i * 150, baseY - j * 18, 40, 15);
      }
    });
  }
};
