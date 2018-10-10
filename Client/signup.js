// Function that helps a user register and logs him in to his dashboard
function signUp() {
    const feedback4 = document.querySelector('.feedback3');
    const signupEmail = document.querySelector('.signupEmail').value;
    const signupPassword = document.querySelector('.signupPassword').value;
    const signupName = document.querySelector('.signupName').value;
    const signupRole = document.querySelector('.signupRole').value;

    // Fetch from the server
    fetch('https://fast-food-fast.herokuapp.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        role: signupRole,
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
        } else if (result.error.message === 'An error occured while trying to sign you up, please try again.') {
          // Internal server error
          feedback4.style.display = 'block';
          feedback4.innerHTML = 'An error occured while trying to sign you up, please try again.';
          document.querySelector('.spinner').style.display = 'none';
          document.querySelector('.signupText').innerHTML = 'Sign Up';
        }
      });
  }
  
  // Redirect user to appropriate page
  function redirect() {
    const feedback = document.querySelector('.feedback');
    const feedback2 = document.querySelector('.feedback2');
    const feedback3 = document.querySelector('.feedback3');
    const userPassword = document.querySelector('.signupPassword').value;
    const userEmail = document.querySelector('.signupEmail').value;
    const userName = document.querySelector('.signupName').value;
    const userRole = document.querySelector('.signupRole').value;
    // userEmail not an email address
    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail))) {
      feedback.innerHTML = 'Not a valid email address';
      feedback.style.display = 'block';
    } else if (userPassword === '') {
      // User fields empty
      feedback2.innerHTML = 'Password cannot be empty';
      feedback2.style.display = 'block';
    } else if (userName === '') {
        // User fields empty
        feedback3.innerHTML = 'Name cannot be empty';
        feedback3.style.display = 'block';
    } else {
      // Call login function
      signUp();
      // Show spinner and Loading
      document.querySelector('.spinner').style.display = 'block';
      document.querySelector('.signupText').innerHTML = 'Loading';
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
  