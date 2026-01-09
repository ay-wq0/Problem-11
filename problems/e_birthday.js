// problems/e_birthday.js

export default {
  name: "Birthday Problem",

  nPeople: 3, // small demo
  nDays: 3,   // total possible birthdays

  initialState() {
    return Array(this.nPeople).fill(null); // null = birthday not assigned
  },

  isGoal(state) {
    return state.every((b) => b !== null);
  },

  getNextStates(state) {
    const nextStates = [];
    const nextPerson = state.indexOf(null);
    if (nextPerson === -1) return nextStates;

    for (let day = 1; day <= this.nDays; day++) {
      const newState = [...state];
      newState[nextPerson] = day;
      nextStates.push(newState);
    }

    return nextStates;
  },

  renderState(state, ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "20px monospace";
    ctx.fillStyle = "black";
    ctx.fillText(
      `Birthdays: ${state.map((b) => (b === null ? "-" : b)).join(", ")}`,
      20,
      100
    );
  },

  prune(state) {
    return false;
  },

  isGuaranteedGoal(state) {
    return this.isGoal(state);
  },
};
