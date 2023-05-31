function redirectToHome() {
  window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", (event) => {
  const map = L.map("map").setView([40.84, 25.87], 12);
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  var polygon = L.polygon([
    [40.844, 25.8817],
    [40.85, 25.9],
    [40.861, 25.89],
    [40.863, 25.871],
    [40.847, 25.8507],
    [40.841, 25.87],
  ]).addTo(map);
  L.marker([40.847, 25.8817])
    .addTo(map)
    .bindPopup("Testing map features.<br> This is nice!.")
    .openPopup();
});
