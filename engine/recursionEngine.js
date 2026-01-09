// engine/recursionEngine.js
import MetricsEngine from "./metricsEngine.js";
import brute from "../algorithms/brute.js";
import optimized from "../algorithms/optimized.js";

const algorithms = {
  brute,
  optimized,
};

function createRunner({ animate = false, ctx = null, delay = 0 }) {
  return async function run(problem, algorithmType = "brute") {
    const algorithm = algorithms[algorithmType];
    const metrics = new MetricsEngine();
    const visited = new Set();

    metrics.start();

    async function recurse(state, depth = 0) {
      const key = JSON.stringify(state);
      if (visited.has(key)) return [];
      visited.add(key);

      metrics.recordCall(depth);

      if (animate && ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        problem.renderState(state, ctx);
        await new Promise((r) => setTimeout(r, delay));
      }

      if (problem.isGoal(state)) {
        return [state];
      }

      const nextStates = algorithm.nextStates(problem, state);
      metrics.recordStates(nextStates.length);

      let results = [];
      for (const next of nextStates) {
        const sub = animate
          ? await recurse(next, depth + 1)
          : await recurse(next, depth + 1);
        results = results.concat(sub);
      }

      return results;
    }

    const initial = problem.initialState();
    // Always await recurse since it's async (prevents metrics from finishing early)
    const results = await recurse(initial);

    metrics.end();
    metrics.log(problem.name, algorithmType);

    return {
      results,
      metrics: metrics.snapshot(),
    };
  };
}

export default {
  run: createRunner({ animate: false }),
  runAnimated: (problem, ctx, algorithmType = "brute", delay = 200) =>
    createRunner({ animate: true, ctx, delay })(problem, algorithmType),
};
