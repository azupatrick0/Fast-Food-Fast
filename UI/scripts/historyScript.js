// Hamburger icon
var hamburger = document.querySelector('.hamburger');

//Toggle navbar
function showNavbar(value) {
    var navContainer = document.querySelector(value);
    /**
    * Create a toggle
    */
    if (navContainer.style.display === "inline") {
        hamburger.innerHTML = "&#9776";
        navContainer.style.display = "none";

    } else {
        navContainer.style.display = "inline";
        hamburger.innerHTML = "&times";
    }

}

// Hide Tab modal on scroll or click 
var tabModal = document.querySelector('.tab-modal');
var tabModalLink = document.querySelector('.tab-modal-link');
window.addEventListener('scroll', function(event) {
    if (window.scrollY > 1) {
        hamburger.innerHTML = "&#9776";
        tabModal.style.display = 'none';
    }
});
window.addEventListener('click', function(event) {
    if (event.target === tabModal || event.target === tabModalLink) {
        hamburger.innerHTML = "&#9776";
        tabModal.style.display = 'none';
    }
});

//re-directs the user to the specified location
function showLocation(link) {
    return location.href = link;
}