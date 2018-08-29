// Get form field(s)
var form = document.querySelector(".form");
// Execute a function when the user releases a key on the keyboard
form.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the sign up button element with a click
        document.querySelector(".signin").click();
    }
});
// Redirect user to appropriate page
function redirect(page) {
    var feedback = document.querySelector(".feedback");
    var feedback2 = document.querySelector(".feedback2");
    var userPassword = document.querySelector('.signinPassword').value;
    var userEmail = document.querySelector('.signinEmail').value;
    // userEmail not an email address
    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail))){
        feedback.innerHTML = 'Not a valid email address';
        feedback.style.display = 'block';
    } else if (userPassword == '' || userEmail === '') {
        // User fields empty
        feedback2.innerHTML = 'Input field(s) cannot be empty';
        feedback2.style.display = 'block';
    } else {
        // Appropriate page
        location.href = page;
    }
};