function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Check if email and password are empty
    if (email === '' || password === '') {
        document.getElementById("error-message").innerText = "Email and Password are required.";
        return;
    }

    // Make an AJAX request to the Flask route for login verification
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    // Redirect to the /index route on successful login
                    window.location.href = "/index";
                } else {
                    document.getElementById("error-message").innerText = response.message;
                }
            } else {
                console.error("Login request failed.");
            }
        }
    };

    var data = JSON.stringify({ email: email, password: password });
    xhr.send(data);
}