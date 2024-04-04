function setSchedule() {
    var selectedDate = document.getElementById('displayContainer').innerText;
    var selectedRack = document.getElementById('racks').value;
    var hourStart = document.getElementById('hourInput').value;
    var minuteStart = document.getElementById('minuteInput').value;
    var hourEnd = document.getElementById('hourInput2').value;
    var minuteEnd = document.getElementById('minuteInput2').value;
    var growLightStatus = document.getElementById('myToggle').checked ? 'on' : 'off';
    var temperature = document.getElementById('temp').innerText;

    // Convert the start and end times to milliseconds
    var startTime = new Date(selectedDate + ' ' + hourStart + ':' + minuteStart).getTime();
    var endTime = new Date(selectedDate + ' ' + hourEnd + ':' + minuteEnd).getTime();

    // Calculate the duration in milliseconds
    var duration = endTime - startTime;

    // Calculate the time difference between the current time and start time
    var currentTime = new Date().getTime();
    var timeDifference = startTime - currentTime;

    // If the scheduled start time is in the future, schedule the relay turn-on and MongoDB insertion
    if (timeDifference > 0) {
        // Construct the data payload for MongoDB insertion
        var alertData = {
            'rack': selectedRack,
            'time_start': selectedDate + ' ' + hourStart + ':' + minuteStart,
            'time_end': selectedDate + ' ' + hourEnd + ':' + minuteEnd,
            'temperature': temperature,
            'grow_light_status': growLightStatus
        };

        // Send request to Flask app to insert alert data into MongoDB
        fetch('/insert_alert_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alertData),
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                console.log('Alert data inserted into MongoDB successfully');

                // Schedule the relay turn-on after the calculated time difference
                setTimeout(function () {
                    // Send request to Flask app to turn on the relay for the selected rack
                    fetch('/turn_on_relay_by_rack/' + selectedRack)
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                console.log(data.message);

                                // Schedule the toggle after the calculated duration
                                setTimeout(function () {
                                    // Send request to Flask app to turn off the relay for the selected rack
                                    fetch('/turn_off_relay_by_rack/' + selectedRack)
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data.success) {
                                                console.log(data.message);
                                            } else {
                                                console.error(data.message);
                                            }
                                        })
                                        .catch(error => console.error('Error:', error));
                                }, duration);
                            } else {
                                console.error(data.message);
                            }
                        })
                        .catch(error => console.error('Error:', error));
                }, timeDifference);
            } else {
                console.error('Error inserting alert data into MongoDB:', result.error);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        // If the scheduled start time is in the past, log an error
        console.error('Scheduled start time is in the past.');
    }
}
