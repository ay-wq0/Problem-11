import MetricsEngine from "./metricsEngine.js";
import brute from "../algorithms/brute.js";
import optimized from "../algorithms/optimized.js";

const algos = { brute, optimized };

export default function createRunner({
  ctx,
  offsetX,
  width,
  algorithmType,
  label,
  status,
  ui
}) {
  const algorithm = algos[algorithmType];
  const metrics = new MetricsEngine();
  const visited = new Set();

  let stopped = false;
  let paused = false;

  async function recurse(problem, state, depth = 0) {
    if (stopped) return;

    if (problem.useVisited !== false) {
      const key = problem.stateKey(state);
      if (visited.has(key)) return;
      visited.add(key);
      metrics.recordVisited();
    }

    metrics.recordStep();

    ctx.save();
    ctx.translate(offsetX, 0);
    ctx.clearRect(0, 0, width, ctx.canvas.height);
    problem.renderState(state, ctx, algorithmType);

    ctx.fillStyle = "black";
    ctx.font = "26px monospace";
    ctx.fillText(label, 10, 20);
    ctx.fillText(`Steps: ${metrics.steps}`, 10, 40);
    ctx.fillText(`Visited: ${metrics.visited}`, 10, 60);
    ctx.fillText(`Pruned: ${metrics.pruned}`, 10, 80);
    ctx.restore();

    if (status) {
      status.textContent =
        `${label} | Steps: ${metrics.steps} | Visited: ${metrics.visited} | Stopped Early: ${metrics.pruned}`;
    }

    if (ui) {
      ui.problemDesc.textContent = problem.description;
      ui.algorithmDesc.textContent = algorithm.description;
      ui.liveExplain.textContent =
        problem.liveExplanation?.(state, depth) ||
        "Trying the next possible choice.";
    }
      let results = [];
      for (const next of nextStates) {
        const sub = animate
          ? await recurse(next, depth + 1)
          : await recurse(next, depth + 1);
        results = results.concat(sub);
      }

    if (ui?.narration.checked) {
      paused = true;
      await new Promise(res => {
        ui.nextBtn.onclick = () => {
          paused = false;
          res();
        };
      });
    }

    while (paused && !stopped) {
      await new Promise(r => setTimeout(r, 100));
    }

    if (problem.isGoal(state)) return;

    const nextStates = algorithm.nextStates(problem, state, () => {
      metrics.recordPruned();
      ctx.save();
      ctx.translate(offsetX, 0);
      ctx.fillStyle = "rgba(255,0,0,0.12)";
      ctx.fillRect(0, 0, width, ctx.canvas.height);
      ctx.restore();
    });

    for (const next of nextStates) {
      await recurse(problem, next, depth + 1);
    }
  }

  return {
    run(problem) {
      recurse(problem, problem.initialState());
    },
    stop() { stopped = true; },
    pause() { paused = true; },
    resume() { paused = false; }
  };
}
