// Get token, id and modals
const token = window.localStorage.getItem('token');
const role = window.localStorage.getItem('role');
// Select modals
const modal = document.querySelector('.modal');
const modalError2 = document.querySelector('.modalError2');
const modalError3 = document.querySelector('.modalError3');
const modalError4 = document.querySelector('.modalError4');
const modalAdd = document.querySelector('.modalAdd');
const modalAddError = document.querySelector('.modalAddError');
const modalDeleted = document.querySelector('.modalDeleted');
const modalNoOrders = document.querySelector('.modalNoOrders');
const modalSpinner = document.querySelector('.modalSpinner');
const modalSpinner2 = document.querySelector('.modalSpinner2');
const modalSpinner3 = document.querySelector('.modalSpinner3');
const modal1 = document.querySelector('.modal1');
const modal2 = document.querySelector('.modal2');
const modal3 = document.querySelector('.modal3');
const modal4 = document.querySelector('.modal4');
const modal5 = document.querySelector('.modal5');
const modal6 = document.querySelector('.modal6');
// Select spinner
const spinner = document.querySelector('.spinner');
// Items array
const items = [];
const feedback = document.querySelector('.feedback');

// Function that verifies if a token is present
const verifyToken = () => {
  if (!token) {
    location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
  } else if (role !== 'admin') {
    location.href = 'https://fast-food-fast.herokuapp.com/dashboard.html';
  } else {
    // Show spinner
    // spinner.style.display = 'block';
    // Fetch all orders from the server
    fetch(`https://fast-food-fast.herokuapp.com/api/v1/orders?role=${role}&token=${token}`)
      .then(res => res.json())
      .then((result) => {
        if (result.status === 'success') {
          // Hide spinner
          // spinner.style.display = 'none';
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
          const th7 = document.createElement('th');
          th1.innerText = 'S/N';
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
            declineBtn.innerText = 'Decline';
            // Complete button
            const completeBtn = document.createElement('button');
            completeBtn.classList.add(`completeorder-btn${orders.id}`);
            completeBtn.setAttribute('onclick', `completed(${orders.id})`);
            completeBtn.innerText = 'Complete';
            // Create new table elements
            const tr = document.createElement('tr');
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
        } else if (result.status === 'fail') {
          // Hide spinner
          // spinner.style.display = 'none';
          // Orders not found, error occured
          modalError2.style.display = 'block';
        } else if (result.data.message === 'No orders found, thank you.') {
          // Hide spinner
          // spinner.style.display = 'none';
          // No orders yet
          modalNoOrders.style.display = 'block';
        }
      });

    // Show spinner
    // spinner.style.display = 'block';
    // Fetch available menu from the server
    fetch(`https://fast-food-fast.herokuapp.com/api/v1/menu?token=${token}`)
      .then(res => res.json())
      .then((result) => {
        if (result.status === 'success') {
          // Hide spinner
          // spinner.style.display = 'none';
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
        } else if (result.error.message === 'An error occured while retrieving available menu, please try again') {
          location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
        } else if (result.data.message === 'No food items found in the menu, thank you.') {
          // Hide spinner
          // spinner.style.display = 'none';
          // No menu yet
          modalError4.style.display = 'block';
        }
      });
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
const div5 = document.createElement('div');
const div6 = document.createElement('div');
const bigdiv2 = document.createElement('div');
bigdiv2.classList.add('bigdiv2');

// View Items Modal Button
const modalbtn = document.createElement('button');
modalbtn.classList.add('reject-btn');
modalbtn.setAttribute('onclick', 'closeModal(".modal5")');
modalbtn.innerHTML = 'Ok';

const showModalItems = (val) => {
  // Found items
  const found = items.find(obj => obj.id === val);
  div4.textContent = 'Items Id';
  div5.textContent = 'Quantity';
  div6.textContent = 'Amount';
  bigdiv2.appendChild(div4);
  bigdiv2.appendChild(div5);
  bigdiv2.appendChild(div6);
  div1.textContent = found.menuid;
  div2.textContent = found.quantity;
  div3.textContent = found.amount;
  bigdiv.appendChild(div1);
  bigdiv.appendChild(div2);
  bigdiv.appendChild(div3);
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
    fetch(`https://fast-food-fast.herokuapp.com/api/v1/orders/${val}?role=${role}&token=${token}`, {
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
          location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
        }
      });
  });
};

// Decline an order
const declined = (val) => {
  modal1.style.display = 'block';
  document.querySelector('.accept-btn2').addEventListener('click', () => {
    modal1.style.display = 'none';
    fetch(`https://fast-food-fast.herokuapp.com/api/v1/orders/${val}?role=${role}&&token=${token}`, {
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
          location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
        }
      });
  });
};

// Decline an order
const completed = (val) => {
  modal2.style.display = 'block';
  document.querySelector('.accept-btn3').addEventListener('click', () => {
    modal2.style.display = 'none';
    fetch(`https://fast-food-fast.herokuapp.com/api/v1/orders/${val}?role=${role}&&token=${token}`, {
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
          location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
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
    fetch(`https://fast-food-fast.herokuapp.com/api/v1/menu/${val}?role=${role}&token=${token}`, {
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
          fetch(`https://fast-food-fast.herokuapp.com/api/v1/menu?token=${token}`)
            .then(resUpdated => resUpdated.json())
            .then((resultUpdated) => {
              if (resultUpdated.status === 'success') {
                // Updated menu found
                const found = resultUpdated.data.items.find(obj => obj.id === val);
                document.querySelector(`.tr${val}meal`).innerText = found.meal;
                document.querySelector(`.tr${val}price`).innerText = found.price;
                modalSpinner.style.display = 'none';
                document.querySelector('.edit').innerHTML = '';
              } else if (resultUpdated.error.message === 'An error occured while retrieving available menu, please try again') {
                // Menu not found, error occured
                modalError3.style.display = 'block';
              }
            });
        } else if (result.status === 'fail') {
          location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
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
    fetch(`https://fast-food-fast.herokuapp.com/api/v1/menu/items/${val}?role=${role}&token=${token}`, {
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
          location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
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
    fetch(`https://fast-food-fast.herokuapp.com/api/v1/menu?role=${role}&token=${token}`, {
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
          location.href = 'https://fast-food-fast.herokuapp.com/admin.html';
        }
      });
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

// Scroll down
const scrollDown = () => {
  window.scrollTo({
    top: 660,
    behavior: 'smooth',
  });
};

// Re-directs the user to the specified location
const showLocation = (link) => {
  location.href = link;
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
