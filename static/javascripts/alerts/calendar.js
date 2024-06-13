let monthYearSelected;
let startDateSelected;
let endDateSelected;
let isStartDateSelected;

document.addEventListener('DOMContentLoaded', function () {
    const startContainer = document.querySelector('#startContainer');
    const endContainer = document.querySelector('#endContainer');
    const dycalendar = document.querySelector('#dycalendar');

    startContainer.addEventListener('click', function (event) {
        dycalendar.style.display = 'block';
        isStartDateSelected = true; // Set flag for start date selection
        endContainer.classList.remove('selected'); // Remove selected class from end container
        startContainer.classList.add('selected'); // Add selected class to start container
    });

    endContainer.addEventListener('click', function (event) {
        dycalendar.style.display = 'block';
        isStartDateSelected = false; // Set flag for end date selection
        startContainer.classList.remove('selected'); // Remove selected class from start container
        endContainer.classList.add('selected'); // Add selected class to end container
    });

    dycalendar.addEventListener('click', function (event) {
        if (event.target.tagName === 'TD' && !event.target.classList.contains('disabled')) {
            var selectedDate = event.target.textContent.trim();
            var selectedMonthYear = document.querySelector(".dycalendar-span-month-year").textContent.trim();
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            var selectedDateTime = new Date(selectedMonthYear + " " + selectedDate);

            if (selectedDateTime < yesterday) {
                // If selected date is before yesterday, do nothing
                return;
            }

            if (isStartDateSelected) {
                startDateSelected = selectedDate + " " + selectedMonthYear;
                startContainer.textContent = startDateSelected; // Update UI for start date
            } else {
                endDateSelected = selectedDate + " " + selectedMonthYear;
                endContainer.textContent = endDateSelected; // Update UI for end date
            }
        }
    });

});

dycalendar.draw({
    target: '#dycalendar',
    type: 'month', 
    prevnextbutton: 'show' ,
    highlighttoday: true, 
});

//Time Setting Schedule

let timerRef = document.querySelector('#displayTime');
const hourInput = document.getElementById('hourInput');
const minuteInput = document.getElementById('minuteInput');
const hourInput2 = document.getElementById('hourInput2');
const minuteInput2 = document.getElementById('minuteInput2');
const setAlarm = document.getElementById('set');
const activeAlarms = document.querySelector(".activeAlarms");


let alarmsArray=[];

let initialHour = 0, initialMinute = 0, alarmIndex = 0;

const appendZero = (value) => (value < 10? "0" + value : value);

const searchObject = (parameter, value ) => {
    let alarmObject, 
        objIndex, 
        exists = false;
    alarmsArray.forEach((alarm, index) => {
        if (alarm[parameter] == value){
            exists = true;
            alarmObject = alarm;
            objIndex = index;
            return false;
        } 
    });
    return [exists, alarmObject, objIndex];
};

//display time
function displayTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Add leading zeros if necessary
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;


    alarmsArray.forEach((alarm, index) => {
        if (alarm.isActive) {
          if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
            alert("Schedule Met!");
          }
        }
    });
}

const inputCheck = (inputValue) => {
    inputValue = parseInt(inputValue);
    return inputValue; // No need for appendZero in 24-hour format
};

// Event listeners for hour and minute inputs (no changes needed)
hourInput.addEventListener("input", () => {
    hourInput.value = inputCheck(hourInput.value);
});
minuteInput.addEventListener("input", () => {
    minuteInput.value = inputCheck(minuteInput.value);
});

hourInput2.addEventListener("input", () => {
    hourInput2.value = inputCheck(hourInput2.value);
});
minuteInput2.addEventListener("input", () => {
    minuteInput2.value = inputCheck(minuteInput2.value);
});

// Function to clear inputs
const clearInputs = () => {
    // Clear start date and end date selections
    startDateSelected = null;
    endDateSelected = null;
    startContainer.textContent = "Select Start Date";
    endContainer.textContent = "Select End Date";

    // Clear hour and minute inputs
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
    hourInput2.value = appendZero(initialHour);
    minuteInput2.value = appendZero(initialMinute);
};

function saveScheduleToBackend(scheduleData) {
    fetch('/save_schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scheduleData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Log success message
    })
    .catch(error => {
        console.error('Error:', error); // Log error if any
    });
}

