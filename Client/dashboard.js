// Get token, role and modal
const token = window.localStorage.getItem('token');
const role = window.localStorage.getItem('role');
const name = window.localStorage.getItem('name');
const email = window.localStorage.getItem('email');
const password = window.localStorage.getItem('password');
const modal = document.querySelector('.modal');

// Function that verifies if a token is present
const verifyToken = () => {
  if (!token) {
    location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
  }
};

// Verify token on window load
window.onload = verifyToken();

// Re-directs the admin to appropriate location
const showAdminLocation = (link) => {
  if (role !== 'admin') {
    modal.style.display = 'block';
  } else {
    location.href = link;
  }
};

// Re-directs the user to the specified location
const showLocation = (link) => {
  location.href = link;
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
