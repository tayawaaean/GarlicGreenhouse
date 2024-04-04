function updateSensorData() {
    // Get client's local time
    var clientTime = new Date().toLocaleString();

    // Get current date and time for logging or other use
    var currentDate = new Date().toLocaleDateString();

    // Log the current date and time
    console.log('Current Date:', currentDate);
    console.log('Current Time:', );

    $.ajax({
        url: '/publish_sensor_data',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ client_time: clientTime }),
        success: function(data) {
            // Update the temperature display
            $('#current-temperature').text(data.temperature + ' °C');

            // Update the humidity display
            $('#current-humidity').text(data.humidity + ' %');

            // Update the lumens display
            $('#intensity-display-1').text(data.lumens1 + ' lm');

            $('#intensity-display-2').text(data.lumens2 + ' lm');

            $('#intensity-display-3').text(data.lumens3 + ' lm');
            
            $('#intensity-display-4').text(data.lumens4 + ' lm');

            $('#temperature').text(data.current_temp);

            // Update the server date display
            $('#server-date').text('Server Date: ' + data.currentDate);

            // Update the server time display in 12-hour format
            $('#server-time').text('Server Time: ' + data.currentTime);
        },
        error: function(error) {
            console.error('Error fetching sensor data:', error);
        }
    });
}

// Call the updateSensorData function every 5 seconds (adjust as needed)
setInterval(updateSensorData, 1000);

// You can use the currentDate and currentTime here or in any other part of your code
