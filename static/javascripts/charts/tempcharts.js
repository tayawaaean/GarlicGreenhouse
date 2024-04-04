var temperatureData = {
    '2024-03-18': [20, 21, 22, 23, 24, 25, 26],
    '2024-03-19': [22, 23, 24, 25, 26, 27, 28],
    // Add more data for different dates as needed
};

// Get the canvas element
var ctx = document.getElementById('temperature-chart').getContext('2d');

// Create initial chart with default data
var temperatureChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [{
            label: 'Temperature (°C)',
            data: temperatureData['2024-03-18'], // Default data for initial date
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
});

// Initialize Flatpickr for the calendar selector
flatpickr('#calendar-selector', {
    onChange: function(selectedDates, dateStr, instance) {
        // Update chart data based on selected date
        var selectedDate = selectedDates[0].toISOString().split('T')[0];
        temperatureChart.data.datasets[0].data = temperatureData[selectedDate];
        temperatureChart.update();
    }
});