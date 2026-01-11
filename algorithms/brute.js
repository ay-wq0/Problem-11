export default {
  name: "Brute DFS",

  description:
    "This method tries everything. It does not stop early. It does not avoid mistakes. It goes down every possible path until it reaches the end.",

  nextStates(problem, state) {
    return problem.getNextStates(state);
  }
};
