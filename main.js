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
const speedSlider = document.getElementById("speedSlider");

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
      problemDesc,
      algorithmDesc,
      liveExplain,
      getDelay: () => Number(speedSlider.value)
    }
  );
};

document.getElementById("pause").onclick = () => controller?.pause();
document.getElementById("resume").onclick = () => controller?.resume();
