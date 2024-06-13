<script src="https://cdn.jsdelivr.net/npm/chart.js"></script> 
var ctx = document.getElementById('humidity-chart').getContext('2d');
        var humidityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Humidity (%)',
                    data: [],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 24, // Display maximum of 24 ticks on x-axis (1 per hour)
                        }
                    },
                    y: {
                        beginAtZero: false
                    }
                },
                plugins: {
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'x',
                        },
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'x',
                        },
                    }
                }
            }
        });
    
        var startDateSelector = flatpickr('#humidity-start-date-selector');
    
        // Set the value of the date selector to today's date
        var today = new Date().toISOString().split('T')[0];
        startDateSelector.setDate(today);
    
        // Trigger chart display function
        fetchRealtimeHumidityData(new Date(today));
    
        startDateSelector.set('onChange', function(selectedDates, dateStr, instance) {
            var selectedDate = new Date(selectedDates[0]);
            var today = new Date();
    
            // Check if the selected date is today's date
            if (selectedDate.toDateString() === today.toDateString()) {
                // Fetch humidity data in real-time
                fetchRealtimeHumidityData(selectedDate);
            } else {
                // Fetch humidity data for the selected date
                fetchHumidityData(selectedDate);
            }
        });
    
        function fetchHumidityData(selectedDate) {
            var startDate = selectedDate.toISOString().split('T')[0];
    
            // Fetch humidity data for the selected date
            fetch('/get_realtime_humidity_data?start_date=' + startDate)
                .then(response => response.json())
                .then(data => {
                    // Clear previous data
                    humidityChart.data.labels = [];
                    humidityChart.data.datasets[0].data = [];
    
                    // Update chart with the received data
                    data.humidity_data.forEach(item => {
                        humidityChart.data.labels.push(item.time);
                        humidityChart.data.datasets[0].data.push(item.humidity);
                    });
    
                    humidityChart.update();
                });
        }
    
        function fetchRealtimeHumidityData(selectedDate) {
            // Fetch real-time humidity data for the selected date
            fetch('/get_realtime_humidity_data?start_date=' + selectedDate.toISOString().split('T')[0])
                .then(response => response.json())
                .then(data => {
                    // Clear previous data
                    humidityChart.data.labels = [];
                    humidityChart.data.datasets[0].data = [];
    
                    // Update chart with the received real-time data
                    data.humidity_data.forEach(item => {
                        humidityChart.data.labels.push(item.time);
                        humidityChart.data.datasets[0].data.push(item.humidity);
                    });
    
                    humidityChart.update();
                });
        }