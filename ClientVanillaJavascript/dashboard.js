// Get token, role and modal
const token = window.localStorage.getItem('token');
const name = window.localStorage.getItem('name');
const email = window.localStorage.getItem('email');
const password = window.localStorage.getItem('password');
const modal = document.querySelector('.modal');

// Function that verifies if a token is present
const verifyToken = () => {
  if (!token || token === '' || token === null || token === undefined) {
    window.location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
  }
  try {
    // Decode token => gotten from https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript
    JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    // Error, not an encoded token
    window.location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
  }
};

// Verify token on window load
window.onload = verifyToken();
// Re-directs the admin to appropriate location
const showAdminLocation = (link) => {
  try {
    // Decode token => gotten from https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (decoded.email !== 'email@email.com') {
      // Not an admin
      modal.style.display = 'block';
    } else {
      window.location.href = link;
    }
  } catch (e) {
    // Error, not an encoded token
    window.location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
  }
};

// Re-directs the user to the specified location
const showLocation = (link) => {
  window.location.href = link;
};

// Close the displayed modal
const closeModal = () => {
  modal.style.display = 'none';
};

// Set user values
const userName = document.querySelector('.dashboardName');
userName.value = '';
userName.value += name;

const userEmail = document.querySelector('.dashboardEmail');
userEmail.value = '';
userEmail.value += email;

const userPassword = document.querySelector('.dashboardPassword');
userPassword.value = '';
userPassword.value += password;


// Hamburger icon
const hamburger = document.querySelector('.hamburger');

// Toggle navbar
const showNavbar = (value) => {
  const navContainer = document.querySelector(value);
  /**
  * Create a toggle
  */
  if (navContainer.style.display === 'inline') {
    hamburger.innerHTML = '&#9776';
    navContainer.style.display = 'none';
  } else {
    navContainer.style.display = 'inline';
    hamburger.innerHTML = '&times';
  }
};


// Hide Tab modal on scroll or click
const tabModal = document.querySelector('.tab-modal');
const tabModalLink = document.querySelector('.tab-modal-link');
window.addEventListener('click', (event) => {
  if (event.target === tabModal || event.target === tabModalLink) {
    hamburger.innerHTML = '&#9776';
    tabModal.style.display = 'none';
  }
});

const logout = () => {
  window.localStorage.clear();
  showLocation('https://fast-food-fast.herokuapp.com/index.html');
};
