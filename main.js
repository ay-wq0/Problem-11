import animationEngine from "./engine/animationEngine.js";

import cards from "./problems/a_cards_coins.js";
import pirates from "./problems/b_ten_pirates.js";
import handshake from "./problems/c_handshake.js";
import airline from "./problems/d_airline_seats.js";
import birthday from "./problems/e_birthday.js";

const problems = {
  cards,
  tenPirates: pirates,
  handshake,
  airline,
  birthday
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const status = document.getElementById("status");

const problemDesc = document.getElementById("problemDesc");
const algorithmDesc = document.getElementById("algorithmDesc");
const liveExplain = document.getElementById("liveExplain");

let currentProblem = problems.cards;
let controller = null;

document.getElementById("problemSelect").onchange = e => {
  currentProblem = problems[e.target.value];
};

document.getElementById("run").onclick = () => {
  controller?.stop();
  controller = animationEngine.animateComparison(
    currentProblem,
    ctx,
    status,
    {
      narration: document.getElementById("narrationToggle"),
      nextBtn: document.getElementById("nextStep"),
      problemDesc,
      algorithmDesc,
      liveExplain
    }
  );
};

document.getElementById("pause").onclick = () => controller?.pause();
document.getElementById("resume").onclick = () => controller?.resume();
// Helper function to run a problem (both brute & optimized)
async function runProblem(problem) {
  console.clear();
  console.log(`=== Running ${problem.name} ===`);
  await recursionEngine.run(problem, "brute");
  await recursionEngine.run(problem, "optimized");
}

// Helper function to animate a problem
async function animateProblem(problem, algorithm = "brute") {
  console.clear();
  console.log(`=== Animating ${problem.name} (${algorithm}) ===`);
  await recursionEngine.runAnimated(problem, ctx, algorithm, 700);
}

// Map buttons
document.getElementById("run-cards").onclick = () => runProblem(cards);
document.getElementById("run-pirates").onclick = () => runProblem(pirates);
document.getElementById("run-handshake").onclick = () => runProblem(handshake);
document.getElementById("run-airline").onclick = () => runProblem(airline);
document.getElementById("run-birthday").onclick = () => runProblem(birthday);

document.getElementById("animate-cards").onclick = () => animateProblem(cards, "brute");
document.getElementById("animate-pirates").onclick = () => animateProblem(pirates, "brute");
document.getElementById("animate-handshake").onclick = () => animateProblem(handshake, "brute");
document.getElementById("animate-airline").onclick = () => animateProblem(airline, "brute");
document.getElementById("animate-birthday").onclick = () => animateProblem(birthday, "brute");
