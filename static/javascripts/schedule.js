document.addEventListener("DOMContentLoaded", function () {
    // Fetch schedule data from the server
    fetch('/get_schedule_data')
        .then(response => response.json())
        .then(scheduleData => {
            // Iterate over each schedule entry
            scheduleData.forEach(entry => {
                // Extract relevant data
                const rackNumber = entry.rack;
                const timeStart = entry.time_start;
                const timeEnd = entry.time_end;
                const growLightStatus = entry.grow_light_status;

                // Extract date-related information
                const month = entry.month;
                const day = entry.day;
                const year = entry.year;
                const monthYearSelected = entry.monthYearSelected;

                // Parse the timeStart and timeEnd into hours and minutes
                const [startHour, startMinute] = timeStart.split(':').map(part => parseInt(part.trim()));
                const [endHour, endMinute] = timeEnd.split(':').map(part => parseInt(part.trim()));

                // Get the current date and time
                const now = new Date();

                // Check if the entry date matches the current date
                if (now.getFullYear() === year && now.getMonth() + 1 === month && now.getDate() === day) {
                    // Schedule the turn-on time
                    const turnOnTime = new Date(year, month - 1, day, startHour, startMinute);

                    // Schedule the turn-off time
                    const turnOffTime = new Date(year, month - 1, day, endHour, endMinute);

                    // Check if the turn-on time is in the future
                    if (turnOnTime > now) {
                        // Calculate the time difference for turn-on
                        const turnOnTimeDifference = turnOnTime - now;

                        // Set a timeout to send an HTTP request when the turn-on time arrives
                        setTimeout(() => {
                            // Send HTTP request based on grow_light_status
                            const httpRequest = growLightStatus === 'on' ? `/turn_on/${rackNumber}` : `/turn_off/${rackNumber}`;

                            fetch(httpRequest)
                                .then(response => {
                                    if (!response.ok) {
                                        console.error(`Failed to perform relay action for Rack ${rackNumber}. Status code: ${response.status}`);
                                    }
                                })
                                .catch(error => console.error(`Error: ${error}`));
                        }, turnOnTimeDifference);
                    }

                    // Check if the turn-off time is in the future
                    if (turnOffTime > now) {
                        // Calculate the time difference for turn-off
                        const turnOffTimeDifference = turnOffTime - now;

                        // Set a timeout to send an HTTP request when the turn-off time arrives
                        setTimeout(() => {
                            // Send HTTP request based on grow_light_status
                            const toggleRequest = growLightStatus === 'on' ? `/turn_off/${rackNumber}` : `/turn_on/${rackNumber}`;

                            fetch(toggleRequest)
                                .then(response => {
                                    if (!response.ok) {
                                        console.error(`Failed to perform relay action for Rack ${rackNumber}. Status code: ${response.status}`);
                                    }
                                })
                                .catch(error => console.error(`Error: ${error}`));
                        }, turnOffTimeDifference);
                    }
                }
            });
        })
        .catch(error => console.error(`Error fetching schedule data: ${error}`));
});
