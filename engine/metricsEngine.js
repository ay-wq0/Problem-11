// MetricsEngine
// --------------
// Tracks what the algorithm is doing so we can compare efficiency.

export default class MetricsEngine {
  constructor() {
    this.steps = 0;    // total recursive calls
    this.visited = 0;  // unique states explored
    this.pruned = 0;   // branches stopped early
  }

  recordStep() { this.steps++; }
  recordVisited() { this.visited++; }
  recordPruned() { this.pruned++; }
}
