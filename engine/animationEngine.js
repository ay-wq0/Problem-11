export function animate(message) {
  const canvas = document.getElementById("canvas");
  canvas.innerHTML += `<div>${message}</div>`;
}
