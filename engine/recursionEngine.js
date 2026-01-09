// recursionEngine.js
export default {
  /**
   * Runs a problem module using a specified algorithm
   * @param {Object} problem - The problem module (must follow the plug-in contract)
   * @param {string} algorithmType - "brute" or "optimized"
   */
  run(problem, algorithmType = "brute") {
    // Metrics
    const metrics = {
      recursiveCalls: 0,
      maxDepth: 0,
      statesExplored: 0,
      startTime: performance.now(),
      endTime: null,
    };

    // Recursive engine function
    function recurse(state, depth = 0) {
      metrics.recursiveCalls++;
      metrics.maxDepth = Math.max(metrics.maxDepth, depth);

      if (problem.isGoal(state)) {
        return [state];
      }

      const nextStates = problem.getNextStates(state, algorithmType);
      metrics.statesExplored += nextStates.length;

      let results = [];
      for (const nextState of nextStates) {
        results = results.concat(recurse(nextState, depth + 1));
      }
      return results;
    }

    // Initial state
    const initial = problem.initialState();

    // Run recursion
    const results = recurse(initial);

    metrics.endTime = performance.now();
    console.log(`✅ Problem: ${problem.name}`);
    console.log(`Algorithm: ${algorithmType}`);
    console.log(`Recursive calls: ${metrics.recursiveCalls}`);
    console.log(`Max depth: ${metrics.maxDepth}`);
    console.log(`States explored: ${metrics.statesExplored}`);
    console.log(`Time elapsed: ${(metrics.endTime - metrics.startTime).toFixed(2)}ms`);

    return results;
  },

  /**
   * Optional: Animated version
   * @param {Object} problem - Problem module
   * @param {CanvasRenderingContext2D} ctx - Canvas context for rendering
   * @param {string} algorithmType - "brute" or "optimized"
   * @param {number} delay - milliseconds between steps
   */
  async runAnimated(problem, ctx, algorithmType = "brute", delay = 200) {
    const metrics = {
      recursiveCalls: 0,
      maxDepth: 0,
      statesExplored: 0,
      startTime: performance.now(),
      endTime: null,
    };

    async function recurse(state, depth = 0) {
      metrics.recursiveCalls++;
      metrics.maxDepth = Math.max(metrics.maxDepth, depth);

      // Render current state
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      problem.renderState(state, ctx);
      await new Promise((res) => setTimeout(res, delay));

      if (problem.isGoal(state)) {
        return [state];
      }

      const nextStates = problem.getNextStates(state, algorithmType);
      metrics.statesExplored += nextStates.length;

      let results = [];
      for (const nextState of nextStates) {
        results = results.concat(await recurse(nextState, depth + 1));
      }
      return results;
    }

    const initial = problem.initialState();
    const results = await recurse(initial);

    metrics.endTime = performance.now();
    console.log(`✅ Problem: ${problem.name} (animated)`);
    console.log(`Algorithm: ${algorithmType}`);
    console.log(`Recursive calls: ${metrics.recursiveCalls}`);
    console.log(`Max depth: ${metrics.maxDepth}`);
    console.log(`States explored: ${metrics.statesExplored}`);
    console.log(`Time elapsed: ${(metrics.endTime - metrics.startTime).toFixed(2)}ms`);

    return results;
  },
};
