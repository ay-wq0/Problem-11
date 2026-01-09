// problems/a_cards_coins.js

export default {
  name: "Cards / Coins in the Dark",

  nCoins: 3, // number of coins to find

  // Starting state: all coins unknown (0 = face down)
  initialState() {
    return Array(this.nCoins).fill(0);
  },

  // Goal: all coins have been flipped
  isGoal(state) {
    return state.every((coin) => coin === 1);
  },

  // Flip one coin at a time
  getNextStates(state) {
    const nextStates = [];
    state.forEach((coin, idx) => {
      if (coin === 0) {
        const newState = [...state];
        newState[idx] = 1;
        nextStates.push(newState);
      }
    });
    return nextStates;
  },

  renderState(state, ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "24px monospace";
    ctx.fillStyle = "black";
    ctx.fillText(`Coins: ${state.map((c) => (c ? "H" : "T")).join(" ")}`, 50, 100);
  },

  prune(state) {
    return false;
  },

  isGuaranteedGoal(state) {
    return this.isGoal(state);
  },
};
