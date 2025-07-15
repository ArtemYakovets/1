const form = document.getElementById('ticketForm');
const ticketList = document.getElementById('ticketList');
const resultsDiv = document.getElementById('results');
const modal = document.getElementById('confirmModal');
const confirmText = document.getElementById('confirmText');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const date = document.getElementById('date').value;
  const ticketClass = document.getElementById('class').value;

  confirmText.textContent = `Підтвердити купівлю квитка ${from} → ${to} на ${date}, клас: ${ticketClass}?`;
  modal.classList.remove('hidden');

  confirmYes.onclick = function () {
    const tickets = [
      `Потяг №045 ${from} → ${to} – 08:30, місць: 12, клас: ${ticketClass}`,
      `Потяг №721 ${from} → ${to} – 13:45, місць: 8, клас: ${ticketClass}`,
      `Потяг №749 ${from} → ${to} – 18:10, місць: 5, клас: ${ticketClass}`
    ];

    ticketList.innerHTML = '';
    tickets.forEach(ticket => {
      const li = document.createElement('li');
      li.textContent = ticket;
      ticketList.appendChild(li);
    });

    resultsDiv.classList.remove('hidden');
    modal.classList.add('hidden');

    fetchWeather(from); // завантажити погоду
  };

  confirmNo.onclick = function () {
    modal.classList.add('hidden');
  };
});

// Вкладки з fade-in
document.querySelectorAll('.nav-tabs li').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active', 'fade-in');
    });
    document.querySelectorAll('.nav-tabs li').forEach(li => li.classList.remove('active'));

    tab.classList.add('active');
    const selected = document.getElementById(tab.dataset.tab);
    selected.classList.add('active', 'fade-in');
  });
});

// Погода (OpenWeatherMap)
function fetchWeather(city) {
  const apiKey = 'YOUR_API_KEY'; // ВСТАВ СВІЙ API КЛЮЧ
  const weatherBox = document.getElementById('weather');
  weatherBox.innerHTML = 'Завантаження погоди...';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ua`)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const description = data.weather[0].description;
      weatherBox.innerHTML = `🌤️ Погода в ${city}: ${temp}°C, ${description}`;
    })
    .catch(() => {
      weatherBox.innerHTML = 'Не вдалося отримати погоду.';
    });
}
