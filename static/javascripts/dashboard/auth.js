// auth.js

// Function to check if the user is logged in
function checkLoggedIn() {
    // Make an AJAX request to a Flask endpoint that checks if the user is logged in
    $.ajax({
        url: '/check_logged_in',
        type: 'GET',
        success: function (response) {
            if (!response.logged_in) {
                // If the user is not logged in, redirect to the login page
                window.location.href = '/login';
            }
        },
        error: function (error) {
            console.error('Error checking login status:', error);
        }
    });
}

// Call the function on page load
$(document).ready(function () {
    checkLoggedIn();
});
