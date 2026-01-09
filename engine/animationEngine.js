// animationEngine.js
export default {
  /**
   * Animates a problem module's recursion step-by-step.
   * @param {Object} problem - Problem module (must follow plug-in contract)
   * @param {CanvasRenderingContext2D} ctx - Canvas context for rendering
   * @param {string} algorithmType - "brute" or "optimized"
   * @param {number} delay - milliseconds between steps
   */
  async animate(problem, ctx, algorithmType = "brute", delay = 200) {
    const metrics = {
      recursiveCalls: 0,
      maxDepth: 0,
      statesExplored: 0,
      startTime: performance.now(),
      endTime: null,
    };

    // Internal recursive function
    async function recurse(state, depth = 0) {
      metrics.recursiveCalls++;
      metrics.maxDepth = Math.max(metrics.maxDepth, depth);

      // Render current state visually
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      problem.renderState(state, ctx);

      // Pause for animation
      await new Promise((resolve) => setTimeout(resolve, delay));

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

    // Start recursion
    const initial = problem.initialState();
    const results = await recurse(initial);

    metrics.endTime = performance.now();
    console.log(`🎨 Animated Problem: ${problem.name}`);
    console.log(`Algorithm: ${algorithmType}`);
    console.log(`Recursive calls: ${metrics.recursiveCalls}`);
    console.log(`Max depth: ${metrics.maxDepth}`);
    console.log(`States explored: ${metrics.statesExplored}`);
    console.log(`Time elapsed: ${(metrics.endTime - metrics.startTime).toFixed(2)}ms`);

    return results;
  },
};
