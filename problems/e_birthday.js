export default {
  name: "Birthday Assignment",

  description:
    "Each person is assigned a birthday. Brute force allows duplicates; optimized avoids assigning the same day twice.",

  useVisited: false,

  initialState() {
    return { nPeople: 4, nDays: 5, birthdays: [] };
  },

  stateKey(s) {
    return s.birthdays.join(",");
  },

  prune(s) {
    // Optimized only: duplicate birthdays are invalid
    return new Set(s.birthdays).size !== s.birthdays.length;
  },

  isGoal(s) {
    return s.birthdays.length === s.nPeople;
  },

  getNextStates(s) {
    const next = [];
    for (let d = 1; d <= s.nDays; d++) {
      next.push({ ...s, birthdays: [...s.birthdays, d] });
    }
    return next;
  },

  liveExplanation(s) {
    return `Assigned birthdays to ${s.birthdays.length} people.`;
  },

  formatSolution(s) {
    return s.birthdays
      .map((d, i) => `P${i}→D${d}`)
      .join(", ");
  },

  renderState(s, ctx) {
    s.birthdays.forEach((day, i) => {
      const x = 120 + i * 180;
      const y = 220;

      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);

      // highlight most recent assignment
      ctx.strokeStyle =
        i === s.birthdays.length - 1 ? "red" : "black";
      ctx.lineWidth =
        i === s.birthdays.length - 1 ? 3 : 1;

      ctx.fillStyle = "lightblue";
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "black";
      ctx.fillText(`P${i}`, x - 10, y - 40);
      ctx.fillText(`D${day}`, x - 12, y + 5);
    });
  }
};
