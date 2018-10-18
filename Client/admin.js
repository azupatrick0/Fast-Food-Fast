// Get token, id and modals
const token = window.localStorage.getItem('token');
const role = window.localStorage.getItem('role');
// Select modals
const modal = document.querySelector('.modal');
const modalError2 = document.querySelector('.modalError2');
const modalError3 = document.querySelector('.modalError3');
const modalError4 = document.querySelector('.modalError4');
const modalError5 = document.querySelector('.modalError5');
const modalError6 = document.querySelector('.modalError6');
const modalError7 = document.querySelector('.modalError7');
const modalError8 = document.querySelector('.modalError8');
const modalAdd = document.querySelector('.modalAdd');
const modalAddError = document.querySelector('.modalAddError');
const modalDeleted = document.querySelector('.modalDeleted');
const modalNoOrders = document.querySelector('.modalNoOrders');
const modalSpinner = document.querySelector('.modalSpinner');
const modalSpinner2 = document.querySelector('.modalSpinner2');
const modalSpinner3 = document.querySelector('.modalSpinner3');
const modalSearchError = document.querySelector('.modalSearchError');
const modalSearchError2 = document.querySelector('.modalSearchError2');
const modalSearchSpinner = document.querySelector('.modalSearchSpinner');
const modalSearchNotFound = document.querySelector('.modalSearchNotFound');
const modal1 = document.querySelector('.modal1');
const modal2 = document.querySelector('.modal2');
const modal3 = document.querySelector('.modal3');
const modal5 = document.querySelector('.modal5');
const modal6 = document.querySelector('.modal6');
// Select spinner
const spinner2 = document.querySelector('.spinner2');
// Items array
const items = [];
const feedback = document.querySelector('.feedback');

