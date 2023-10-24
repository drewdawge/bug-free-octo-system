const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.href = '/expenses';
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
document.getElementById('signup-btn').addEventListener('click', function () {
  document.getElementById('signup-modal').style.display = 'block';
});

document.getElementsByClassName('close-btn')[0].addEventListener('click', function () {
  document.getElementById('signup-modal').style.display = 'none';
});

window.addEventListener('click', function (event) {
  if (event.target === document.getElementById('signup-modal')) {
    document.getElementById('signup-modal').style.display = 'none';
  }
});

  