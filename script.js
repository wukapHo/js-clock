window.onload = function() {
  const secondHand = document.querySelector('.second-hand');
  const minuteHand = document.querySelector('.minute-hand');
  const hourHand = document.querySelector('.hour-hand');
  const electronicClock = document.querySelector('.electronic-clock');

  const week = {
    '0': 'Sunday',
    '1': 'Monday',
    '2': 'Tuesday',
    '3': 'Wednesday',
    '4': 'Thursday',
    '5': 'Friday',
    '6': 'Saturday',
  }

  const months = {
    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',
  }

  function setDate() {
    const now = new Date();

    let seconds = now.getSeconds().toString();
    const secondDegrees = ((+seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;

    let minutes = now.getMinutes().toString();
    const minuteDegrees = ((+minutes / 60) * 360) + 90;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;

    let hours = now.getHours().toString();
    const hourDegrees = ((+hours + +minutes / 60) / 12 * 360) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const dayOfWeek = now.getDay();

    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    electronicClock.textContent = `${hours}:${minutes}:${seconds} ${week[dayOfWeek]}, ${date} ${months[month]} ${year}`;
    electronicClock.style.color = `#${seconds}${minutes}${hours}`;
  }

  setDate();
  setInterval(setDate, 1000);

  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDesc = document.querySelector('.weather-desc');
  const humidity = document.querySelector('.humidity');
  const wind = document.querySelector('.wind');
  const city = document.querySelector('.city');

  async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=eng&appid=ae93df0e55cfd13743408efb3cda8fac&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherDesc.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}m/s`;
  }

  getWeather();

  city.addEventListener('change', getWeather);
}
