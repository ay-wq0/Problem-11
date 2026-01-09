import recursionEngine from "./engine/recursionEngine.js";

// Import all problems
import cards from "./problems/a_cards_coins.js";
import pirates from "./problems/b_ten_pirates.js";
import handshake from "./problems/c_handshake.js";
import airline from "./problems/d_airline_seats.js";
import birthday from "./problems/e_birthday.js";

// Canvas setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
