// Select the form within the container
let form = document.querySelector(".container form");

let codeField = form.querySelector(".code-field");
let codeInput = codeField.querySelector(".inv_code");
let textField = form.querySelector(".text-field");
let textInput = textField.querySelector(".name");
let emailField = form.querySelector(".email-field");
let emailInput = emailField.querySelector(".email");
let passField = form.querySelector(".create-password");
let passInput = passField.querySelector(".password");
let cPassField = form.querySelector(".confirm-password");
let cPassInput = cPassField.querySelector(".cPassword");

let inviteCodeField = form.querySelector(".code-field");
let inviteCodeInput = inviteCodeField.querySelector(".inv_code");

function checkInviteCode() {
    // You can update the regex pattern if needed
    const inviteCodePattern = /^[A-Za-z0-9]{1,100}$/;

    // Fetch the invite code dynamically from the Flask app
    fetchInviteCode().then((serverInviteCode) => {
        if (!inviteCodeInput.value.match(inviteCodePattern) || inviteCodeInput.value !== serverInviteCode) {
            return inviteCodeField.classList.add("invalid");
        }
        inviteCodeField.classList.remove("invalid");
    });
}

// Function to fetch the invite code from the Flask app
async function fetchInviteCode() {
    try {
        const response = await fetch("/get_invite_code");
        const data = await response.json();
        return data.invite_code;
    } catch (error) {
        console.error("Error fetching invite code:", error);
        return ""; // Return an empty string or handle the error accordingly
    }
}

function checkText() {
    const textPattern = /^[A-Za-z. ]{1,100}$/;

    if (!textInput.value.match(textPattern)) {
        return textField.classList.add("invalid");
    }
    textField.classList.remove("invalid");
}

function checkEmail() {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(emailPattern)) {
        return emailField.classList.add("invalid");
    }
    emailField.classList.remove("invalid");
}

const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
        const pInput = eyeIcon.parentElement.querySelector("input");

        if (pInput.type === "password") {
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return (pInput.type = "text");
        }
        eyeIcon.classList.replace("bx-show", "bx-hide");
        pInput.type = "password";
    });
});

function confirmPass() {
    if (passInput.value !== cPassInput.value || cPassInput.value === "") {
        return cPassField.classList.add("invalid");
    }
    cPassField.classList.remove("invalid");
}

function validateForm() {
    checkInviteCode();
    checkText();
    checkEmail();
    confirmPass();

    if (
        !inviteCodeField.classList.contains("invalid") &&
        !textField.classList.contains("invalid") &&
        !emailField.classList.contains("invalid") &&
        !passField.classList.contains("invalid") &&
        !cPassField.classList.contains("invalid")
    ) {
        // Form is valid, allow submission
        return true;
    } else {
        // Form is invalid, prevent submission
        return false;
    }
}

form.addEventListener("submit", (e) => {
    if (!validateForm()) {
        e.preventDefault(); // Prevent form submission if validation fails
    }
});