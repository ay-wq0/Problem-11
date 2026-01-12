export default {
  name: "Ten Pirates",

  description:
    "Distribute gold among pirates. Each pirate can receive any amount from 0 up to the remaining gold.",

  useVisited: false,

  initialState() {
    return { pirates: 3, gold: 5, distributed: [] };
  },

  stateKey(s) {
    return `${s.gold}|${s.distributed.join(",")}`;
  },

  isGoal(s) {
    return s.distributed.length === s.pirates;
  },

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

  liveExplanation(s) {
    return `Gold given so far: [${s.distributed.join(", ")}], remaining: ${s.gold}.`;
  },

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
