export default {
  name: "Seat Assignment",

  description:
    "Each passenger must pick one seat. A seat can only be used once. The order matters.",

  useVisited: false,

  initialState() {
    return { seats: 4, occupied: [] };
  },

  stateKey(s) {
    return s.occupied.join(",");
  },

  isGoal(s) {
    return s.occupied.length === s.seats;
  },

  getNextStates(s) {
    const next = [];
    for (let i = 0; i < s.seats; i++) {
      if (!s.occupied.includes(i)) {
        next.push({
          ...s,
          occupied: [...s.occupied, i]
        });
      }
    }
    return next;
  },

  liveExplanation(state) {
    return `Passenger ${state.occupied.length} is choosing a seat.`;
  },

  renderState(s, ctx) {
    const y = 220;
    for (let i = 0; i < s.seats; i++) {
      const x = 80 + i * 140;
      ctx.fillStyle = s.occupied.includes(i)
        ? "green"
        : "lightgray";
      ctx.fillRect(x, y, 80, 50);
      ctx.strokeRect(x, y, 80, 50);
      ctx.fillStyle = "black";
      ctx.fillText(`Seat ${i}`, x + 18, y + 30);
    }
  }
};
