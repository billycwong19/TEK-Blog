const signUpUser = async (event) => {
    event.preventDefault()
    const username = document.querySelector('#username-signup')
    const password = document.querySelector('#username-password-signup')
    const passwordConfirm = document.querySelector('#username-password-confirm')
    if (password.value !== passwordConfirm.value){
        const passIcon = document.querySelector('#passwordIcon').setAttribute('class','fas fa-exclamation-triangle')
        alert('Passwords do not match')
        return;
    }
    const createUser = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    })

    if (createUser.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to Sign Up!');
      }
}

document.querySelector('#sign-up-form').addEventListener('submit', signUpUser)