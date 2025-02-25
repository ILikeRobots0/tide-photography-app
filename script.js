// Fetch tide (sea level height) data from Open-Meteo API
fetch("https://marine-api.open-meteo.com/v1/marine?latitude=1.2897&longitude=103.8501&hourly=sea_level_height_msl&timezone=Asia%2FSingapore")
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the full response to check the structure

        // Check if tide data is available
        if (data && data.hourly && data.hourly.sea_level_height_msl) {
            const tideData = data.hourly.sea_level_height_msl[0];  // Get the first tide data
            document.getElementById("tide-info").innerText = 
                `Next High Tide: ${tideData} meter(s)`;
            }
        } else {
            document.getElementById("tide-info").innerText = "Tide data is not available right now";
        }
    })
    .catch(error => {
        document.getElementById("tide-info").innerText = "Error while fetching tide data";
        console.error("Error fetching tide data:", error);
    });

// Fetch weather data from OpenWeatherMap API
fetch("https://api.openweathermap.org/data/2.5/weather?q=Singapore&appid=fc9e1c7e12a9c55818835123c36da39a&units=metric")
    .then(response => response.json())
    .then(data => {
        document.getElementById("weather-info").innerText = 
            `Weather: ${data.weather[0].description}, Temp: ${data.main.temp}°C`;
    });
