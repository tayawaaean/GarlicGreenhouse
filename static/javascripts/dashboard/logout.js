function confirmLogout() {
                // Use the built-in confirm function to show a confirmation dialog
                var confirmLogout = confirm("Are you sure you want to log out?");
                
                // If the user confirms, redirect to the login page
                if (confirmLogout) {
                    window.location.href = "login.html";
                }
            }