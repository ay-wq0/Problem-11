export default {
  name: "Airline Seat Assignment",

  description:
    "Passengers are assigned seats one by one. Brute force allows seat reuse; optimized avoids it.",

  useVisited: false,

  initialState() {
    return { passengers: 4, seats: 4, assigned: [] };
  },

  stateKey(s) {
    return s.assigned.join(",");
  },

  prune(s) {
    // Optimized only: same seat used twice is invalid
    return new Set(s.assigned).size !== s.assigned.length;
  },

  isGoal(s) {
    return s.assigned.length === s.passengers;
  },

  getNextStates(s) {
    const next = [];
    for (let seat = 0; seat < s.seats; seat++) {
      next.push({ ...s, assigned: [...s.assigned, seat] });
    }
    return next;
  },

  liveExplanation(s) {
    if (s.assigned.length === 0) return "No passengers seated yet.";
    const p = s.assigned.length - 1;
    return `Passenger P${p} tries Seat S${s.assigned[p]}.`;
  },

  formatSolution(s) {
    return s.assigned
      .map((seat, p) => `P${p}→S${seat}`)
      .join(", ");
  },

  renderState(s, ctx) {
    ctx.font = "16px monospace";
    ctx.fillStyle = "black";

    const startX = 100;
    const startY = 220;

    for (let i = 0; i < s.seats; i++) {
      const x = startX + i * 100;
      const y = startY;

      const occupant = s.assigned.indexOf(i);
      ctx.fillStyle = occupant !== -1 ? "lightgreen" : "lightgray";
      ctx.fillRect(x, y, 60, 60);
      ctx.strokeRect(x, y, 60, 60);

      ctx.fillStyle = "black";
      ctx.fillText(`S${i}`, x + 18, y + 35);

      if (occupant !== -1) {
        ctx.fillText(`P${occupant}`, x + 18, y - 5);
      }
    }
  }
};
