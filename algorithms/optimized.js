// algorithms/optimized.js
export default {
  name: "Optimized Search",

  /**
   * Return pruned next states
   * Optimization rules are generic and safe
   */
  nextStates(problem, state) {
    let nextStates = problem.getNextStates(state);

    // 1️⃣ Optional problem-specific pruning hook
    if (typeof problem.prune === "function") {
      nextStates = nextStates.filter((s) => !problem.prune(s));
    }

    // 2️⃣ Optional early stopping hook
    if (typeof problem.isGuaranteedGoal === "function") {
      for (const s of nextStates) {
        if (problem.isGuaranteedGoal(s)) {
          return [s];
        }
      }
    }

    return nextStates;
  },
};
