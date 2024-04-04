document.addEventListener('DOMContentLoaded', function () {
  const intensitySlider = document.getElementById('intensity-slider');
  const setButton = document.getElementById('set-button');
  const currentIntensity = document.getElementById('current-intensity');
  const intensityDisplay_1 = document.querySelector('.intensity-display-1');

  updateintensityDisplay_1();

  intensitySlider.addEventListener('input', function () {
    // Do not update the intensity display when adjusting the slider
  });

  setButton.addEventListener('click', function () {
    const intensityValue = intensitySlider.value;
    updateintensityDisplay_1(intensityValue);
  });

  function updateintensityDisplay_1(intensityValue = intensitySlider.value) {
    currentIntensity.textContent = `${intensityValue}%`;
    intensityDisplay_1.textContent = `${intensityValue}%`;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const intensitySlider = document.getElementById('intensity-slider');
  const setButton = document.getElementById('set-button');
  const currentIntensity = document.getElementById('current-intensity');
  const intensityDisplay_2 = document.querySelector('.intensity-display-2');

  updateintensityDisplay_2();

  intensitySlider.addEventListener('input', function () {
    // Do not update the intensity display when adjusting the slider
  });

  setButton.addEventListener('click', function () {
    const intensityValue = intensitySlider.value;
    updateintensityDisplay_2(intensityValue);
  });

  function updateintensityDisplay_2(intensityValue = intensitySlider.value) {
    currentIntensity.textContent = `${intensityValue}%`;
    intensityDisplay_2.textContent = `${intensityValue}%`;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const intensitySlider = document.getElementById('intensity-slider');
  const setButton = document.getElementById('set-button');
  const currentIntensity = document.getElementById('current-intensity');
  const intensityDisplay_3 = document.querySelector('.intensity-display-3');

  updateintensityDisplay_3();

  intensitySlider.addEventListener('input', function () {
    // Do not update the intensity display when adjusting the slider
  });

  setButton.addEventListener('click', function () {
    const intensityValue = intensitySlider.value;
    updateintensityDisplay_3(intensityValue);
  });

  function updateintensityDisplay_3(intensityValue = intensitySlider.value) {
    currentIntensity.textContent = `${intensityValue}%`;
    intensityDisplay_3.textContent = `${intensityValue}%`;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const intensitySlider = document.getElementById('intensity-slider');
  const setButton = document.getElementById('set-button');
  const currentIntensity = document.getElementById('current-intensity');
  const intensityDisplay_4 = document.querySelector('.intensity-display-4');

  updateintensityDisplay_4();

  intensitySlider.addEventListener('input', function () {
    // Do not update the intensity display when adjusting the slider
  });

  setButton.addEventListener('click', function () {
    const intensityValue = intensitySlider.value;
    updateintensityDisplay_4(intensityValue);
  });

  function updateintensityDisplay_4(intensityValue = intensitySlider.value) {
    currentIntensity.textContent = `${intensityValue}%`;
    intensityDisplay_4.textContent = `${intensityValue}%`;
  }
});