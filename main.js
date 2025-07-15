
document.getElementById('ticketForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const date = document.getElementById('date').value;

  const tickets = [
    `Потяг №045 ${from} → ${to} – 08:30, місць: 12`,
    `Потяг №721 ${from} → ${to} – 13:45, місць: 8`,
    `Потяг №749 ${from} → ${to} – 18:10, місць: 5`
  ];

  const ticketList = document.getElementById('ticketList');
  ticketList.innerHTML = '';

  tickets.forEach(ticket => {
    const li = document.createElement('li');
    li.textContent = ticket;
    ticketList.appendChild(li);
  });

  document.getElementById('results').classList.remove('hidden');
});
