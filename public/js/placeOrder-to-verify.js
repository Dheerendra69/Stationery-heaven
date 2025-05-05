const addItemButton = document.getElementById('add-item');
const itemsContainer = document.getElementById('items-container');
const orderForm = document.getElementById('order-form');
const totalAmountSpan = document.getElementById('total-amount');

let itemCount = 0; // Keeps track of the number of added items

addItemButton.addEventListener('click', () => {
  itemCount++;

  const item = document.createElement('div');
  item.classList.add('item');

  const itemNameLabel = document.createElement('label');
  itemNameLabel.textContent = 'Item Name:';
  itemNameLabel.htmlFor = `itemName-${itemCount}`;

  const itemNameInput = document.createElement('input');
  itemNameInput.type = 'text';
  itemNameInput.id = `itemName-${itemCount}`;
  itemNameInput.name = `items[${itemCount}].itemName`; // Name for form submission

  const itemQuantityLabel = document.createElement('label');
  itemQuantityLabel.textContent = 'Quantity:';
  itemQuantityLabel.htmlFor = `itemQuantity-${itemCount}`;

  const itemQuantityInput = document.createElement('input');
  itemQuantityInput.type = 'number';
  itemQuantityInput.id = `itemQuantity-${itemCount}`;
  itemQuantityInput.name = `items[${itemCount}].quantity`; // Name for form submission

  const itemPriceLabel = document.createElement('label');
  itemPriceLabel.textContent = 'Price:';
  itemPriceLabel.htmlFor = `itemPrice-${itemCount}`;

  const itemPriceInput = document.createElement('input');
  itemPriceInput.type = 'number';
  itemPriceInput.id = `itemPrice-${itemCount}`;
  itemPriceInput.name = `items[${itemCount}].price`; // Name for form submission

  // Add event listener to update total amount on quantity change
  itemQuantityInput.addEventListener('change', () => {
    updateTotalAmount();
  });

  item.appendChild(itemNameLabel);
  item.appendChild(itemNameInput);
  item.appendChild(itemQuantityLabel);
  item.appendChild(itemQuantityInput);
  item.appendChild(itemPriceLabel);
  item.appendChild(itemPriceInput);

  itemsContainer.appendChild(item);

  updateTotalAmount(); // Update total amount after adding a new item
});

function updateTotalAmount() {
  let total = 0;
  const itemQuantities = document.querySelectorAll('input[type="number"]');
  const itemPrices = document.querySelectorAll('input[type="number"][id^="itemPrice"]'); // Select price inputs only

  for (let i = 0; i < itemQuantities.length; i++) {
    const quantity = parseFloat(itemQuantities[i].value) || 0; // Handle missing values
    const price = parseFloat(itemPrices[i].value) || 0; // Handle missing values
    total += quantity * price;
  }

  totalAmountSpan.textContent = total.toFixed(2); // Display total with 2 decimal places
}

orderForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
});


window.onload = function() {
    // for date
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    const formattedDate = yyyy + '-' + mm + '-' + dd;
    document.getElementById('orderDate').value = formattedDate;

    // Generating the order ID
    const randomOrderId = Math.floor(100000 + Math.random() * 900000);

    const orderId = "ORD" + randomOrderId;

    document.getElementById('orderId').value = orderId;
};


const gmailInput = document.getElementById('gmail');

gmailInput.addEventListener('blur', function() {
    const email = gmailInput.value;
    const gmailPattern = /@gmail\.com$/;

    if (!gmailPattern.test(email)) {
        alert('Please enter a valid Gmail address.');
        gmailInput.focus();
    }
});

updateTotalAmount();
