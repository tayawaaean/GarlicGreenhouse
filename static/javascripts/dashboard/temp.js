    let currentTemperature = 17;

    function decreaseTemperature() {
        currentTemperature--;
        updateTemperatureDisplay();
    }

    function increaseTemperature() {
        currentTemperature++;
        updateTemperatureDisplay();
    }


    function updateTemperatureDisplay() {
        document.getElementById("temperature").textContent = currentTemperature;
    }




    // Initial update of the temperature, humidity, and light intensity display
    updateTemperatureDisplay();
    updateLightIntensity();

    // Add an input event listener to the slider
    document.getElementById("intensity-slider").addEventListener("input", updateLightIntensity);

    