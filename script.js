// Fetch tide data from WorldTides API
fetch("https://api.marea.ooo/v1/tides?lat=1.3521&lon=103.8198")  // Singapore coordinates
    .then(response => response.json())
    .then(data => {
        document.getElementById("tide-info").innerText = 
            `Next High Tide: ${data.next_tide.time} | Height: ${data.next_tide.height}m`;
    });

// Fetch weather data from OpenWeatherMap API
fetch("https://api.openweathermap.org/data/2.5/weather?q=Singapore&appid=fc9e1c7e12a9c55818835123c36da39a&units=metric")
    .then(response => response.json())
    .then(data => {
        document.getElementById("weather-info").innerText = 
            `Weather: ${data.weather[0].description}, Temp: ${data.main.temp}°C`;
    });
