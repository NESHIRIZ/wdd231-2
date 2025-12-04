/**
 * Handle time-based greetings and current time display
 */

function updateGreeting() {
  const greetingTitle = document.getElementById('greeting-heading');
  const currentTimeEl = document.getElementById('current-time');
  const greetingIcon = document.getElementById('greeting-icon');

  if (!greetingTitle || !currentTimeEl) return;

  const now = new Date();
  const hour = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Update time display
  const timeString = `${day}, ${date} • ${hour.toString().padStart(2, '0')}:${minutes}:${seconds}`;
  currentTimeEl.textContent = timeString;

  // Determine greeting based on time of day
  let greeting = '';
  let icon = '';

  if (hour >= 5 && hour < 12) {
    greeting = 'Good Morning!';
    icon = '🌅';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good Afternoon!';
    icon = '☀️';
  } else if (hour >= 17 && hour < 21) {
    greeting = 'Good Evening!';
    icon = '🌆';
  } else {
    greeting = 'Good Night!';
    icon = '🌙';
  }

  greetingTitle.textContent = greeting;
  
  // Only update icon if it hasn't been set by weather
  if (greetingIcon && greetingIcon.textContent === '🌤️') {
    greetingIcon.textContent = icon;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateGreeting();
  // Update every second
  setInterval(updateGreeting, 1000);
});