// Function that verifies if a token is present
const verifyToken = () => {
  // No token
  if (!token || token === '' || token === null || token === undefined) {
    window.location.href = 'http://localhost:3000/signin.html';
  }
  /* Decode token => gotten from https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript */
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (decoded.email !== 'email@email.com') {
      // Not an admin
      window.location.href = 'http://localhost:3000/dashboard.html';
    } else {
      // Show spinner
      spinner2.style.display = 'block';
      // Fetch all orders from the server
      fetch(`http://localhost:3000/api/v1/orders?role=${role}&token=${token}`)
        .then(res => res.json())
        .then((result) => {
          if (result.status === 'success') {
            // Hide spinner
            spinner2.style.display = 'none';
            /*
            ** Table header
            */
            const trheading = document.createElement('tr');
            trheading.classList.add('trheading');
            const th1 = document.createElement('th');
            const th2 = document.createElement('th');
            const th3 = document.createElement('th');
            const th4 = document.createElement('th');
            const th5 = document.createElement('th');
            const th6 = document.createElement('th');
            const th7 = document.createElement('th');
            th1.innerText = 'Order Id';
            th2.innerText = 'Name';
            th3.innerText = 'Ordered Items';
            th4.innerText = 'Date';
            th5.innerText = 'Location';
            th6.innerText = 'Status';
            th7.innerText = 'Completed';
            trheading.appendChild(th1);
            trheading.appendChild(th2);
            trheading.appendChild(th3);
            trheading.appendChild(th4);
            trheading.appendChild(th5);
            trheading.appendChild(th6);
            trheading.appendChild(th7);
            document.querySelector('.orderstable').appendChild(trheading);
            // Orders found
            const arrayOfOrders = result.data.orders;
            console.log(arrayOfOrders);
            arrayOfOrders.forEach((orders) => {
              /*
              ** Display Orders table
              */
              // View items button
              const viewItemsBtn = document.createElement('button');
              viewItemsBtn.classList.add('accept-btn');
              viewItemsBtn.setAttribute('onclick', `showModalItems(${orders.id})`);
              items.push({
                id: Number(`${orders.id}`),
                menuid: `${orders.menuid}`,
                quantity: `${orders.quantity}`,
                amount: `${orders.amount}`,
              });
              viewItemsBtn.innerText = 'View Items';
              // Accept button
              const acceptBtn = document.createElement('button');
              acceptBtn.classList.add(`acceptorder-btn${orders.id}`);
              acceptBtn.setAttribute('onclick', `accepted(${orders.id})`);
              acceptBtn.innerText = 'Accept';
              // Decline button
              const declineBtn = document.createElement('button');
              declineBtn.classList.add(`declineorder-btn${orders.id}`);
              declineBtn.classList.add('reject-btn');
              declineBtn.setAttribute('onclick', `declined(${orders.id})`);
              declineBtn.setAttribute('status', `${orders.status}`);
              declineBtn.innerText = 'Decline';
              // Complete button
              const completeBtn = document.createElement('button');
              completeBtn.classList.add(`completeorder-btn${orders.id}`);
              completeBtn.setAttribute('onclick', `completed(${orders.id})`);
              completeBtn.setAttribute('status', `${orders.status}`);
              completeBtn.innerText = 'Complete';
              // Check status first then disable button based on result
              if (orders.status === 'processing') {
                acceptBtn.setAttribute('disabled', '');
                acceptBtn.innerText = 'Accepted';
                declineBtn.setAttribute('disabled', '');
              } else if (orders.status === 'cancelled') {
                acceptBtn.setAttribute('disabled', '');
                declineBtn.setAttribute('disabled', '');
                declineBtn.innerText = 'Declined';
              } else if (orders.status === 'complete') {
                acceptBtn.setAttribute('disabled', '');
                declineBtn.setAttribute('disabled', '');
                completeBtn.setAttribute('disabled', '');
                completeBtn.innerText = 'Completed';
              }
              // Create new table elements
              const tr = document.createElement('tr');
              tr.classList.add(`trorders${orders.id}`);
              const td1 = document.createElement('td');
              const td2 = document.createElement('td');
              const td3 = document.createElement('td');
              const td4 = document.createElement('td');
              const td5 = document.createElement('td');
              const td6 = document.createElement('td');
              const td7 = document.createElement('td');
              // Insert values into the table elements
              td1.innerText = `${orders.id}`;
              td2.innerText = `${orders.name}`;
              td3.appendChild(viewItemsBtn);
              td4.innerText = `${orders.createdat}`;
              td5.innerText = `${orders.location}`;
              td6.appendChild(acceptBtn);
              td6.appendChild(declineBtn);
              td7.appendChild(completeBtn);
              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td3);
              tr.appendChild(td4);
              tr.appendChild(td5);
              tr.appendChild(td6);
              tr.appendChild(td7);
              document.querySelector('.orderstable').appendChild(tr);
            });
          } else if (result.data.message === 'An error occured while retrieving all orders, please try again') {
            // Hide spinner
            spinner2.style.display = 'none';
            // Orders not found, error occured
            modalError2.style.display = 'block';
          } else if (result.data.message === 'No orders found, thank you.') {
            // Hide spinner
            spinner2.style.display = 'none';
            // No orders yet
            modalNoOrders.style.display = 'block';
          } else if (result.data.message === 'Failed to authenticate user token.') {
            // Hide spinner
            spinner2.style.display = 'none';
            // Redirect user to sign in
            window.location.href = 'http://localhost:3000/signin.html';
          }
        });
      // Show spinner
      // spinner.style.display = 'block';
      // Fetch available menu from the server
      fetch(`http://localhost:3000/api/v1/menu?token=${token}`)
        .then(res => res.json())
        .then((result) => {
          if (result.status === 'success') {
            /*
            ** Table header
            */
            const trheading = document.createElement('tr');
            const th1 = document.createElement('th');
            const th2 = document.createElement('th');
            const th3 = document.createElement('th');
            const th4 = document.createElement('th');
            const th5 = document.createElement('th');
            const th6 = document.createElement('th');
            th1.innerText = 'S/N';
            th2.innerText = 'Food Image';
            th3.innerText = 'Food Items';
            th4.innerText = 'Price';
            th5.innerText = 'Edit';
            th6.innerText = 'Delete';
            trheading.appendChild(th1);
            trheading.appendChild(th2);
            trheading.appendChild(th3);
            trheading.appendChild(th4);
            trheading.appendChild(th5);
            trheading.appendChild(th6);
            document.querySelector('.second-table').appendChild(trheading);
            // Menu found
            const arrayOfItems = result.data.items;
            console.log(arrayOfItems);
            arrayOfItems.forEach((item) => {
              /*
              ** Display Menu table
              */
              // Item image
              const img = document.createElement('img');
              img.setAttribute('src', 'images/food1.jpg');
              img.classList.add('img');
              // Edit button
              const editBtn = document.createElement('button');
              editBtn.classList.add(`edititem-btn${item.id}`);
              editBtn.classList.add('edit-btn');
              editBtn.setAttribute('onclick', `editItem(${item.id})`);
              editBtn.innerText = 'Edit';
              // Delete button
              const deleteBtn = document.createElement('button');
              deleteBtn.classList.add(`deleteitem-btn${item.id}`);
              deleteBtn.classList.add('reject-btn');
              deleteBtn.setAttribute('onclick', `deleteItem(${item.id})`);
              deleteBtn.innerText = 'Delete';
              // Create new table elements
              const tr = document.createElement('tr');
              const td1 = document.createElement('td');
              const td2 = document.createElement('td');
              const td3 = document.createElement('td');
              const td4 = document.createElement('td');
              const td5 = document.createElement('td');
              const td6 = document.createElement('td');
              // Insert values into the table elements
              td1.innerText = `${item.id}`;
              td2.appendChild(img);
              td3.classList.add(`tr${item.id}meal`);
              td3.innerText = `${item.meal}`;
              td4.classList.add(`tr${item.id}price`);
              td4.innerText = `${item.price}`;
              td5.appendChild(editBtn);
              td6.appendChild(deleteBtn);
              tr.classList.add(`tr${item.id}`);
              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td3);
              tr.appendChild(td4);
              tr.appendChild(td5);
              tr.appendChild(td6);
              document.querySelector('.second-table').appendChild(tr);
            });
          } else if (result.data.message === 'An error occured while retrieving available menu, please try again') {
            // Error occured
            modalError5.style.display = 'block';
          } else if (result.data.message === 'No food items found in the menu, thank you.') {
            // No menu yet
            modalError4.style.display = 'block';
          } else if (result.data.message === 'Failed to authenticate user token.') {
            // Hide spinner
            spinner2.style.display = 'none';
            // Redirect user to sign in
            window.location.href = 'http://localhost:3000/signin.html';
          }
        });
    }
  } catch (e) {
    // Error, not an encoded token
    window.location.href = 'http://localhost:3000/signin.html';
  }
};

