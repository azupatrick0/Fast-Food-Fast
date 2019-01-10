const ValidateUserDetails = (onHandleSignup) => {
    const feedback = document.querySelector('.feedback');
    const feedback2 = document.querySelector('.feedback2');
    const feedback3 = document.querySelector('.feedback3');
    const userPassword = document.querySelector('.signupPassword');
    const userName = document.querySelector('.signupName');
    const userEmail = document.querySelector('.signupEmail');
    // userEmail not an email address
    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value))) {
      feedback.innerHTML = 'Not a valid email address';
      feedback.style.display = 'block';
    } else if (userPassword.value === '') {
      // User fields empty
      feedback2.innerHTML = 'Password cannot be empty';
      feedback2.style.display = 'block';
    } else if (userName.value === '') {
      // User fields empty
      feedback3.innerHTML = 'Name cannot be empty';
      feedback3.style.display = 'block';
    } else {
      // Call Signup function
      onHandleSignup;
    }
}

export default ValidateUserDetails;