// these is the api key for openweathermap
const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/",
};

// set query function for search box
// if enter key is pressed
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(evt.target.value); // call getResults function with search query as an argument
  }
}

// function to get results from api and display results
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}
// function display results is used to display results on the page after fetching the data from the api
function displayResults(weather) {
  // console.log(weather);
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

  const button = document.getElementById("btn-save");
  const displaySection = document.getElementById("display-saved");

  //   function to display saved data from the local url database

  fetch("http://localhost:4000/saved")
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        data.forEach((item) => {
          const listItem = document.createElement("div");
          listItem.classList.add("col");

          const card = document.createElement("div");
          card.classList.add("card");

          const cardHeader = document.createElement("div");
          cardHeader.classList.add("card-header");

          const title = document.createElement("h3");
          title.textContent = item.city;
          // title.textContent = item.country;
          // title.textContent = item.temp;

          cardHeader.appendChild(title);
          card.appendChild(cardHeader);

          listItem.appendChild(card);

          displaySection.appendChild(listItem);
        });
      }
    });

  button.addEventListener("click", () => {
    event.preventDefault();
    const data = {
      city: weather.name,
      country: weather.sys.country,
      temp: weather.main.temp,
      weather: weather.weather[0].main,
      temp_min: weather.main.temp_min,
      temp_max: weather.main.temp_max,
      humidity: weather.main.humidity,
      pressure: weather.main.pressure,
      wind_speed: weather.wind.speed,
      wind_deg: weather.wind.deg,
    };

    fetch("http://localhost:4000/saved", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        displayResults();
      });

    displaySection.innerHTML = "";
  });
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

  let day = days[d.getDay()]; // get day from days array
  let date = d.getDate();
  let month = months[d.getMonth()]; // get month from months array
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`; // return formatted date with day, date, month, and year
}

document.addEventListener("DOMContentLoaded", function () {
  // DOM content loaded event
  const searchbox = document.querySelector(".search-box"); // get searchbox element from index.html
  searchbox.addEventListener("keypress", setQuery); // add event listener to searchbox element that calls setQuery function
});
