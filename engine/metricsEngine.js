// engine/metricsEngine.js
export default class MetricsEngine {
  constructor() {
    this.reset();
  }

  reset() {
    this.recursiveCalls = 0;
    this.maxDepth = 0;
    this.statesExplored = 0;
    this.startTime = null;
    this.endTime = null;
  }

  start() {
    this.startTime = performance.now();
  }

  end() {
    this.endTime = performance.now();
  }

  recordCall(depth) {
    this.recursiveCalls++;
    this.maxDepth = Math.max(this.maxDepth, depth);
  }

  recordStates(count) {
    this.statesExplored += count;
  }

  snapshot() {
    return {
      recursiveCalls: this.recursiveCalls,
      maxDepth: this.maxDepth,
      statesExplored: this.statesExplored,
      timeElapsed:
        this.startTime && this.endTime
          ? (this.endTime - this.startTime).toFixed(2)
          : null,
    };
  }

  log(problemName, algorithmName) {
    const m = this.snapshot();
    console.log(`📊 ${problemName} — ${algorithmName}`);
    console.log(`Recursive calls: ${m.recursiveCalls}`);
    console.log(`Max depth: ${m.maxDepth}`);
    console.log(`States explored: ${m.statesExplored}`);
    console.log(`Time elapsed: ${m.timeElapsed} ms`);
  }
}
