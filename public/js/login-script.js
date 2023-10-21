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
  
const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/new_user', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);



// const logout = async () => {
//     const response = await fetch('/api/users/logout', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//     });
  
//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert('Failed to log out.');
//     }
//   };
  
//   document.querySelector('#logout').addEventListener('click', logout);
  