export let metrics = {};

export function resetMetrics() {
  metrics = { states: 0, depth: 0 };
  document.getElementById("metrics").textContent = "";
}

export function logMetrics(data) {
  document.getElementById("metrics").textContent =
    JSON.stringify(data, null, 2);
}
