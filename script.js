// Ensure the script runs only after the page loads
document.addEventListener("DOMContentLoaded", function () {
    fetchData(); // Fetch data on page load
});

// Function to fetch both tide and weather data
function fetchData() {
    const tideInfo = document.getElementById("tide-info");
    const weatherInfo = document.getElementById("weather-info");
    const lastUpdated = document.getElementById("last-updated");

    if (!tideInfo || !weatherInfo || !lastUpdated) {
        console.error("One or more elements are missing in the HTML!");
        return;
    }

    lastUpdated.innerText = "Last updated: Fetching...";

    // Fetch Tide Data from Open-Meteo API
    fetch("https://marine-api.open-meteo.com/v1/marine?latitude=1.4381&longitude=103.7864&hourly=sea_level_height_msl&timezone=Asia%2FSingapore")
        .then(response => response.json())
        .then(data => {
            console.log("Tide Data:", data);
            tideInfo.innerText = `Tide Level: ${data.hourly?.sea_level_height_msl?.[0] ?? "N/A"} meters`;
        })
        .catch(error => {
            tideInfo.innerText = "Failed to load tide data.";
            console.error("Error fetching tide data:", error);
        });

    // Fetch Ocean Stats from Open-Meteo (wave height, sea surface temperature)
    fetch("https://marine-api.open-meteo.com/v1/marine?latitude=1.4381&longitude=103.7864&hourly=wave_height,sea_surface_temperature&timezone=Asia/Singapore")
        .then(response => response.json())
        .then(data => {
            console.log("Ocean Data:", data); // Log API response for debugging

            // Check if data exists, else show "N/A"
            const waveHeight = data?.hourly?.wave_height?.[0] ?? "N/A";
            const seaTemp = data?.hourly?.sea_surface_temperature?.[0] ?? "N/A";

            document.getElementById("wave-height").innerText = `Wave Height: ${waveHeight} meters`;
            document.getElementById("sea-temp").innerText = `Sea Temperature: ${seaTemp}°C`;
        })
        .catch(error => {
            document.getElementById("wave-height").innerText = "Failed to load ocean data.";
            console.error("Error fetching ocean data:", error);
        });

    // Fetch Weather Data from Open-Meteo Forecast API (Wind speed, visibility, cloud cover) - using 10m wind speed
    fetch("https://api.open-meteo.com/v1/forecast?latitude=1.4381&longitude=103.7864&hourly=visibility,wind_speed_10m,cloud_cover&timezone=Asia/Singapore")
        .then(response => response.json())
        .then(data => {
            console.log("Weather Data:", data); // Log API response for debugging

            const visibility = data?.hourly?.visibility?.[0] ?? "N/A";
            const windSpeed = data?.hourly?.wind_speed_10m?.[0] ?? "N/A";  // Fetching 10m wind speed
            const cloudCover = data?.hourly?.cloud_cover?.[0] ?? "N/A";

            document.getElementById("visibility").innerText = `Visibility: ${visibility} m`;
            document.getElementById("wind-speed").innerText = `Wind Speed (10m): ${windSpeed} km/h`;  // Displaying 10m wind speed
            document.getElementById("cloud-cover").innerText = `Cloud Cover: ${cloudCover}%`;
        })
        .catch(error => {
            document.getElementById("visibility").innerText = "Failed to load weather data.";
            console.error("Error fetching weather data:", error);
        });

    // Fetch Weather Data (Sunrise, Sunset, Temperature) from OpenWeatherMap
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Woodlands,SG&appid=fc9e1c7e12a9c55818835123c36da39a&units=metric")
        .then(response => response.json())
        .then(data => {
            console.log("Weather Data:", data); // Log API response for debugging

            document.getElementById("sunrise").innerText = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
            document.getElementById("sunset").innerText = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
            weatherInfo.innerText = `Temperature: ${data.main.temp}°C | Humidity: ${data.main.humidity}%`;
        })
        .catch(error => {
            weatherInfo.innerText = "Failed to load weather data.";
            console.error("Error fetching weather data:", error);
        });

    lastUpdated.innerText = `Last updated: ${new Date().toLocaleTimeString()}`;
}
