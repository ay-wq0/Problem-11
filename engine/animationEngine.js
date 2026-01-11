import createRunner from "./recursionEngine.js";

export default {
  animateComparison(problem, ctx, status, ui) {
    const left = createRunner({
      ctx,
      offsetX: 0,
      width: ctx.canvas.width / 2,
      algorithmType: "brute",
      label: "Brute DFS",
      status,
      ui
    });

    const right = createRunner({
      ctx,
      offsetX: ctx.canvas.width / 2,
      width: ctx.canvas.width / 2,
      algorithmType: "optimized",
      label: "Optimized DFS",
      status,
      ui
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
