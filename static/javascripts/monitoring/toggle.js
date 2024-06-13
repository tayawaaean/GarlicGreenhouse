function createToggleGroup(containerId, relay_num) {
    let isLightOn = false;
    const container = document.getElementById(containerId);
    const toggleOnButton = container.querySelector('.toggleOn');
    const toggleOffButton = container.querySelector('.toggleOff');

    function updateButtonStyles() {
        toggleOnButton.style.backgroundColor = isLightOn ? '#12612b' : '#fff';
        toggleOnButton.style.color = isLightOn ? '#fff' : '#12612b';
        toggleOffButton.style.backgroundColor = isLightOn ? '#fff' : '#12612b';
        toggleOffButton.style.color = isLightOn ? '#12612b' : '#fff';
    }

    function fetchRelayState() {
        // Fetch initial state from server
        fetch('/get_relay_states')
            .then(response => response.json())
            .then(relayStates => {
                isLightOn = relayStates[relay_num];
                updateButtonStyles();
            })
            .catch(error => console.error('Error fetching relay states:', error))
            .then(() => {
                // After fetching the relay state, update the button styles
                toggleSuccess(isLightOn ? toggleOnButton : toggleOffButton);
            });
    }

    // Call fetchRelayState function to fetch initial state when the page loads
    fetchRelayState();

    function toggleLight() {
        const message = isLightOn ? 'The light is already on. Are you sure you want to turn it off?' : 'The light is currently off. Are you sure you want to turn it on?';
        Confirm.open({
            title: '',
            message: message,
            okText: 'Yes',
            cancelText: 'No',
            onok: () => {
                const url = isLightOn ? `/turn_off/${relay_num}` : `/turn_on/${relay_num}`;
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        console.log(`Successfully turned ${isLightOn ? 'off' : 'on'} relay ${relay_num}`);
                        isLightOn = !isLightOn;
                        updateButtonStyles();
                        toggleSuccess(isLightOn ? toggleOnButton : toggleOffButton);
                    } else {
                        console.error(`Failed to toggle relay ${relay_num}`);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            },
            oncancel: () => {
                console.log(`You pressed no! Light remains ${isLightOn ? 'on' : 'off'}.`);
            }
        });
    }

    function toggleSuccess(clickedButton) {
        toggleOnButton.style.backgroundColor = isLightOn ? '#12612b' : '#fff';
        toggleOnButton.style.color = isLightOn ? '#fff' : '#12612b';
        toggleOffButton.style.backgroundColor = isLightOn ? '#fff' : '#12612b';
        toggleOffButton.style.color = isLightOn ? '#12612b' : '#fff';
    
        clickedButton.style.backgroundColor = '#6abf69';
    
        setTimeout(() => {
            if (clickedButton === toggleOnButton) {
                toggleOnButton.style.backgroundColor = isLightOn ? '#12612b' : '#fff';
            } else if (clickedButton === toggleOffButton) {
                toggleOffButton.style.backgroundColor = isLightOn ? '#fff' : '#12612b';
            }
        }, 1000); // Delay in milliseconds
    }

    toggleOnButton.addEventListener('click', toggleLight);
    toggleOffButton.addEventListener('click', toggleLight);

    updateButtonStyles();
}

createToggleGroup('toggleContainer1', 1);
createToggleGroup('toggleContainer2', 2);
createToggleGroup('toggleContainer3', 3);
createToggleGroup('toggleContainer4', 4);
createToggleGroup('toggleContainer5', 5);
