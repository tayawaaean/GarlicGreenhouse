// login.js

// Function to handle form submission
function login() {
    // Get email and password from the form
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Send a POST request to the backend with email and password
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => {
        if (response.ok) {
            // Redirect based on user type
            return response.json();
        } else {
            throw new Error('Invalid email or password');
        }
    })
    .then(data => {
        if (data.user_type === 'Admin') {
            window.location.href = '/admin_index';
        } else {
            window.location.href = '/index';
        }
    })
    .catch(error => {
        // Display error message
        document.getElementById('error-message').innerText = error.message;
    });
}
