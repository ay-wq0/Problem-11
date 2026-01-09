// problems/c_handshake.js

export default {
  name: "Handshakes Among n People",

  // Set the number of people
  n: 4, // you can change this number to test bigger groups

  // Starting state: no handshakes yet
  initialState() {
    return {
      people: Array(this.n).fill(0), // 0 = hasn't shaken hands
      handshakes: [] // list of handshake pairs
    };
  },

  // Goal: all possible pairs have shaken hands
  isGoal(state) {
    const totalPairs = (this.n * (this.n - 1)) / 2;
    return state.handshakes.length === totalPairs;
  },

  // Generate all next states by adding one new handshake
  getNextStates(state) {
    const nextStates = [];
    const n = this.n;

    // Find all pairs who haven't shaken yet
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const exists = state.handshakes.some(
          ([a, b]) =>
            (a === i && b === j) || (a === j && b === i)
        );
        if (!exists) {
          // create new state with this handshake added
          const newState = {
            people: [...state.people],
            handshakes: [...state.handshakes, [i, j]]
          };
          nextStates.push(newState);
        }
      }
    }

    return nextStates;
  },

  // Render state on canvas (text-based)
  renderState(state, ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "20px monospace";
    ctx.fillStyle = "black";

    ctx.fillText(
      `Handshakes: ${state.handshakes
        .map(pair => `[${pair[0]},${pair[1]}]`)
        .join(" ")}`,
      20,
      50
    );
  },

  // Optional pruning: skip states with duplicate handshakes (already handled)
  prune(state) {
    return false;
  },

  // Optional early stop: if goal reached, return immediately
  isGuaranteedGoal(state) {
    return this.isGoal(state);
  },
};