setAlarm.addEventListener("click", () => {
    // Check if there are existing schedules in the database
    fetch('/schedule_count')
    .then(response => response.json())
    .then(data => {
        if (data.count > 0) {
            alert("There is already a set light schedule. Please delete it before setting a new one.");
            return; // Exit the function if there are existing schedules
        }

        // Proceed with setting the alarm if there are no existing schedules
        proceedWithAlarmSetting();
    })
    .catch(error => {
        console.error('Error:', error); // Log error if any
    });
});

function proceedWithAlarmSetting() {
    // Check if both start date and end date are selected
    if (!startDateSelected || !endDateSelected) {
        alert("Fill all the required values");
        return; // Exit the function if either start date or end date is missing
    }

    // Check if time_on and time_off are the same
    if (hourInput.value === hourInput2.value && minuteInput.value === minuteInput2.value) {
        alert("Time On and Time Off cannot be the same");
        return; // Exit the function if time_on and time_off are the same
    }

    const startTempInput = document.getElementById('starttemperatureInput').value;
    const endTempInput = document.getElementById('endtemperatureInput').value;
    const passwordInput = document.getElementById('passwordInput').value;
    const confirmPasswordInput = document.getElementById('confirmpasswordInput').value;

    if (!startTempInput || !endTempInput) {
        alert("Fill in both start temperature and end temperature");
        return; // Exit the function if either start temperature or end temperature is missing
    }

    // Check if passwords match
    if (passwordInput !== confirmPasswordInput) {
        alert("Passwords do not match");
        return; // Exit the function if passwords do not match
    }

    // Validate if end date is earlier than start date
    if (endDateSelected && startDateSelected) {
        let startDate = new Date(startDateSelected);
        let endDate = new Date(endDateSelected);

        if (endDate < startDate) {
            alert("End date cannot be earlier than start date");
            return; // Exit the function if validation fails
        }
    }

    // Constructing alarm data object
    let alarmData = {
        start_date: startDateSelected,
        end_date: endDateSelected,
        time_on: `${hourInput.value}:${minuteInput.value}`,
        time_off: `${hourInput2.value}:${minuteInput2.value}`,
        start_temperature: startTempInput,
        end_temperature: endTempInput,
        password: passwordInput,
        confirm_password: confirmPasswordInput
    };

    // Sending alarm data to backend
    fetch('/save_alarm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alarmData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Log success message from backend
        window.location.reload(); // Reload the page
        alert("Schedule is set"); // Show a popup indicating schedule is set
    })
    .catch(error => {
        console.error('Error:', error); // Log error if any
    });

    // Incrementing alarm index
    alarmIndex += 1;

    // Constructing alarm object
    let alarmObj = {
        id: `${alarmIndex}_${hourInput.value}_${minuteInput.value}_${hourInput2.value}_${minuteInput2.value}`,
        startDateSelected: startDateSelected,
        endDateSelected: endDateSelected,
        monthYearSelected: monthYearSelected,
        alarmHour: hourInput.value,
        alarmMinute: minuteInput.value,
        alarmHour2: hourInput2.value,
        alarmMinute2: minuteInput2.value,
        startTemperature: startTempInput, // Include start temperature
        endTemperature: endTempInput, // Include end temperature
        isActive: false
    };

    // Pushing alarm object to alarms array and creating alarm in UI
    alarmsArray.push(alarmObj);
    createAlarm(alarmObj);

    // Clearing inputs after setting the alarm
    clearInputs();
}


// Clear button click event listener
document.getElementById('clear').addEventListener('click', clearInputs);

//Start Alarm
const startAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      alarmsArray[index].isActive = true;
    }
};
  //Stop alarm
  const stopAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      alarmsArray[index].isActive = false;
      alarmSound.pause();
    }
};

const deleteAlarm = (e) => {
    let searchId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
      alarmsArray.splice(index, 1);
    }
    console.log(searchId);
};

window.onload = () => {
    setInterval(displayTime);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmsArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
    hourInput2.value = appendZero(initialHour);
    minuteInput2.value = appendZero(initialMinute);
};

// JavaScript to show and hide the modal dialog
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("howToUseBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var closeModalBtn = document.getElementById("closeModal");

closeModalBtn.onclick = function() {
    modal.style.display = "none";
}


