// algorithms/brute.js
export default {
  name: "Brute Force",

  /**
   * Return ALL possible next states
   * No pruning, no shortcuts
   */
  nextStates(problem, state) {
    // Direct delegation to the problem definition
    return problem.getNextStates(state);
  },
};
