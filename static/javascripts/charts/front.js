document.addEventListener('DOMContentLoaded', function () {
  const modal_container = document.getElementById('modal_container');
  const nextButton = document.getElementById('btn-box');

  // Function to remove the modal after button click
  function removeModal() {
      modal_container.classList.remove('show');
      nextButton.removeEventListener('click', removeModal); // Remove the event listener
  }

  modal_container.classList.add('show');

  // Add event listener to the button
  nextButton.addEventListener('click', removeModal);
});
