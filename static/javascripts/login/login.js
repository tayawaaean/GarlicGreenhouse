// login.js

// Function to handle form submission
function login() {
  // Get email and password from the form
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Send a POST request to your backend with email and password
  fetch('/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          // Redirect based on user type
          if (data.user_type === 'Admin') {
              window.location.href = '/admin_index';
          } else if (data.user_type === 'User') {
              window.location.href = '/index';
          }
      } else {
          // Display error message if login fails
          document.getElementById('error-message').innerText = data.message;
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