// Verify token on window load
window.onload = verifyToken();

// Close modal
const closeModal = (closeobj) => {
  document.querySelector(closeobj).style.display = 'none';
};

// Items objects
const div1 = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');
const bigdiv = document.createElement('div');
bigdiv.classList.add('bigdiv');
const div4 = document.createElement('div');
const div5 = document.createElement('p');
const div6 = document.createElement('p');
const div7 = document.createElement('p');
const div8 = document.createElement('p');
const bigdiv2 = document.createElement('div');
bigdiv2.classList.add('bigdiv2');

// Modal Button
const modalbtn = document.createElement('button');
modalbtn.classList.add('reject-btn');
modalbtn.setAttribute('onclick', 'closeModal(".modal5")');
modalbtn.innerHTML = 'Ok';

const showModalItems = (val) => {
  // Found items
  const found = items.find(obj => obj.id === val);
  div5.innerHTML = 'Order Id';
  div6.innerHTML = 'Items Id';
  div7.innerHTML = 'Quantity';
  div8.innerHTML = 'Amount';
  bigdiv2.appendChild(div5);
  bigdiv2.appendChild(div6);
  bigdiv2.appendChild(div7);
  bigdiv2.appendChild(div8);
  div1.textContent = found.id;
  div2.textContent = found.menuid;
  div3.textContent = found.quantity;
  div4.textContent = found.amount;
  bigdiv.appendChild(div1);
  bigdiv.appendChild(div2);
  bigdiv.appendChild(div3);
  bigdiv.appendChild(div4);
  modal5.innerHTML = '';
  modal5.appendChild(bigdiv2);
  modal5.appendChild(bigdiv);
  modal5.appendChild(modalbtn);
  modal5.style.display = 'block';
};

