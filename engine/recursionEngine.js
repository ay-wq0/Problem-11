import MetricsEngine from "./metricsEngine.js";
import brute from "../algorithms/brute.js";
import optimized from "../algorithms/optimized.js";

const MAX_STEPS = 5000;
const algos = { brute, optimized };

export default function createRunner({
  ctx,
  offsetX,
  width,
  algorithmType,
  label,
  status,
  ui,
  totalSteps
}) {
  const algorithm = algos[algorithmType];
  const metrics = new MetricsEngine();
  const visited = new Set();

  let stopped = false;
  let paused = false;
  const getDelay = ui?.getDelay || (() => 40);

  async function recurse(problem, state) {
    if (stopped) return;

    if (metrics.steps >= MAX_STEPS) {
      stopped = true;
      status.textContent = `${label} stopped (MAX_STEPS reached)`;
      return;
    }

    if (problem.useVisited) {
      const key = problem.stateKey(state);
      if (visited.has(key)) return;
      visited.add(key);
      metrics.recordVisited();
    }

    metrics.recordStep();

    ctx.save();
    ctx.translate(offsetX, 0);

    // soft fade
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillRect(0, 0, width, ctx.canvas.height);

    if (problem.isGoal(state)) {
      ctx.fillStyle = "rgba(0,255,0,0.12)";
      ctx.fillRect(0, 0, width, ctx.canvas.height);
    }

    problem.renderState(state, ctx);

    ctx.fillStyle = "black";
    ctx.font = "20px monospace";
    ctx.fillText(label, 10, 20);
    ctx.fillText(
      `Steps: ${metrics.steps} / ${totalSteps}`,
      10,
      45
    );
    ctx.restore();

    ui.problemDesc.textContent = problem.description;
    ui.algorithmDesc.textContent = algorithm.description;
    ui.liveExplain.textContent =
      problem.liveExplanation?.(state) || "";

    await new Promise(r => setTimeout(r, getDelay()));

    while (paused && !stopped) {
      await new Promise(r => setTimeout(r, 50));
    }

    if (problem.isGoal(state)) {
      if (problem.formatSolution) {
        metrics.recordSolution(problem.formatSolution(state));
      }
      return;
    }

    const nextStates = algorithm.nextStates(problem, state, () => {
      metrics.recordPruned();
    });

    for (const next of nextStates) {
      await recurse(problem, next);
    }
  }

  return {
    run(problem) {
      recurse(problem, problem.initialState()).then(() => {
        if (metrics.solutions.length > 0) {
          ui.liveExplain.innerHTML =
            "<strong>Solutions:</strong><br>" +
            metrics.solutions
              .map((s, i) => `#${i + 1}: ${s}`)
              .join("<br>");
        }
      });
    },
    stop() { stopped = true; },
    pause() { paused = true; },
    resume() { paused = false; }
  };
}
