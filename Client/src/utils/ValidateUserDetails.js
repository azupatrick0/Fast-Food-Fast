const ValidateUserDetails = (onHandleSignup) => {
    const feedback = document.querySelector('.feedback');
    const feedback2 = document.querySelector('.feedback2');
    const feedback3 = document.querySelector('.feedback3');
    const userPassword = document.querySelector('.signupPassword').value;
    const userEmail = document.querySelector('.signupEmail').value;
    const userName = document.querySelector('.signupName').value;
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
      // Call Signup function
      onHandleSignup;
      // Show spinner and Loading
      document.querySelector('.spinner').style.display = 'block';
      document.querySelector('.signupText').innerHTML = 'Loading';
    }
}

export default ValidateUserDetails;