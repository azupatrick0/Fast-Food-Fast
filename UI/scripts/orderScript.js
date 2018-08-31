// Order response
function orderResponse() {
    var feedback = document.querySelector('.feedback');
    feedback.innerHTML = 'Your order has been processed, thank you';
    feedback.style.display = 'block';
}


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


//Toggle cart
function showCart(value) {
    var cartContainer = document.querySelector(value);
    var cartBtn = document.querySelector('.toggle-cart');
    /**
    * Create a toggle
    */
    if (cartContainer.style.display === "block") {
        cartContainer.style.display = "none";
        cartBtn.innerHTML = "Show Cart";
    } else {
        cartContainer.style.display = "block";
        cartBtn.innerHTML = "Hide Cart";
    }
}