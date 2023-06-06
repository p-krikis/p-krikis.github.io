function redirectToHome() {
  window.location.href = "index.html";
}
const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");
const cancelBtn = document.getElementById("cancelBtn");

editBtn.addEventListener("click", function () {
  editBtn.style.display = "none";
  saveBtn.style.display = "flex";
  cancelBtn.style.display = "flex";
});
cancelBtn.addEventListener("click", function () {
  editBtn.style.display = "flex";
  saveBtn.style.display = "none";
  cancelBtn.style.display = "none";
});
window.onload = function () {};
