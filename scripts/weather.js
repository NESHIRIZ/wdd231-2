(async function() {
  const apiKey = '15e344ae8ac7b1fa17c34f79f0be1f63'; // 🔑 Replace with your OpenWeatherMap API key
  const city = 'Tsumeb';
  const units = 'metric';

  // Select the elements in your HTML
  const iconEl = document.getElementById('weather-icon');
  const tempEl = document.getElementById('weather-temp');
  const descEl = document.getElementById('weather-desc');

  // Fallback function if API fails
  function setFallbackWeather() {
    tempEl.textContent = '--°C';
    descEl.textContent = 'Weather unavailable';
    iconEl.src = 'images/weather-sunny.svg';
    iconEl.alt = 'Sunny weather';
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      setFallbackWeather();
      return;
    }

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].main; // e.g., "Clear", "Clouds"
    const iconCode = data.weather[0].icon;     // e.g., "01d", "02n"

    // Update HTML
    tempEl.textContent = `${temp}°C`;
    descEl.textContent = description;
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.alt = `${description} weather`;
  } catch (error) {
    console.error('Weather API error:', error);
    setFallbackWeather();
  }
})();
