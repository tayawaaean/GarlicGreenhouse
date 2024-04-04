function searchVideos() {
    const searchInput = document.getElementById('searchInput').value;
    const reminders = document.querySelectorAll('.notification');

    reminders.forEach(reminder => {
        const reminderDate = reminder.dataset.date;
        if (reminderDate === searchInput) {
            reminder.style.display = 'block';
        } else {
            reminder.style.display = 'none';
        }
    });
}
