import { resetMetrics, logMetrics } from "./metrics.js";
import { animate } from "./animationEngine.js";

export function runProblem(problem, algorithm) {
  resetMetrics();

  animate(`Running ${problem} using ${algorithm} algorithm`);

  // TEMP placeholder
  logMetrics({
    states: 0,
    depth: 0,
    time: "0ms"
  });
}
