function redirectToHome() {
  window.location.href = "index.html";
}
// Set the target date to count down to
const countdownDate = new Date("September 5, 2023 17:00:00");

// Update the countdown every second
const countdownTimer = setInterval(function () {
  // Get the current date and time
  const now = new Date();
  // Calculate the time remaining
  const timeRemaining = countdownDate.getTime() - now.getTime();
  // Calculate days, hours, minutes, and seconds remaining
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
  const seconds = Math.floor((timeRemaining / 1000) % 60);
  // Display the countdown
  const countdownElement = document.getElementById("countdownTime");
  countdownElement.innerHTML =
    days +
    " days, " +
    hours +
    " hours, " +
    minutes +
    " minutes, " +
    seconds +
    " seconds remaining";
  if (timeRemaining < 0) {
    clearInterval(countdownTimer);
    countdownElement.innerHTML = "Countdown over!";
  }
}, 1000);

////////////////////////////////
//TODO: IMPLEMENT WEATHER API
//"https://www.aerisweather.com/blog/2020/10/21/animate-weather-data-with-leaflet-and-aerisweather/"
//AerisWeather
///////////////////////////////

// window.addEventListener("DOMContentLoaded", (event) => {
//   const map = L.map("map").setView([40.84, 25.87], 5);
//   const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     maxZoom: 19,
//     attribution:
//       '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   }).addTo(map);
//   var polygon = L.polygon([
//     [40.844, 25.8817],
//     [40.85, 25.9],
//     [40.861, 25.89],
//     [40.863, 25.871],
//     [40.847, 25.8507],
//     [40.841, 25.87],
//   ]).addTo(map);
//   L.marker([40.847, 25.8817]).addTo(map);
// });

// let map;

// let facilities = [
//   ["Facility 1", -33.8568, 151.2153],
//   ["Facility 2", -33.8274, 151.1833],
//   ["Facility 3", -34.4141, 150.9012],
//   ["Facility 4", -35.2966, 149.1298],
//   ["Facility 5", -36.2186, 150.1389],
//   ["Facility 6", -37.6976, 148.7205],
//   ["Facility 7", -37.8151, 144.9688],
//   ["Facility 8", -34.5106, 138.3811],
//   ["Facility 9", -31.9589, 115.8582],
//   ["Facility 10", -28.159, 153.503],
//   ["Facility 11", -23.8016, 133.9035],
//   ["Facility 12", -20.815, 144.2252],
// ];
// const frameCount = 10; // total intervals
// const startMinutes = -300; // start time offset relative to now, where negative means past
// const endMinutes = 0;
// const AERIS_ID = "CLIENT_ID";
// const AERIS_KEY = "CLIENT_SECRET";
// const NUM_COLORS = "256"; // set to empty string for true color png
// const layers = ["radar-global"];
// function getTileServer(stepNumber, layers, opacity = 0) {
//   const interval = (endMinutes - startMinutes) / frameCount;
//   const timeOffset = startMinutes + interval * stepNumber;
//   const layerStr = layers.join(",");
//   const url = `https://maps{s}.aerisapi.com/${AERIS_ID}_${AERIS_KEY}/${layerStr}/{z}/{x}/{y}/${timeOffset}min.png${NUM_COLORS}`;
//   return L.tileLayer(url, {
//     subdomains: "1234",
//     attribution: "&copy;AerisWeather",
//     opacity: opacity,
//   });
// }
// window.addEventListener("load", () => {
//   map = L.map("map").setView([-23.8016, 133.9035], 5);
//   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "&copy; OpenStreetMap contributors",
//   }).addTo(map);
//   const frames = [];
//   for (let i = 0; i < frameCount; i += 1) {
//     const opacity = i === 0 ? 1 : 0;
//     frames.push(getTileServer(i, layers, opacity).addTo(map));
//   }
//   for (var i = 0; i < facilities.length; i++) {
//     marker = new L.marker([facilities[i][1], facilities[i][2]])
//       .bindPopup(facilities[i][0])
//       .addTo(map);
//   }
//   const waitTime = 5000;
//   const stepTime = 1000;
//   let currentOffset = 0;
//   let previousOffset = currentOffset;
//   setTimeout(() => {
//     setInterval(() => {
//       previousOffset = currentOffset;
//       currentOffset += 1;
//       if (currentOffset === frames.length - 1) {
//         currentOffset = 0;
//       }
//       frames[previousOffset].setOpacity(0);
//       frames[currentOffset].setOpacity(1);
//     }, stepTime);
//   }, waitTime);
// });
