// Get token, modal and spinner
const token = window.localStorage.getItem('token');
const name = window.localStorage.getItem('name');
const userid = window.localStorage.getItem('id');
const modal = document.querySelector('.modal');
const modal2 = document.querySelector('.modal2');
const spinner = document.querySelector('.spinner');
const orderSpinner = document.querySelector('.orderSpinner');
const feedback = document.querySelector('.feedback');
// Table object
const firstTable = document.querySelector('.first-table');
const secondTable = document.querySelector('.second-table');
const thirdTable = document.querySelector('.third-table');
// Close the displayed modal
const closeModal = (val) => {
  document.querySelector(val).style.display = 'none';
};
// Function that verifies if a token is present
const verifyToken = () => {
  if (!token) {
    location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
  } else {
    // Show spinner
    spinner.style.display = 'block';
    // Fetch available menu from the server
    fetch(`https://fast-food-fast.herokuapp.com/api/v1/menu?token=${token}`)
      .then(res => res.json())
      .then((result) => {
        if (result.status === 'success') {
          // Hide spinner
          spinner.style.display = 'none';
          // Menu found
          console.log(result.data.items);
          const arrayOfFood = result.data.items;
          arrayOfFood.forEach((food) => {
            /*
            ** Add food items
            */
            // Item image
            const img = document.createElement('img');
            img.setAttribute('src', 'images/food1.jpg');
            img.classList.add('img');
            // Add to cart button
            const addBtn = document.createElement('button');
            addBtn.classList.add(`meal-button${food.id}`);
            addBtn.setAttribute('onclick', `addToCart(${food.id})`);
            addBtn.innerText = 'Add to cart';
            // Create new table elements
            const tr = document.createElement('tr');
            tr.classList.add(`tr-meal${food.id}`);
            const td1 = document.createElement('td');
            td1.classList.add(`td1-meal${food.id}`);
            const td2 = document.createElement('td');
            td2.classList.add(`td2-meal${food.id}`);
            const td3 = document.createElement('td');
            td3.classList.add(`td3-meal${food.id}`);
            const td4 = document.createElement('td');
            td4.classList.add(`td4-meal${food.id}`);
            const input = document.createElement('input');
            input.classList.add(`quantity${food.id}`);
            input.setAttribute('placeholder', 'Quantity');
            input.setAttribute('value', '1');
            input.setAttribute('type', 'number');
            input.setAttribute('readonly', '');
            td4.appendChild(input);
            const td5 = document.createElement('td');
            td5.classList.add(`td5-meal${food.id}`);
            // Insert values into the table elements
            td1.appendChild(img);
            td2.innerText = food.meal;
            td3.innerText = `${food.price}`;
            td5.appendChild(addBtn);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            secondTable.appendChild(tr);
          });
        } else if (result.error.message === 'An error occured while retrieving available menu, please try again') {
          // Hide spinner
          spinner.style.display = 'none';
          // Menu not yet found
          modal.style.display = 'block';
        }
      });
  }
};

// Verify token on window load
window.onload = verifyToken();

const cart = [];

// Add to cart function
const addToCart = (val) => {
  const foodId = val;
  // Item image
  const img = document.createElement('img');
  img.setAttribute('src', 'images/food1.jpg');
  img.classList.add('img');
  // Create table elements
  const tr = document.createElement('tr');
  tr.classList.add(`tr-cart${val}`);
  const td1 = document.createElement('td');
  td1.classList.add(`td1-cart${val}`);
  const td2 = document.createElement('td');
  td2.classList.add(`td2-cart${val}`);
  const td3 = document.createElement('td');
  td3.classList.add(`td3-cart${val}`);
  // Insert values into the table elements
  td1.appendChild(img);
  td2.innerText = document.querySelector(`.td2-meal${val}`).innerText;
  td3.innerText = document.querySelector(`.td3-meal${val}`).innerText;
  let quantity = document.querySelector(`.quantity${val}`).value;
  quantity = Number(quantity);
  const td4 = document.createElement('td');
  td4.classList.add(`td4-cart${val}`);
  td4.innerHTML = Number(0);
  td4.innerHTML = +(td4.innerHTML) + quantity;
  const td5 = document.createElement('td');
  td5.classList.add(`td5-cart${val}`);
  const td6 = document.createElement('td');
  td6.classList.add(`td6-cart${val}`);
  const td7 = document.createElement('td');
  td7.classList.add(`td7-cart${val}`);
  // Plus button
  const plusBtn = document.createElement('button');
  plusBtn.classList.add(`plus-button${val}`);
  plusBtn.setAttribute('onclick', `plus(${val})`);
  plusBtn.innerText = '+';
  // Minus button
  const minusBtn = document.createElement('button');
  minusBtn.classList.add(`minus-button${val}`);
  minusBtn.setAttribute('onclick', `minus(${val})`);
  minusBtn.innerText = '-';
  // Delete button
  const delBtn = document.createElement('button');
  delBtn.classList.add(`del-button${val}`);
  delBtn.setAttribute('onclick', `deleteRow(${val})`);
  delBtn.innerText = 'x';
  td5.appendChild(plusBtn);
  td6.appendChild(minusBtn);
  td7.appendChild(delBtn);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tr.appendChild(td7);
  firstTable.appendChild(tr);
  cart.push({
    menuid: foodId,
    userid,
    name,
    quantity: document.querySelector(`.td4-cart${val}`).innerHTML,
    amount: document.querySelector(`.td3-cart${val}`).innerHTML,
    location: document.querySelector('.location').value,
  });
  console.log(cart);
  document.querySelector(`.meal-button${val}`).disabled = true;
};

