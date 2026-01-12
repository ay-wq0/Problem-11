export default class MetricsEngine {
  constructor() {
    this.steps = 0;
    this.visited = 0;
    this.pruned = 0;
    this.solutions = [];
  }

  recordStep() { this.steps++; }
  recordVisited() { this.visited++; }
  recordPruned() { this.pruned++; }

  recordSolution(text) {
    this.solutions.push(text);
  }
}
