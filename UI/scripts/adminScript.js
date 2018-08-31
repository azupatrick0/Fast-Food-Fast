
//Toggle navbar
function showNavbar(value) {
    var navContainer = document.querySelector(value);
    /**
    * Create a toggle
    */
    if (navContainer.style.display === "inline") {
        navContainer.style.display = "none";
    } else {
        navContainer.style.display = "inline";
    }

}

// Scroll down
function scrollDown() {
    window.scrollTo({
        top: 660,
        behavior: "smooth"
    });
}

//re-directs the user to the specified location
function showLocation(link) {
    return location.href = link;
}