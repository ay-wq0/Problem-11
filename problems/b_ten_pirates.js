// problems/b_ten_pirates.js

export default {
  name: "Ten Pirates and Gold",

  nPirates: 3, // small number for demo
  nGold: 5,    // total gold pieces

  initialState() {
    // state: array of gold each pirate receives
    return Array(this.nPirates).fill(0);
  },

  isGoal(state) {
    const total = state.reduce((sum, g) => sum + g, 0);
    return total === this.nGold;
  },

  getNextStates(state) {
    const nextStates = [];
    const pirateCount = state.length;

    for (let i = 0; i < pirateCount; i++) {
      const newState = [...state];
      if (newState.reduce((sum, g) => sum + g, 0) < this.nGold) {
        newState[i] += 1;
        nextStates.push(newState);
      }
    }

    return nextStates;
  },

  renderState(state, ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "20px monospace";
    ctx.fillStyle = "black";
    ctx.fillText(`Gold distribution: ${state.join(", ")}`, 20, 100);
  },

  prune(state) {
    return false;
  },

  isGuaranteedGoal(state) {
    return this.isGoal(state);
  },
};
