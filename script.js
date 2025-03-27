// Ensure the script runs only after the page loads
document.addEventListener("DOMContentLoaded", function () {
    fetchData(); // Fetch data on page load
});

// Function to fetch both tide and weather data
function fetchData() {
    // Get elements safely
    const tideInfo = document.getElementById("tide-info");
    const weatherInfo = document.getElementById("weather-info");
    const lastUpdated = document.getElementById("last-updated");

    // Check if elements exist before modifying them
    if (!tideInfo || !weatherInfo || !lastUpdated) {
        console.error("One or more elements are missing in the HTML!");
        return; // Stop function to avoid errors
    }

    // Update timestamp
    lastUpdated.innerText = "Last updated: Fetching...";

    // Fetch Tide Data from Open-Meteo API
    fetch("https://marine-api.open-meteo.com/v1/marine?latitude=1.438&longitude=103.7888&hourly=sea_level_height_msl&timezone=Asia%2FSingapore")
        .then(response => response.json())
        .then(data => {
            tideInfo.innerText = `Tide Level: ${data.hourly.sea_level_height_msl[0]} meters`;
        })
        .catch(error => console.error("Error fetching tide data:", error));

    // Fetch Ocean Stats from Open-Meteo
    fetch("https://marine-api.open-meteo.com/v1/marine?latitude=1.4381&longitude=103.7864&hourly=wave_height,water_temperature,visibility,wind_speed,cloud_cover&timezone=Asia/Singapore")
        .then(response => response.json())
        .then(data => {
            document.getElementById("wave-height").innerText = `Wave Height: ${data.hourly.wave_height[0]} meters`;
            document.getElementById("sea-temp").innerText = `Sea Temperature: ${data.hourly.water_temperature[0]}°C`;
            document.getElementById("visibility").innerText = `Visibility: ${data.hourly.visibility[0]} km`;
            document.getElementById("wind-speed").innerText = `Wind Speed: ${data.hourly.wind_speed[0]} km/h`;
            document.getElementById("cloud-cover").innerText = `Cloud Cover: ${data.hourly.cloud_cover[0]}%`;
        })
        .catch(error => console.error("Error fetching ocean data:", error));

    // Fetch Weather Data from OpenWeatherMap
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Woodlands,SG&appid=fc9e1c7e12a9c55818835123c36da39a&units=metric")
        .then(response => response.json())
        .then(data => {
            document.getElementById("sunrise").innerText = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
            document.getElementById("sunset").innerText = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
            weatherInfo.innerText = `Temperature: ${data.main.temp}°C | Humidity: ${data.main.humidity}%`;
        })
        .catch(error => console.error("Error fetching weather data:", error));

    // Update Last Updated Time
    lastUpdated.innerText = `Last updated: ${new Date().toLocaleTimeString()}`;
}
