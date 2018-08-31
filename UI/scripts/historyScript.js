
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