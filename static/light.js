document.addEventListener('DOMContentLoaded', function () {
  const intensitySlider = document.getElementById('intensity-slider');
  const setButton = document.getElementById('set-button');
  const currentIntensity = document.getElementById('current-intensity');
  const intensityDisplay = document.querySelector('.intensity-display');

  updateIntensityDisplay();

  intensitySlider.addEventListener('input', function () {
    // Do not update the intensity display when adjusting the slider
  });

  setButton.addEventListener('click', function () {
    const intensityValue = intensitySlider.value;
    updateIntensityDisplay(intensityValue);
  });

  function updateIntensityDisplay(intensityValue = intensitySlider.value) {
    currentIntensity.textContent = `${intensityValue}%`;
    intensityDisplay.textContent = `${intensityValue}%`;
  }
});