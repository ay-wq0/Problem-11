export default {
  name: "Airline Seat Assignment",

  description:
    "Shows how recursion generates all seating arrangements. Each step assigns the next passenger to one of the remaining empty seats.",

  // Initial empty plane
  initialState() {
    return {
      passengers: 4,
      seats: 4,
      assigned: [] // index = passenger, value = seat
    };
  },

  // Unique state representation
  stateKey(s) {
    return s.assigned.join(",");
  },

  // Goal: all passengers seated
  isGoal(s) {
    return s.assigned.length === s.passengers;
  },

  // Try seating the next passenger in any free seat
  getNextStates(s) {
    const next = [];
    const passenger = s.assigned.length;

    for (let seat = 0; seat < s.seats; seat++) {
      if (!s.assigned.includes(seat)) {
        next.push({
          ...s,
          assigned: [...s.assigned, seat]
        });
      }
    }
    return next;
  },

  // Simple narration text
  liveExplanation(state) {
    if (state.assigned.length === 0)
      return "No passengers seated yet.";

    const p = state.assigned.length - 1;
    const seat = state.assigned[p];
    return `Passenger P${p} is seated in Seat S${seat}.`;
  },

  // Clean, non-overlapping render
  renderState(s, ctx) {
    ctx.font = "16px monospace";
    ctx.fillStyle = "black";

    const startX = 60;
    const passengerY = 120;
    const seatY = 260;
    const spacing = 140;

    // ---------- PASSENGERS ----------
    ctx.fillText("Passengers", startX, passengerY - 40);

    for (let i = 0; i < s.passengers; i++) {
      const x = startX + i * spacing;

      ctx.beginPath();
      ctx.arc(x, passengerY, 25, 0, Math.PI * 2);
      ctx.fillStyle = "lightblue";
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "black";
      ctx.fillText(`P${i}`, x - 10, passengerY + 5);
    }

    // ---------- SEATS ----------
    ctx.fillText("Plane Seats", startX, seatY - 40);

    for (let i = 0; i < s.seats; i++) {
      const x = startX + i * spacing;
      const assignedPassenger = s.assigned.indexOf(i);

      ctx.fillStyle =
        assignedPassenger !== -1 ? "lightgreen" : "lightgray";

      ctx.fillRect(x - 30, seatY - 20, 60, 40);
      ctx.strokeRect(x - 30, seatY - 20, 60, 40);

      ctx.fillStyle = "black";
      ctx.fillText(`S${i}`, x - 10, seatY + 5);

      if (assignedPassenger !== -1) {
        ctx.fillText(
          `P${assignedPassenger}`,
          x - 14,
          seatY + 25
        );
      }
    }

    // ---------- CURRENT ACTION ----------
    ctx.fillStyle = "#333";
    ctx.fillText(
      `Assigning Passenger: P${s.assigned.length}`,
      startX,
      190
    );
  }
};
