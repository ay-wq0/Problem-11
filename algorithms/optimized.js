export default {
  name: "Optimized",
  description: "Avoids choices that are already known to be wrong.",
  nextStates(problem, state, onPrune) {
    let states = problem.getNextStates(state);
    if (problem.prune) {
      states = states.filter(s => {
        const bad = problem.prune(s);
        if (bad && onPrune) onPrune();
        return !bad;
      });
    }
    return states;
  }
};
