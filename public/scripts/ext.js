// Adding

function addModal() {
  document.querySelector("div.injected-modal").classList.add("is-active");
  document.querySelector("div.injected-modal").classList.remove("out");
  document.body.classList.add("modal-active");
}
// Removing
function removeModal() {
  document.querySelector("div.injected-modal").classList.remove("is-active");
  document.querySelector("div.injected-modal").classList.add("out");
  document.body.classList.remove("modal-active");
}
