// Get token, id and modals
const token = window.localStorage.getItem('token');
const id = window.localStorage.getItem('id');
const modal1 = document.querySelector('.modal1');
const modal2 = document.querySelector('.modal2');
const modal3 = document.querySelector('.modal3');
const spinner = document.querySelector('.spinner');
// Table object
const secondTable = document.querySelector('.second-table');
const items = [];

// Function that verifies if a token is present
const verifyToken = () => {
  if (!token || token === '' || token === null || token === undefined) {
    window.location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
  } else {
    // Show spinner
    spinner.style.display = 'block';
    // Fetch available menu from the server
    fetch(`https://fast-food-fast.herokuapp.com/api/v1/users/${id}/orders?token=${token}`)
      .then(res => res.json())
      .then((result) => {
        if (result.status === 'success') {
          // Hide spinner
          spinner.style.display = 'none';
          let sum = 0;
          /*
          ** Table header
          */
          const trheading = document.createElement('tr');
          const th1 = document.createElement('th');
          const th2 = document.createElement('th');
          const th3 = document.createElement('th');
          const th4 = document.createElement('th');
          const th5 = document.createElement('th');
          th1.innerText = 'S/N';
          th2.innerText = 'Ordered Items';
          th3.innerText = 'Date';
          th4.innerText = 'Location';
          th5.innerText = 'Status';
          trheading.appendChild(th1);
          trheading.appendChild(th2);
          trheading.appendChild(th3);
          trheading.appendChild(th4);
          trheading.appendChild(th5);
          secondTable.appendChild(trheading);

          // History found
          const arrayOfHistory = result.data.history;
          arrayOfHistory.forEach((history) => {
            /*
            ** Display history table
            */
            // Add to cart button
            const viewItemsBtn = document.createElement('button');
            viewItemsBtn.classList.add('accept-btn');
            viewItemsBtn.setAttribute('onclick', `showModalItems(${history.id})`);
            sum += 1;
            items.push({
              id: Number(`${history.id}`),
              menuid: `${history.menuid}`,
              quantity: `${history.quantity}`,
              amount: `${history.amount}`,
            });
            viewItemsBtn.innerText = 'View Items';
            // Create new table elements
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const td5 = document.createElement('td');
            // Insert values into the table elements
            td1.innerText = sum;
            td2.appendChild(viewItemsBtn);
            td3.innerText = `${history.createdat}`;
            td4.innerText = `${history.location}`;
            td5.innerText = `${history.status}`;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            secondTable.appendChild(tr);
          });
        } else if (result.error.message === 'An error occured while retrieving all your orders history, please try again') {
          // Hide spinner
          spinner.style.display = 'none';
          // History not found, error occured
          modal2.style.display = 'block';
        } else if (result.data.message === 'You have no history of ordered food, thank you.') {
          // Hide spinner
          spinner.style.display = 'none';
          // History not yet found, no record
          modal3.style.display = 'block';
        } else if (result.data.message === 'Failed to authenticate user token.') {
          // Hide spinner
          spinner.style.display = 'none';
          // Redirect user to sign in
          window.location.href = 'https://fast-food-fast.herokuapp.com/signin.html';
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
const div5 = document.createElement('p');
const div6 = document.createElement('p');
const div7 = document.createElement('p');
const div8 = document.createElement('p');
const bigdiv2 = document.createElement('div');
bigdiv2.classList.add('bigdiv2');

// Modal Button
let modalbtn = document.createElement('button');
modalbtn.classList.add('reject-btn');
modalbtn.setAttribute('onclick', 'closeModal(".modal1")');
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
  modal1.innerHTML = '';
  modal1.appendChild(bigdiv2);
  modal1.appendChild(bigdiv);
  modal1.appendChild(modalbtn);
  modal1.style.display = 'block';
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

// Re-directs the user to the specified location
const showLocation = (link) => {
  window.location.href = link;
};

const logout = () => {
  window.localStorage.clear();
  showLocation('https://fast-food-fast.herokuapp.com/index.html');
};
