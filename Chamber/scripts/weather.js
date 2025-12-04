/**
 * Fetch weather data from Open-Meteo API (free, no API key required)
 * Location: Tsumeb, Namibia (coordinates: -19.2505, 17.7241)
 */

async function fetchWeather() {
  const weatherWidget = document.getElementById('weather-widget');
  
  if (!weatherWidget) return;

  try {
    // Using Open-Meteo API (free, no authentication required)
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-19.2505&longitude=17.7241&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&timezone=Africa/Windhoek'
    );

    if (!response.ok) throw new Error('Weather API error');

    const data = await response.json();
    const current = data.current;

    // Weather code to emoji mapping
    const weatherEmojis = {
      0: '☀️', // Clear sky
      1: '🌤️', // Mainly clear
      2: '⛅', // Partly cloudy
      3: '☁️', // Overcast
      45: '🌫️', // Fog
      48: '🌫️', // Foggy
      51: '🌧️', // Light drizzle
      53: '🌧️', // Moderate drizzle
      55: '🌧️', // Dense drizzle
      61: '🌧️', // Slight rain
      63: '🌧️', // Moderate rain
      65: '⛈️', // Heavy rain
      71: '🌨️', // Slight snow
      73: '🌨️', // Moderate snow
      75: '🌨️', // Heavy snow
      77: '🌨️', // Snow grains
      80: '🌧️', // Slight rain showers
      81: '🌧️', // Moderate rain showers
      82: '⛈️', // Violent rain showers
      85: '🌨️', // Slight snow showers
      86: '🌨️', // Heavy snow showers
      95: '⛈️', // Thunderstorm
      96: '⛈️', // Thunderstorm with hail
      99: '⛈️', // Thunderstorm with hail
    };

    const weatherDescription = {
      0: 'Clear Sky',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Foggy',
      51: 'Light Drizzle',
      53: 'Drizzle',
      55: 'Dense Drizzle',
      61: 'Slight Rain',
      63: 'Moderate Rain',
      65: 'Heavy Rain',
      71: 'Slight Snow',
      73: 'Moderate Snow',
      75: 'Heavy Snow',
      80: 'Rain Showers',
      81: 'Rain Showers',
      82: 'Violent Rain',
      95: 'Thunderstorm',
      96: 'Thunderstorm',
      99: 'Thunderstorm',
    };

    const emoji = weatherEmojis[current.weather_code] || '🌤️';
    const description = weatherDescription[current.weather_code] || 'Unknown';

    weatherWidget.innerHTML = `
      <div class="weather-info">
        <span class="weather-icon">${emoji}</span>
        <div class="weather-temp">${Math.round(current.temperature_2m)}°C</div>
        <div class="weather-desc">${description}</div>
        <div class="weather-details">
          <div class="weather-detail-item">
            <span>Humidity</span>
            <strong>${current.relative_humidity_2m}%</strong>
          </div>
          <div class="weather-detail-item">
            <span>Wind</span>
            <strong>${Math.round(current.wind_speed_10m)} km/h</strong>
          </div>
        </div>
      </div>
    `;

    // Update greeting icon based on weather
    updateGreetingIcon(current.weather_code);

  } catch (error) {
    console.error('Error fetching weather:', error);
    weatherWidget.innerHTML = `
      <div class="weather-info">
        <span class="weather-icon">🌐</span>
        <div class="weather-temp">--°C</div>
        <div class="weather-desc">Weather unavailable</div>
      </div>
    `;
  }
}

function updateGreetingIcon(weatherCode) {
  const greetingIcon = document.getElementById('greeting-icon');
  if (!greetingIcon) return;

  const weatherEmojis = {
    0: '☀️', // Clear
    1: '🌤️', // Mainly clear
    2: '⛅', // Partly cloudy
    3: '☁️', // Overcast
    45: '🌫️', // Fog
    48: '🌫️', // Foggy
    51: '🌧️', // Drizzle
    53: '🌧️', // Drizzle
    55: '🌧️', // Drizzle
    61: '🌧️', // Rain
    63: '🌧️', // Rain
    65: '⛈️', // Heavy rain
    71: '🌨️', // Snow
    73: '🌨️', // Snow
    75: '🌨️', // Snow
    80: '🌧️', // Showers
    81: '🌧️', // Showers
    82: '⛈️', // Violent
    95: '⛈️', // Thunderstorm
    96: '⛈️', // Thunderstorm
    99: '⛈️', // Thunderstorm
  };

  const emoji = weatherEmojis[weatherCode] || '🌤️';
  greetingIcon.textContent = emoji;
}

// Fetch weather on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  // Refresh weather every 10 minutes
  setInterval(fetchWeather, 600000);
});