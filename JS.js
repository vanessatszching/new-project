let now = new Date();

let currentDate = now.getDate();

let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let currentMonth = months[now.getMonth()];

let dateLine = document.querySelector("#newDate");
dateLine.innerHTML = `${currentDate}/${currentMonth}`;

let weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentWeek = weeks[now.getDay()];

let newWeekDay = document.querySelector("#newWeek");
newWeekDay.innerHTML = `${currentWeek}`;

let currentHour = now.getHours();
let currentMin = now.getMinutes();
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}

let newTimer = document.querySelector("#time");
newTimer.innerHTML = `${currentHour}:${currentMin}`;

function convertToCel(event) {
  event.preventDefault();
  let changeChange = document.querySelector("#mainTemp");
  changeChange.innerHTML = 32;
}

function convertToFah(event) {
  event.preventDefault();
  let changeChange = document.querySelector("#mainTemp");
  changeChange.innerHTML = 89.6;
}

let degCel = document.querySelector("#cDeg");
degCel.addEventListener("click", convertToCel);

let degFah = document.querySelector("#dDeg");
degFah.addEventListener("click", convertToFah);

function displayWeatherCondition(response) {
  document.querySelector("#displaycity").innerHTML = response.data.name;
  document.querySelector("#mainTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "451c470249e1c41dd7797fb37a578f84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "451c470249e1c41dd7797fb37a578f84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function askMe(event) {
  event.preventDefault();
  let city = document.querySelector("#searchEngine").value;
  search(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", askMe);

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);