// Accept an order
const accepted = (val) => {
  modal.style.display = 'block';
  document.querySelector('.accept-btn1').addEventListener('click', () => {
    modal.style.display = 'none';
    fetch(`http://localhost:3000/api/v1/orders/${val}?role=${role}&token=${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'processing',
      }),
    })
      .then(res => res.json())
      .then((result) => {
        if (result.status === 'success') {
          document.querySelector(`.acceptorder-btn${val}`).innerText = 'Accepted';
          document.querySelector(`.acceptorder-btn${val}`).disabled = true;
          document.querySelector(`.declineorder-btn${val}`).disabled = true;
        } else if (result.status === 'fail') {
          modalError6.style.display = 'block';
        }
      });
  });
};

// Decline an order
const declined = (val) => {
  modal1.style.display = 'block';
  document.querySelector('.accept-btn2').addEventListener('click', () => {
    modal1.style.display = 'none';
    fetch(`http://localhost:3000/api/v1/orders/${val}?role=${role}&&token=${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'cancelled',
      }),
    })
      .then(res => res.json())
      .then((result) => {
        if (result.status === 'success') {
          document.querySelector(`.declineorder-btn${val}`).innerText = 'Declined';
          document.querySelector(`.acceptorder-btn${val}`).disabled = true;
          document.querySelector(`.declineorder-btn${val}`).disabled = true;
        } else if (result.status === 'fail') {
          modalError6.style.display = 'block';
        }
      });
  });
};

// Decline an order
const completed = (val) => {
  modal2.style.display = 'block';
  document.querySelector('.accept-btn3').addEventListener('click', () => {
    modal2.style.display = 'none';
    fetch(`http://localhost:3000/api/v1/orders/${val}?role=${role}&&token=${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'complete',
      }),
    })
      .then(res => res.json())
      .then((result) => {
        if (result.status === 'success') {
          document.querySelector(`.completeorder-btn${val}`).innerText = 'Completed';
          document.querySelector(`.completeorder-btn${val}`).disabled = true;
        } else if (result.status === 'fail') {
          modalError6.style.display = 'block';
        }
      });
  });
};

// Edit an item
const editItem = (val) => {
  // Create a modal
  const modalDiv = document.createElement('div');
  modalDiv.classList.add('modal');
  modalDiv.classList.add(`modall${val}`);
  // Create paragraph
  const paragraph = document.createElement('p');
  paragraph.innerHTML = 'Edit food item';
  // Create inputs
  const input1 = document.createElement('input');
  input1.classList.add(`edit-food-item${val}`);
  input1.setAttribute('type', 'text');
  input1.setAttribute('value', '');
  input1.setAttribute('placeholder', 'Food Item');
  const br = document.createElement('br');
  const input2 = document.createElement('input');
  input2.classList.add(`edit-price${val}`);
  input2.setAttribute('type', 'text');
  input2.setAttribute('value', '');
  input2.setAttribute('placeholder', 'Price');
  // Create accept button
  const acceptButton = document.createElement('button');
  acceptButton.classList.add(`acceptt-btn${val}`);
  acceptButton.classList.add('accept-btn');
  acceptButton.innerText = 'Accept';
  // Create cancel button
  const cancelButton = document.createElement('button');
  cancelButton.classList.add(`rejectt-btn${val}`);
  cancelButton.classList.add('reject-btn');
  cancelButton.innerText = 'Cancel';
  // Append element to body
  modalDiv.appendChild(paragraph);
  modalDiv.appendChild(input1);
  modalDiv.appendChild(br);
  modalDiv.appendChild(input2);
  modalDiv.appendChild(br);
  modalDiv.appendChild(acceptButton);
  modalDiv.appendChild(cancelButton);
  document.querySelector('.edit').appendChild(modalDiv);
  // Get elements
  const meal = document.querySelector(`.tr${val}meal`).innerText;
  const price = document.querySelector(`.tr${val}price`).innerText;
  const editmeal = document.querySelector(`.edit-food-item${val}`);
  const editprice = document.querySelector(`.edit-price${val}`);
  editmeal.value = meal;
  editprice.value = price;
  modalDiv.style.display = 'block';
  document.querySelector(`.rejectt-btn${val}`).addEventListener('click', () => {
    document.querySelector(`.modall${val}`).style.display = 'none';
    document.querySelector('.edit').innerHTML = '';
  });
  document.querySelector(`.acceptt-btn${val}`).addEventListener('click', () => {
    document.querySelector(`.modall${val}`).style.display = 'none';
    modalSpinner.style.display = 'block';
    // Fetch the food item from the menu and do an update
    fetch(`http://localhost:3000/api/v1/menu/${val}?role=${role}&token=${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        meal: document.querySelector(`.edit-food-item${val}`).value,
        price: document.querySelector(`.edit-price${val}`).value,
      }),
    })
      .then(res => res.json())
      .then((result) => {
        if (result.status === 'success') {
          // Fetch available updated menu from the server
          fetch(`http://localhost:3000/api/v1/menu?token=${token}`)
            .then(resUpdated => resUpdated.json())
            .then((resultUpdated) => {
              if (resultUpdated.status === 'success') {
                // Updated menu found
                const found = resultUpdated.data.items.find(obj => obj.id === val);
                document.querySelector(`.tr${val}meal`).innerText = found.meal;
                document.querySelector(`.tr${val}price`).innerText = found.price;
                modalSpinner.style.display = 'none';
                document.querySelector('.edit').innerHTML = '';
              } else if (resultUpdated.data.message === 'An error occured while retrieving available menu, please try again') {
                // Menu not found, error occured
                modalError3.style.display = 'block';
              }
            });
        } else if (result.status === 'fail') {
          modalError7.style.display = 'block';
        }
      });
  });
};

