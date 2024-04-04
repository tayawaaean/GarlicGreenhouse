document.addEventListener('DOMContentLoaded', function () {
    // Function to update the message count
    function updateMessageCount() {
        // Send an AJAX request to the Flask route for getting the count of schedules
        fetch('/get_schedule_count')  // Update the route based on your Flask application
            .then(response => response.json())
            .then(data => {
                // Update the message count in the DOM
                const messageCountElement = document.getElementById('message-count');
                if (messageCountElement) {
                    messageCountElement.textContent = data.scheduleCount;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Call the function to update the message count on page load
    updateMessageCount();
});