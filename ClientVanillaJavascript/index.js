// Get token
const token = window.localStorage.getItem('token');

// Function that verifies if a token is present
const verifyToken = () => {
  try {
    // Decode token => gotten from https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (decoded) {
      window.location = 'https://fast-food-fast.herokuapp.com/dashboard.html';
    }
  } catch (e) {
    // Error, not an encoded token
    return null;
  }
  return null;
};

window.onload = verifyToken();

// Scroll up
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// Re-directs the user to the specified location
const showLocation = (link) => {
  window.location.href = link;
};

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
window.addEventListener('scroll', () => {
  if (window.scrollY > 1) {
    hamburger.innerHTML = '&#9776';
    tabModal.style.display = 'none';
  }
});
window.addEventListener('click', (event) => {
  if (event.target === tabModal || event.target === tabModalLink) {
    hamburger.innerHTML = '&#9776';
    tabModal.style.display = 'none';
  }
});
