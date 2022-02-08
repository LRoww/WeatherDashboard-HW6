let searchButton = document.getElementById('submit-button');

let city;
let cityData;
let weatherData;
let forcastData;
let lat;
let lon;

function getCoords(q) {
  //1ebd566a908480e10651ed85015c06af

  requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + q + '&units=metric&cnt=5&appid=1ebd566a908480e10651ed85015c06af';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lon = data.city.coord.lon;
      lat = data.city.coord.lat;
      cityData = data;
      console.log(cityData);
      getWeather();
      // displayForcast();
    });
}

function getWeather() {
  //1ebd566a908480e10651ed85015c06af

  requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=1ebd566a908480e10651ed85015c06af`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      weatherData = data;
      console.log(weatherData);
      displayWeather();
    });
}

// function displayForcast() {
//   //loop over earch car and listed forcast item
// }

function displayWeather() {
  let title = city + " (" + moment().format("D/M/YYYY") + ") ";
  $('#main-title').text(title);

  // let icon = cityData.weather[0].icon;
  $('#main-title').append('<img src ="http://openweathermap.org/img/wn/' + weatherData.current.weather[0].icon + '.png">');

  $('#temp').text("Temp: " + weatherData.current.temp + "\xBAC");
  $('#wind').text("Wind: " + weatherData.current.wind_speed + " MPH");
  $('#humid').text("Humidity: " + weatherData.current.humidity + "%");
  $('#uv').text("UV Index: " + weatherData.current.uvi);
}




function handleSearch(event) {
  event.preventDefault();

  city = document.querySelector('#city').value;
  console.log("City: " + city);
  getCoords(city);
}

// console.log(searchButton);
searchButton.addEventListener('click', handleSearch);
// console.log(document.querySelector('#city'));