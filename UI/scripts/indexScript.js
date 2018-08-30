// Scroll down
function scrollDown() {
    window.scrollTo({
        top: 660,
        behavior: "smooth"
    });
}

// Scroll up
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

//re-directs the user to the specified location
function showLocation(link) {
    return location.href = link;
}

//Toggle navbar
function showNavbar(value) {
    var navBtn = document.querySelector(value);
    /**
    * Create a toggle
    */
    if (navBtn.style.display === "inline") {
        navBtn.style.display = "none";
    } else {
        navBtn.style.display = "inline";
    }

}