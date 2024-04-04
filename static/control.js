let temperature = 13;

        function updateTemperature() {
            document.getElementById("current-temperature").innerText = `${temperature} °C`;
            document.getElementById("temperature").innerText = temperature;
        }

        function increaseTemperature() {
            temperature++;
            updateTemperature();
        }

        function decreaseTemperature() {
            temperature--;
            updateTemperature();
        }

        function setTemperature() {
            // You can implement a mechanism to set the temperature, e.g., through a prompt or input field
            let newTemperature = prompt("Enter the desired temperature:");
            if (newTemperature !== null && !isNaN(newTemperature)) {
                temperature = parseInt(newTemperature);
                updateTemperature();
            }
        }

        // Initial update
        updateTemperature();