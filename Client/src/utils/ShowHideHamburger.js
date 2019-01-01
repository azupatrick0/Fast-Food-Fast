// Toggle Hamburger Icon
const ShowHideHamburger = (obj) => {
    // Hamburger icon
    const hamburger = document.querySelector('.hamburger');
    const DOMChild = document.querySelector(obj);
    /**
    * Create a toggle
    */
    if (DOMChild.style.display === 'inline') {
        hamburger.innerHTML = '&#9776';
        DOMChild.style.display = 'none';
    } else {
        DOMChild.style.display = 'inline';
        hamburger.innerHTML = '&times';
    }
};

export default ShowHideHamburger;
