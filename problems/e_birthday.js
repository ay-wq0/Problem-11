// Birthday Assignment Problem
// ---------------------------
// Assign unique birthdays to people.
// If two people share a birthday, the state is invalid.
//
// This demonstrates constraint satisfaction and pruning.

export default {
  name: "Birthday Assignment",

  description:
    "Birthdays are assigned one person at a time. States that contain duplicate birthdays are pruned early.",

  useVisited: false,

  initialState() {
    return { nPeople: 4, nDays: 5, birthdays: [] };
  },

  stateKey(s) {
    return s.birthdays.join(",");
  },

  prune(s) {
    // If duplicates exist, stop exploring this path
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

  liveExplanation(state) {
    return `Assigned birthdays to ${state.birthdays.length} person(s). Checking for duplicates.`;
  },

  renderState(s, ctx) {
    s.birthdays.forEach((day, i) => {
      const x = 120 + i * 180;
      const y = 220;
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fillStyle = "lightblue";
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.fillText(`P${i}`, x - 10, y - 40);
      ctx.fillText(`D${day}`, x - 10, y + 5);
    });
  }
};
