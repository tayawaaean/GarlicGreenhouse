document.addEventListener('DOMContentLoaded', function () {
  const modal_container = document.getElementById('modal_container');
  const nextButton = document.getElementById('btn-box');

  // Show the modal when the page loads
  modal_container.classList.add('show');

  nextButton.addEventListener('click', () => {
    modal_container.classList.remove('show');
  });
});