function fetchData() {
    // Update timestamp
    const lastUpdated = document.getElementById("last-updated");
    lastUpdated.innerText = "Last updated: Fetching...";

    // Fetch tide data from Open-Meteo API
    fetch("https://marine-api.open-meteo.com/v1/marine?latitude=1.2897&longitude=103.8501&hourly=sea_level_height_msl&timezone=Asia%2FSingapore")
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the full response to check the structure

            if (data && data.hourly && data.hourly.sea_level_height_msl) {
                const tideData = data.hourly.sea_level_height_msl[0];  
                document.getElementById("tide-info").innerText = `Next High Tide: ${tideData} meter(s)`;
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
        })
        .catch(error => {
            document.getElementById("weather-info").innerText = "Error fetching weather data";
            console.error("Error fetching weather data:", error);
        });

    // Update the last updated time
    const now = new Date();
    lastUpdated.innerText = `Last updated: ${now.toLocaleTimeString()}`;
}

// Run fetchData() on page load
fetchData();
