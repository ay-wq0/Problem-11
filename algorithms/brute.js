export default {
  name: "Brute Force",
  description: "Tries every possible choice, even clearly bad ones.",
  nextStates(problem, state) {
    return problem.getNextStates(state);
  }
};
