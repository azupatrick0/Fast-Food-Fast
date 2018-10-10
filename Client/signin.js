// Function that helps a user login to his dashboard
function login() {
  const feedback = document.querySelector('.feedback');
  const feedback2 = document.querySelector('.feedback2');
  const signinEmail = document.querySelector('.signinEmail').value;
  const signinPassword = document.querySelector('.signinPassword').value;
  // Fetch from the server
  fetch('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: signinEmail,
      password: signinPassword,
    }),
  })
    .then(res => res.json())
    .then((result) => {
      if (result.status === 'success') {
        // User authenticated
        const {
          message,
          token,
        } = result.data;
        const {
          id,
          name,
          role,
          email,
          password,
        } = result.data.userDetails;
        // Store values locally
        window.localStorage.setItem('message', message);
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('id', id);
        window.localStorage.setItem('name', name);
        window.localStorage.setItem('role', role);
        window.localStorage.setItem('email', email);
        window.localStorage.setItem('password', password);
        // Appropriate page
        location.href = './dashboard.html';
      } else if (result.data.message === 'Authentication failed. User not found') {
        // User not found
        feedback.style.display = 'block';
        feedback.innerHTML = 'Authentication failed. User not found';
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.signinText').innerHTML = 'Sign In';
      } else if (result.data.message === 'Authentication failed. Wrong password') {
        // Password incorrect
        feedback2.style.display = 'block';
        feedback2.innerHTML = 'Authentication failed. Wrong password';
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.signinText').innerHTML = 'Sign In';
      } else if (result.data.message === 'An error occured while trying to sign you in, please try again.') {
        // Internal server error
        feedback3.style.display = 'block';
        feedback3.innerHTML = 'An error occured while trying to sign you in, please try again.';
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('.signinText').innerHTML = 'Sign In';
      }
    });
}

// Redirect user to appropriate page
function redirect() {
  const feedback = document.querySelector('.feedback');
  const feedback2 = document.querySelector('.feedback2');
  const userPassword = document.querySelector('.signinPassword').value;
  const userEmail = document.querySelector('.signinEmail').value;
  // userEmail not an email address
  if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail))) {
    feedback.innerHTML = 'Not a valid email address';
    feedback.style.display = 'block';
  } else if (userPassword === '') {
    // User fields empty
    feedback2.innerHTML = 'Password cannot be empty';
    feedback2.style.display = 'block';
  } else {
    // Call login function
    login();
    // Show spinner and Loading
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.signinText').innerHTML = 'Loading';
  }
}

// Get form field(s)
const form = document.querySelector('.form');
// Execute a function when the user releases a key on the keyboard
form.addEventListener('keyup', (event) => {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the sign up button element with a click
    document.querySelector('.signin').click();
  }
});

// Clear feedback given to the user
function clearFeedback(val) {
  document.querySelector(val).style.display = 'none';
}
