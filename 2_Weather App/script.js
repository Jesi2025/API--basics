const apiKey = "f17f20632911ac9d2cb12d24ca3b47d4"; 
const weatherResult = document.getElementById("weatherResult");
const loader = document.getElementById("loader");

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return alert("Please enter a city name");

    weatherResult.innerHTML = "";
    loader.style.display = "block"; 

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${af67f39b
}&units=metric`);

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        weatherResult.innerHTML = `<p style="color:red">${error.message}</p>`;
    } finally {
        loader.style.display = "none"; 
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>Condition: ${weather[0].description}</p>
       
    `;
}
