function toggleRelay(relayNum) {
    var checkbox = document.getElementById('relay-' + relayNum);
    var action = checkbox.checked ? 'turn_on' : 'turn_off';

    // Send request to Flask app to control the relay
    fetch('/' + action + '/' + relayNum)
        .then(response => {
            if (response.ok) {
                // If the relay state is successfully toggled on the server,
                // update the MongoDB collection with the new state
                updateRelayState(relayNum, checkbox.checked);
                console.log('Relay ' + relayNum + ' ' + action + ' successful');
            } else {
                console.error('Failed to ' + action + ' relay ' + relayNum);
                // If the server request fails, revert the checkbox state
                checkbox.checked = !checkbox.checked;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // If there's an error, revert the checkbox state
            checkbox.checked = !checkbox.checked;
        });
}

// Function to update the relay state in MongoDB
function updateRelayState(relayNum, newState) {
    fetch('/update_relay_state/' + relayNum + '/' + newState)
        .then(response => {
            if (!response.ok) {
                console.error('Failed to update relay state in MongoDB');
            }
        })
        .catch(error => {
            console.error('Error updating relay state in MongoDB:', error);
        });
}
