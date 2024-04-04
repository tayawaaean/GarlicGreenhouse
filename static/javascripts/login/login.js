document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // You can add your login logic here
    // For now, let's just display the entered email and password in the console
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    console.log('Email: ' + email);
    console.log('Password: ' + password);
  });
  
  function togglePasswordVisibility() {
    var passwordInput = document.getElementById('password');
    var showPasswordIcon = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showPasswordIcon.textContent = '👁️';
    } else {
      passwordInput.type = 'password';
      showPasswordIcon.textContent = '👁️';
    }
  
    // Toggle the 'crossed' class to add/remove the line-through effect
    showPasswordIcon.classList.toggle('crossed');
  }
  