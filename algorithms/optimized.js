export default {
  name: "Optimized DFS",

  description:
    "This method is smarter. Before going deeper, it checks if a choice is already wrong. If it is wrong, it stops early and does not continue that path.",

  nextStates(problem, state, onPrune) {
    let states = problem.getNextStates(state);

    if (problem.prune) {
      states = states.filter(s => {
        const badChoice = problem.prune(s);
        if (badChoice) onPrune?.();
        return !badChoice;
      });
    }

    return states;
  }
};
