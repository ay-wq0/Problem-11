import { runProblem } from "./engine/recursionEngine.js";

document.getElementById("runBtn").onclick = () => {
  const problem = document.getElementById("problemSelect").value;
  const algorithm = document.getElementById("algorithmSelect").value;

  runProblem(problem, algorithm);
};
