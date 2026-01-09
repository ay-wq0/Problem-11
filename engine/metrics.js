// metricsEngine.js
export default class MetricsEngine {
  constructor() {
    this.reset();
  }

  // Reset all metrics
  reset() {
    this.metrics = {
      recursiveCalls: 0,
      maxDepth: 0,
      statesExplored: 0,
      startTime: null,
      endTime: null,
    };
  }

  // Start timing
  start() {
    this.metrics.startTime = performance.now();
  }

  // End timing
  end() {
    this.metrics.endTime = performance.now();
  }

  // Record a recursive call
  recordCall(depth = 0) {
    this.metrics.recursiveCalls++;
    this.metrics.maxDepth = Math.max(this.metrics.maxDepth, depth);
  }

  // Record number of new states explored
  recordStates(count) {
    this.metrics.statesExplored += count;
  }

  // Get current metrics snapshot
  getMetrics() {
    const { recursiveCalls, maxDepth, statesExplored, startTime, endTime } = this.metrics;
    return {
      recursiveCalls,
      maxDepth,
      statesExplored,
      timeElapsed: endTime && startTime ? (endTime - startTime).toFixed(2) : null,
    };
  }

  // Log metrics nicely
  log(problemName, algorithmType = "") {
    const m = this.getMetrics();
    console.log(`📊 Metrics for: ${problemName} ${algorithmType ? `(${algorithmType})` : ""}`);
    console.log(`  Recursive calls: ${m.recursiveCalls}`);
    console.log(`  Max depth: ${m.maxDepth}`);
    console.log(`  States explored: ${m.statesExplored}`);
    console.log(`  Time elapsed: ${m.timeElapsed} ms`);
  }
}
