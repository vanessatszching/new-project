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

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "6643c7326a4c2a38838264a28531d97e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// displayForecast();


let degCel = document.querySelector("#cDeg");
degCel.addEventListener("click", convertToCel);

let degFah = document.querySelector("#dDeg");
degFah.addEventListener("click", convertToFah);


function displayWeatherCondition(response) {
  console.log(response.data);
   newTemperature =  Math.round(response.data.main.temp); 


  document.querySelector("#displaycity").innerHTML = response.data.name;
  document.querySelector("#mainTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response. data.weather[0].description);
  // searchLocation(response.data.coords)

  getForecast(response.data.coord);
}

function convertToCel(event) {
  event.preventDefault();
  let convertCelButton = document.querySelector("#mainTemp");
  convertCelButton.innerHTML = newTemperature;
}

function convertToFah(event) {
  event.preventDefault();
  let convertFehButton = document.querySelector("#mainTemp");
  let feh=newTemperature*(9/5)+32;
  convertFehButton.innerHTML = feh;
 
}


function search(city) {
  let apiKey = "6643c7326a4c2a38838264a28531d97e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "6643c7326a4c2a38838264a28531d97e";
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


search("Hong Kong");