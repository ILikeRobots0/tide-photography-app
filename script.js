// Ensure the script runs only after the page loads
document.addEventListener("DOMContentLoaded", function () {
    fetchData(); // Fetch data on page load
});

function fetchData() {
    // Get the elements safely
    const tideInfo = document.getElementById("tide-info");
    const weatherInfo = document.getElementById("weather-info");
    const lastUpdated = document.getElementById("last-updated");

    // Check if elements exist before modifying them
    if (!tideInfo || !weatherInfo || !lastUpdated) {
        console.error("One or more elements are missing in the HTML!");
        return; // Stop the function to avoid errors
    }

    // Update timestamp
    lastUpdated.innerText = "Last updated: Fetching...";

    // Fetch tide data from Open-Meteo API
    fetch("https://marine-api.open-meteo.com/v1/marine?latitude=1.2897&longitude=103.8501&hourly=sea_level_height_msl&timezone=Asia%2FSingapore")
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log data to check structure

            if (data && data.hourly && data.hourly.sea_level_height_msl) {
                const tideData = data.hourly.sea_level_height_msl[0];  
                tideInfo.innerText = `Next High Tide: ${tideData} meter(s)`;
            } else {
                tideInfo.innerText = "Tide data is not available right now";
            }
        })
        .catch(error => {
            tideInfo.innerText = "Error while fetching tide data";
            console.error("Error fetching tide data:", error);
        });

    // Fetch weather data from OpenWeatherMap API  (updated to central woodlands because i love woodlands)
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=1.4363&lon=103.7867&appid=fc9e1c7e12a9c55818835123c36da39a&units=metric")
        .then(response => response.json())
        .then(data => {
            weatherInfo.innerText = `Weather: ${data.weather[0].description}, Temp: ${data.main.temp}°C`;
        })
        .catch(error => {
            weatherInfo.innerText = "Error fetching weather data";
            console.error("Error fetching weather data:", error);
        });

    // Update the last updated time
    const now = new Date();
    lastUpdated.innerText = `Last updated: ${now.toLocaleTimeString()}`;
}
