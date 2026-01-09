// engine/animationEngine.js
import recursionEngine from "./recursionEngine.js";

export default {
  animate(problem, ctx, algorithmType = "brute", delay = 200) {
    return recursionEngine.runAnimated(
      problem,
      ctx,
      algorithmType,
      delay
    );
  },
};
