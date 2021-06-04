"use strict";

// API from openweathermap.org

// create an object to store the function and variables that will be necessary to store the API.

// this API is Current Weather API
let weather = {
  // obtain apiKey from openweathermap.org

  apiKey: "8da6262978b61e4044f6b774ce91da55",

  // The above line of code will show the API data for the current weather in London. London in the URL can be changed to any other city. &units=metric& was also used to obtain data in celsius.
  // this can now be used in a new function to fetch the weather data

  fetchWeather: function (city) {
    fetch(
      // change the URL from London to any city
      // appID is also stored as a different variable so this too can be changed
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  // display the weather on the page, using a function that will take in the data and display the weather
  displayWeather: function (data) {
    // name of city
    // it searches through the data array and looks for name. The name will be taken out of the object and into the variable
    const { name } = data;

    // this time it will search for data.weather object and find description and icon
    // [0] is needed to get the first item of the array
    const { icon, description } = data.weather[0];

    // temperature and humidity
    const { temp, humidity } = data.main;

    // windspeed
    const { speed } = data.wind;

    console.log(name, icon, description, temp, humidity, speed);

    // change the variables each time a different city is entered.

    // innerText to change the name of the city each time.
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(temp) + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";

    // Ensure that the default template for weather info is removed
    document.querySelector(".weather").classList.remove("loading");
    // Change image each time for each city
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// Clicking the search button to give results
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
// Pressing Enter on search bar to give results
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// default information on loading, so that user sees weather information about a certain city already.
// On start, display information for London
weather.fetchWeather("London");
