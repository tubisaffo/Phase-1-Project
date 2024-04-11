const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;

  let humidity = document.querySelector("#humidity");
  humidity.innerText = `${weather.main.humidity}%`;

  let pressure = document.querySelector("#pressure");
  pressure.innerText = `${weather.main.pressure} hPa`;

  let wind = document.querySelector("#wind");
  wind.innerText = `${weather.wind.speed} m/s, ${weather.wind.deg}°`;

  // let clouds = document.querySelector(".details .clouds span");
  // clouds.innerText = `${weather.clouds.all}%`;

  // let visibility = document.querySelector(".details .visibility span");
  // visibility.innerText = `${weather.visibility} meters`;

  // let sunrise = document.querySelector(".details .sunrise span");
  // let sunriseTime = new Date(weather.sys.sunrise * 1000);
  // sunrise.innerText = sunriseTime.toLocaleTimeString();

  // let sunset = document.querySelector(".details .sunset span");
  // let sunsetTime = new Date(weather.sys.sunset * 1000);
  // sunset.innerText = sunsetTime.toLocaleTimeString();
}

function displayError() {
  let error = document.querySelector(".error");
  error.innerText = "Please enter a valid city name";
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
