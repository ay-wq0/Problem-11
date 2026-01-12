import createRunner from "./recursionEngine.js";
import brute from "../algorithms/brute.js";
import optimized from "../algorithms/optimized.js";

function countSteps(problem, algorithm) {
  let steps = 0;
  const visited = new Set();

  function walk(state) {
    if (steps >= 5000) return;

    if (problem.useVisited) {
      const key = problem.stateKey(state);
      if (visited.has(key)) return;
      visited.add(key);
    }

    steps++;
    if (problem.isGoal(state)) return;

    const next = algorithm.nextStates(problem, state);
    for (const n of next) walk(n);
  }

  walk(problem.initialState());
  return steps;
}

export default {
  animateComparison(problem, ctx, status, ui) {
    const bruteTotal = countSteps(problem, brute);
    const optTotal = countSteps(problem, optimized);

    const left = createRunner({
      ctx,
      offsetX: 0,
      width: ctx.canvas.width / 2,
      algorithmType: "brute",
      label: "Brute Force",
      status,
      ui,
      totalSteps: bruteTotal
    });

    const right = createRunner({
      ctx,
      offsetX: ctx.canvas.width / 2,
      width: ctx.canvas.width / 2,
      algorithmType: "optimized",
      label: "Optimized",
      status,
      ui,
      totalSteps: optTotal
    });

    left.run(problem);
    right.run(problem);

    return {
      stop() { left.stop(); right.stop(); },
      pause() { left.pause(); right.pause(); },
      resume() { left.resume(); right.resume(); }
    };
  }
};