// Add more items to cart
const plus = (val) => {
  const foodId = val;
  document.querySelector(`.td4-cart${val}`).innerHTML = +(document.querySelector(`.td4-cart${val}`).innerHTML) + 1;
  document.querySelector(`.td3-cart${val}`).innerHTML = +(document.querySelector(`.td3-meal${val}`).innerHTML) *
    document.querySelector(`.td4-cart${val}`).innerHTML;
  //cart[val-1].quantity = document.querySelector(`.td4-cart${val}`).innerHTML;
  //cart[val-1].amount = document.querySelector(`.td3-cart${val}`).innerHTML;
  cart.push({
    menuid: foodId,
    userid,
    name,
    quantity: document.querySelector(`.td4-cart${val}`).innerHTML,
    amount: document.querySelector(`.td3-cart${val}`).innerHTML,
    location: document.querySelector('.location').value,
  });

  // Remove the first duplicate item
  const duplicateItem = cart.find(obj => obj.menuid === val);
  console.log(duplicateItem)
  delete (duplicateItem.menuid);
  delete (duplicateItem.userid);
  delete (duplicateItem.name);
  delete (duplicateItem.quantity);
  delete (duplicateItem.amount);
  delete (duplicateItem.location);
  console.log(cart);
};

// Remove more items from cart
const minus = (val) => {
  const foodId = val;
  document.querySelector(`.td4-cart${val}`).innerHTML -= 1;
  document.querySelector(`.td3-cart${val}`).innerHTML -= +(document.querySelector(`.td3-meal${val}`).innerHTML);
  cart.push({
    menuid: foodId,
    userid,
    name,
    quantity: document.querySelector(`.td4-cart${val}`).innerHTML,
    amount: document.querySelector(`.td3-cart${val}`).innerHTML,
    location: document.querySelector('.location').value,
  });
  // Remove the first duplicate item
  const duplicateItem = cart.find(obj => obj.menuid === val);
  console.log(duplicateItem)
  delete (duplicateItem.menuid);
  delete (duplicateItem.userid);
  delete (duplicateItem.name);
  delete (duplicateItem.quantity);
  delete (duplicateItem.amount);
  delete (duplicateItem.location);
  console.log(cart);
};

// Delete cart row
const deleteRow = (val) => {
  firstTable.removeChild(document.querySelector(`.tr-cart${val}`));
  
  // Remove the first duplicate item
  const duplicateItem = cart.find(obj => obj.menuid === val);
  console.log(duplicateItem)
  delete (duplicateItem.menuid);
  delete (duplicateItem.userid);
  delete (duplicateItem.name);
  delete (duplicateItem.quantity);
  delete (duplicateItem.amount);
  delete (duplicateItem.location);
  console.log(cart);
  document.querySelector(`.meal-button${val}`).removeAttribute('disabled');
  
};

// Order response
const orderResponse = () => {
  // Cart empty
  if (firstTable.rows.length === 0) {
    modal2.style.display = 'block';
  } else {
    document.querySelector('.orderValue').innerHTML = 'Processing';
    orderSpinner.style.display = 'block';
    // loop through cart and post orders to the database
    cart.forEach((order) => {
      if (Object.keys(order).length > 0) {
        fetch(`https://fast-food-fast.herokuapp.com/api/v1/orders?token=${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            menuid: order.menuid,
            userid: order.userid,
            name: order.name,
            quantity: order.quantity,
            amount: order.amount,
            location: order.location,
          }),
        })
          .then(res => res.json())
          .then((result) => {
            if (result.status === 'fail') {
              feedback.innerHTML = 'An error occured while trying to process your order, please try again.';
              feedback.style.display = 'block';
            } else if (result.status === 'success') {
              feedback.innerHTML = 'Your order has been processed, thank you';
              feedback.style.display = 'block';
              document.querySelector('.orderValue').innerHTML = 'Order';
              orderSpinner.style.display = 'none';
            }
          });
      }
    });
  }
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


// Toggle cart
const showCart = (value) => {
  const cartContainer = document.querySelector(value);
  const cartBtn = document.querySelector('.toggle-cart');
  /**
  * Create a toggle
  */
  if (cartContainer.style.display === 'block') {
    cartContainer.style.display = 'none';
    cartBtn.innerHTML = 'Show Cart';
  } else {
    cartContainer.style.display = 'block';
    cartBtn.innerHTML = 'Hide Cart';
  }
};

// Re-directs the user to the specified location
const showLocation = (link) => {
  location.href = link;
};

// Get Date
const deliveryDate = () => {
  let day = new Date().getDate();
  day += 1;
  let month = new Date().getMonth();
  month += 1;
  const year = new Date().getFullYear();
  const date = `${day}/${month}/${year}`;
  return date;
};
document.querySelector('.date').innerHTML = deliveryDate();
