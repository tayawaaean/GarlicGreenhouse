//  JavaScript code for the combined sales chart
// Example data (replace this with your actual data)
const temperatureData = [20, 22, 25, 18, 24, 26, 23];

// Get the canvas element
const temperatureCanvas = document.getElementById('temperatureChart');

// Initialize the chart
const temperatureChart = new Chart(temperatureCanvas.getContext('2d'), {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: 'Temperature',
      data: temperatureData,
      borderColor: '#1D9A85',
      borderWidth: 2,
      fill: false,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        beginAtZero: true,
      }
    }
  }
});

// Your JavaScript code for the combined calendar
const daysTag = document.querySelector("#days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth - 1; i >= 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday = i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear() ? "active" : "";
    liTag += `<li class="${isToday}" onclick="selectDate(this)">${i}</li>`;
  }

  for (let i = 1; i <= 6 - lastDayofMonth; i++) {
    liTag += `<li class="inactive">${i}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
}

// Function to handle date selection
const selectDate = (selectedDate) => {
  // Remove the "active" class from all dates
  document.querySelectorAll('.days li').forEach((day) => {
    day.classList.remove('active');
  });

  // Add the "active" class to the selected date
  selectedDate.classList.add('active');
}

renderCalendar();

prevNextIcon.forEach(icon => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});
