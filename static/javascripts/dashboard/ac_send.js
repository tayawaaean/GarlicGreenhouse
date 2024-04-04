let currentTemperature = 20;
const temperatureInput = document.getElementById('temperatureInput');

// Set initial temperature value
temperatureInput.value = currentTemperature;

// Update temperature function
function updateTemperature(direction) {
    let confirmationMessage;
    let okText = 'Yes';
    let cancelText = 'No';

    if (direction === 'up' && currentTemperature < 30) {
        confirmationMessage = 'Are you sure you want to increase the temperature?';
    } else if (direction === 'down' && currentTemperature > 17) {
        confirmationMessage = 'Are you sure you want to decrease the temperature?';
    } else if (direction === 'down' && currentTemperature === 17) {
        confirmationMessage = 'The temperature is already at the lowest value.';
        okText = 'Ok';
        cancelText = 'Cancel'; 
    } else if (direction === 'up' && currentTemperature === 30) {
        confirmationMessage = 'The temperature is already at the highest value.';
        okText = 'Ok';
        cancelText = 'Cancel'; 
    }

    if (confirmationMessage) {
        Confirm.open({
            title: '',
            message: confirmationMessage,
            okText: okText,
            cancelText: cancelText,
            onok: () => {
                if (direction === 'up' && currentTemperature < 30) {
                    currentTemperature++;
                } else if (direction === 'down' && currentTemperature > 17) {
                    currentTemperature--;
                }
                temperatureInput.value = currentTemperature;
                console.log('Temperature is now:', currentTemperature);
                sendRequest('set', currentTemperature);
            },
            oncancel: () => {
                console.log('Temperature change cancelled.');
            }
        });
    }
}

// Send HTTP request function
function sendRequest(action, temperature) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/' + action + '?temp=' + temperature, true);
    xhr.send();
}

// Event listeners for temperature buttons
document.getElementById('temperatureUp').addEventListener('click', () => {
    updateTemperature('up');
});

document.getElementById('temperatureDown').addEventListener('click', () => {
    updateTemperature('down');
});

// Initialize currentTemperature display
document.getElementById('currentTemperature').innerText = currentTemperature;