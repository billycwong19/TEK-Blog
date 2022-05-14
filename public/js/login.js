const loginUser = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#login-username');
    const password = document.querySelector('#login-password');
  
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to login');
    }
};

document.querySelector('#login-form').addEventListener('submit', loginUser);
