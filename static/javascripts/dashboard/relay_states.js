async function fetchRelayStates() {
    try {
        const response = await fetch('/get_relay_states');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching relay states:', error);
        return {};
    }
}

// Function to toggle relay and update the state
async function toggleRelay(relayNum) {
    try {
        const checkbox = document.getElementById('relay-' + relayNum);
        const action = checkbox.checked ? 'turn_on' : 'turn_off';

        // Send request to Flask app to control the relay
        const response = await fetch('/' + action + '/' + relayNum);
        if (response.ok) {
            console.log('Relay ' + relayNum + ' ' + action + ' successful');
            
            // Update the relay state on the client side
            const relayStates = await fetchRelayStates();
            if (relayStates[relayNum] !== undefined) {
                checkbox.checked = relayStates[relayNum];
            }
        } else {
            console.error('Failed to ' + action + ' relay ' + relayNum);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Fetch relay states and set initial state on page load
document.addEventListener('DOMContentLoaded', async function () {
    const relayStates = await fetchRelayStates();
    Object.keys(relayStates).forEach(relayNum => {
        const checkbox = document.getElementById('relay-' + relayNum);
        if (checkbox) {
            checkbox.checked = relayStates[relayNum];
        }
    });
});