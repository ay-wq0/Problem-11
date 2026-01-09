// problems/d_airline_seats.js

export default {
  name: "Airline Seats",

  nSeats: 3, // small demo
  nPassengers: 3,

  initialState() {
    return {
      seats: Array(this.nSeats).fill(null), // null = empty
      nextPassenger: 0,
    };
  },

  isGoal(state) {
    return state.nextPassenger >= this.nPassengers;
  },

  getNextStates(state) {
    const nextStates = [];
    for (let i = 0; i < this.nSeats; i++) {
      if (state.seats[i] === null) {
        const newSeats = [...state.seats];
        newSeats[i] = state.nextPassenger;
        nextStates.push({
          seats: newSeats,
          nextPassenger: state.nextPassenger + 1,
        });
      }
    }
    return nextStates;
  },

  renderState(state, ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "20px monospace";
    ctx.fillStyle = "black";
    ctx.fillText(
      `Seats: ${state.seats.map((p) => (p === null ? "-" : p)).join(" ")}`,
      20,
      100
    );
    ctx.fillText(`Next passenger: ${state.nextPassenger}`, 20, 130);
  },

  prune(state) {
    return false;
  },

  isGuaranteedGoal(state) {
    return this.isGoal(state);
  },
};
