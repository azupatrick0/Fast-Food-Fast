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

// Scroll down
function scrollDown() {
  window.scrollTo({
    top: 660,
    behavior: 'smooth',
  });
}

//re-directs the user to the specified location
function showLocation(link) {
  return location.href = link;
}

// Select modals
var modal = document.querySelector('.modal');
var modal1 = document.querySelector('.modal1');
var modal2 = document.querySelector('.modal2');
var modal3 = document.querySelector('.modal3');
var modal4 = document.querySelector('.modal4');
var modal5 = document.querySelector('.modal5');
var modal6 = document.querySelector('.modal6');

// Represent each button class in use
var objInUse;

// Use to disable button
var btn;

// Show Accept Modal
function showModalAccept(btnInUse) {
  btn = btnInUse; // Store the value of the button in use class
  modal.style.display = 'block';
  objInUse = document.querySelector(btnInUse);
}

// Show Decline Modal
function showModalDecline(btnInUse) {
  btn = btnInUse; // Store the value of the button in use class
  modal1.style.display = 'block';
  objInUse = document.querySelector(btnInUse);
}

// Show Completed Modal
function showModalCompleted(btnInUse) {
  modal2.style.display = 'block';
  objInUse = document.querySelector(btnInUse);
}

// Show Add Modal
function showModalAdd() {
  modal3.style.display = 'block';
}

var trVal; // Used to get the each item value

// Show Edit Modal
function showModalEdit(val) {
  trVal = val;
  modal4.style.display = 'block';
}

function showModalItems() {
  modal5.style.display = 'block';
}

// Edit food item
function editItem() {
  // Item image
  var img = document.createElement('img');
  img.setAttribute('src', 'images/food1.jpg');
  img.classList.add('img');
  // Item values
  var serial = document.querySelector('.eserial').value;
  var item = document.querySelector('.efood-item').value;
  var price = document.querySelector('.eprice').value;
  // Table object
  var secondTable = document.querySelector('.second-table');
  var tableRows = secondTable.rows;
  // Edit item values
  tableRows[trVal].cells[0].innerHTML = serial;
  tableRows[trVal].cells[1].innerHTML = item;
  tableRows[trVal].cells[1].appendChild(img);
  tableRows[trVal].cells[2].innerHTML = price;
  modal4.style.display = 'none';
}

// Add food items
function addItem() {
  // Item image
  var img = document.createElement('img');
  img.setAttribute('src', 'images/food1.jpg');
  img.classList.add('img');
  // New item values
  var serial = document.querySelector('.sn').value;
  var item = document.querySelector('.food-item').value;
  var price = document.querySelector('.price').value;
  var editBtn = document.createElement('button');
  editBtn.classList.add("edit-btn");
  editBtn.innerText = 'Edit';
  var deleteBtn = document.createElement('button');
  deleteBtn.classList.add("reject-btn");
  deleteBtn.innerText = 'Delete';
  // Table object
  var secondTable = document.querySelector('.second-table');
  // Create new table elements
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');
  // Insert values into the table elements
  td1.innerText = serial;
  td2.innerText = item;
  td2.appendChild(img);
  td3.innerText = price;
  td4.appendChild(editBtn);
  td5.appendChild(deleteBtn);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  secondTable.appendChild(tr);
  // Close the modal after insertion
  modal3.style.display = 'none';
}

// Each row in the items table
var getValue; 
// Delete an item
function deleteItem(val) {
  modal6.style.display = 'block';
  getValue = val;
}

// Deletes an item
function deleted() {
  var val = getValue;
  // Table object
  var secondTable = document.querySelector('.second-table');
  var tableRows = secondTable.rows;
  var eachRow = tableRows[val];
  eachRow.style.display = 'none';
  modal6.style.display = 'none';
}

// Accept an order
function accepted() {
  var acceptbtn = objInUse;
  modal.style.display = 'none';
  acceptbtn.innerHTML = 'Accepted';
  acceptbtn.disabled = true;
  // Disable decline button
  var btnClass = '.decline' + btn.toString().slice(7);
  var declinebtn = document.querySelector(btnClass);
  declinebtn.disabled = true;
}

// Decline an order
function declined() {
  var declinebtn = objInUse;
  modal1.style.display = 'none';
  declinebtn.innerHTML = 'Declined';
  declinebtn.disabled = true;
  // Disable Accept button
  var btnClass = '.accept' + btn.toString().slice(8);
  var acceptbtn = document.querySelector(btnClass);
  acceptbtn.disabled = true;
}

// Complete an order
function completed() {
  var completebtn = objInUse;
  modal2.style.display = 'none';
  completebtn.innerHTML = 'Completed';
  completebtn.disabled = true;
}

// Close modal
function closeModal(closeobj) {
  var closeobj = document.querySelector(closeobj);
  closeobj.style.display = 'none';
}

// Hide Tab modal on scroll or click 
var tabModal = document.querySelector('.tab-modal');
var tabModalLink = document.querySelector('.tab-modal-link');
window.addEventListener('scroll', function (event) {
  if (window.scrollY > 1) {
    hamburger.innerHTML = "&#9776";
    tabModal.style.display = 'none'
  }
});
window.addEventListener('click', function (event) {
  if (event.target === tabModal || event.target === tabModalLink) {
    hamburger.innerHTML = "&#9776";
    tabModal.style.display = 'none';
  }
}); 