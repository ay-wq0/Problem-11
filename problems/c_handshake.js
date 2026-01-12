export default {
  name: "Handshakes",

  description:
    "Everyone must shake hands with everyone else exactly once. Repeating a handshake is invalid.",

  useVisited: true,

  initialState() {
    return { people: 4, handshakes: [] };
  },

  stateKey(s) {
    return s.handshakes
      .map(h => h.join("-"))
      .sort()
      .join("|");
  },

  isGoal(s) {
    return s.handshakes.length === (s.people * (s.people - 1)) / 2;
  },

  getNextStates(s) {
    const next = [];
    const done = new Set(s.handshakes.map(h => h.join(",")));

    for (let i = 0; i < s.people; i++) {
      for (let j = i + 1; j < s.people; j++) {
        const key = `${i},${j}`;
        if (!done.has(key)) {
          next.push({ ...s, handshakes: [...s.handshakes, [i, j]] });
        }
      }
    }
    return next;
  },

  liveExplanation(s) {
    return `Handshakes completed so far: ${s.handshakes.length}.`;
  },

  renderState(s, ctx) {
    const y = 200;
    const space = 180;

    const pos = Array.from({ length: s.people }, (_, i) => ({
      x: 120 + i * space,
      y
    }));

    pos.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 25, 0, Math.PI * 2);
      ctx.fillStyle = "lightblue";
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.fillText(`P${i}`, p.x - 10, p.y + 5);
    });

    s.handshakes.forEach(([i, j], idx) => {
      ctx.fillText(`P${i} ↔ P${j}`, 300, 260 + idx * 25);
    });
  }
};
