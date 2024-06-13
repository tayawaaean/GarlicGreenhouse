function openEditModal(button) {
    // Get the modal
    var modal = document.getElementById("editModal");

    // Display the modal
    modal.style.display = "block";

    // Get the current row data
    var row = button.parentElement.parentElement;
    var profile = row.children[0].children[0].src;
    var name = row.children[1].textContent;
    var username = row.children[2].textContent;
    var email = row.children[3].textContent;
    var position = row.children[4].textContent;

    // Populate the form with current data
    document.getElementById("profile").value = profile;
    document.getElementById("name").value = name;
    document.getElementById("username").value = username;
    document.getElementById("email").value = email;

    var positionDropdown = document.getElementById("position");
    for (var i = 0; i < positionDropdown.options.length; i++) {
        if (positionDropdown.options[i].value.toLowerCase() === position.toLowerCase()) {
            positionDropdown.selectedIndex = i;
            break;
        }
    }

    // Store the row being edited
    document.getElementById("editForm").dataset.rowIndex = row.rowIndex;

    // Add event listeners to clear the input fields on focus
    document.getElementById("name").addEventListener("focus", clearInput);
    document.getElementById("username").addEventListener("focus", clearInput);
    document.getElementById("email").addEventListener("focus", clearInput);
    document.getElementById("position").addEventListener("focus", clearSelect);
}

function clearInput(event) {
    event.target.value = '';
    // Remove the event listener after clearing the input
    event.target.removeEventListener("focus", clearInput);
}

function clearSelect(event) {
    event.target.selectedIndex = -1;
    // Remove the event listener after clearing the select
    event.target.removeEventListener("focus", clearSelect);
}

function closeEditModal() {
    var modal = document.getElementById("editModal");
    modal.style.display = "none";
}

function saveChanges() {
    var form = document.getElementById("editForm");
    var rowIndex = form.dataset.rowIndex;

    // Get the table and row being edited
    var table = document.querySelector(".table tbody");
    var row = table.rows[rowIndex - 1];

    // Update the row with the new data
    var newProfile = document.getElementById("profile").value;
    var newName = document.getElementById("name").value;
    var newUsername = document.getElementById("username").value;
    var newEmail = document.getElementById("email").value;
    var newPosition = document.getElementById("position").value;

    // Update the row cells with new values
    row.children[0].children[0].src = newProfile;
    row.children[1].textContent = newName;
    row.children[2].textContent = newUsername;
    row.children[3].textContent = newEmail;
    row.children[4].textContent = newPosition;

    // Close the modal
    closeEditModal();
}

function confirmDelete(button) {
    var row = button.parentElement.parentElement;
    var name = row.children[1].textContent;
    var confirmation = confirm("Are you sure you want to delete the user " + name + "?");
    if (confirmation) {
        row.remove();
    }
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    var modal = document.getElementById("editModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