// Delete an item
const deleteItem = (val) => {
  modal6.style.display = 'block';
  document.querySelector('.accept-btn6').addEventListener('click', () => {
    modal6.style.display = 'none';
    modalSpinner2.style.display = 'block';
    fetch(`http://localhost:3000/api/v1/menu/items/${val}?role=${role}&token=${token}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then((result) => {
        if (result.status === 'success') {
          document.querySelector(`.tr${val}`).style.display = 'none';
          modalSpinner2.style.display = 'none';
          // Item deleted successfully
          modalDeleted.style.display = 'block';
        } else if (result.status === 'fail') {
          modalError8.style.display = 'block';
        }
      });
  });
};


// Add food items
const addItem = () => {
  modal3.style.display = 'block';
  document.querySelector('.accept-btn-add').addEventListener('click', () => {
    // New item values
    const meal = document.querySelector('.add-food-item').value;
    const price = document.querySelector('.add-price').value;
    if (meal === '' || meal === null || meal === undefined) {
      feedback.innerHTML = 'Food item cannot be empty';
    } else if (!(Number.isInteger(+price)) || price === '' || price === null || price === undefined) {
      feedback.innerHTML = 'price must be an Integer';
    }
    modal3.style.display = 'none';
    modalSpinner3.style.display = 'block';
    fetch(`http://localhost:3000/api/v1/menu?role=${role}&token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        meal,
        price,
      }),
    })
      .then(res => res.json())
      .then((result) => {
        if (result.status === 'fail') {
          modalAddError.style.display = 'block';
        } else if (result.status === 'success') {
          modalAdd.style.display = 'block';
          window.location.href = 'http://localhost:3000/admin.html';
        }
      });
  });
};

// Get a specific order
const getSpecificOrder = () => {
  let searchId = document.querySelector('.search-history').value;
  searchId = Number(searchId);
  if (!(Number.isInteger(+searchId)) || searchId === '' || searchId === null || searchId === undefined) {
    modalSearchError.style.display = 'block';
  }
  const trhead = document.querySelector('.trheading');
  const trorder = document.querySelector(`.trorders${searchId}`)
  modalSearchSpinner.style.display = 'block';
  fetch(`http://localhost:3000/api/v1/orders/${searchId}?role=${role}&token=${token}`)
    .then(ress => ress.json())
    .then((resultt) => {
      if (resultt.data.message === 'specific order returned, thank you.') {
        // Search successful
        modalSearchSpinner.style.display = 'none';
        document.querySelector('.orderstable').style.display = 'none';
        document.querySelector('.specific-order-table').appendChild(trhead);
        document.querySelector('.specific-order-table').appendChild(trorder);
        document.querySelector('.specific-order-table').style.display = 'block';
      } else if (resultt.data.message === 'An error occured while trying to get the specific order, please try again.') {
        // Error occured
        modalSearchSpinner.style.display = 'none';
        modalSearchError2.style.display = 'block';
      } else if (resultt.data.message === `Sorry, order with id => ${searchId}, not found`) {
        // No order with the id
        modalSearchSpinner.style.display = 'none';
        modalSearchNotFound.style.display = 'block';
      }
    });
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

// Scroll to menu table
const scrollMenu = () => {
  const top = document.querySelector('.orderstable').scrollHeight + 150;
  window.scrollTo({
    top,
    behavior: 'smooth',
  });
};

// Re-directs the user to the specified location
const showLocation = (link) => {
  window.location.href = link;
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

const logout = () => {
  window.localStorage.clear();
  showLocation('http://localhost:3000/index.html');
};
