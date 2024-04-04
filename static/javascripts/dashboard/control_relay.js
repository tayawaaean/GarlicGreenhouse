function toggleRelay(relayNum) {
    var checkbox = document.getElementById('relay-' + relayNum);
    var action = checkbox.checked ? 'turn_on' : 'turn_off';

    // Send request to Flask app to control the relay
    fetch('/' + action + '/' + relayNum)
        .then(response => {
            if (response.ok) {
                console.log('Relay ' + relayNum + ' ' + action + ' successful');
            } else {
                console.error('Failed to ' + action + ' relay ' + relayNum);
            }
        })
        .catch(error => console.error('Error:', error));
}
