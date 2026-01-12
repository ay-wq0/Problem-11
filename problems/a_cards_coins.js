export default {
  name: "Cards / Coins",

  description:
    "The goal is to collect all coins. Each step, you can pick up either 1 or 2 coins until all are collected.",

  useVisited: true,

  initialState() {
    return { coins: 3, collected: 0 };
  },

  stateKey(s) {
    return `${s.collected}`;
  },

  isGoal(s) {
    return s.collected === s.coins;
  },

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

  liveExplanation(s) {
    return `Collected ${s.collected} out of ${s.coins} coins.`;
  },

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
