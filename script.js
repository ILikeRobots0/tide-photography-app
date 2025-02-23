// Fetch tide data from Open-Meteo API
fetch("https://api.open-meteo.com/v1/marine?latitude=1.3521&longitude=103.8198&hourly=tide_height")
    .then(response => response.json())
    .then(data => {
        // Check if tide data is available
        if (data && data.hourly && data.hourly.tide_height) {
            const tideData = data.hourly.tide_height[0];  // Get the first tide data
            document.getElementById("tide-info").innerText = 
                `Next High Tide: ${tideData} meters`;
        } else {
            document.getElementById("tide-info").innerText = "Tide data not available";
        }
    })
    .catch(error => {
        document.getElementById("tide-info").innerText = "Error fetching tide data";
        console.error("Error fetching tide data:", error);
    });


// Fetch weather data from OpenWeatherMap API
fetch("https://api.openweathermap.org/data/2.5/weather?q=Singapore&appid=fc9e1c7e12a9c55818835123c36da39a&units=metric")
    .then(response => response.json())
    .then(data => {
        document.getElementById("weather-info").innerText = 
            `Weather: ${data.weather[0].description}, Temp: ${data.main.temp}°C`;
    });
