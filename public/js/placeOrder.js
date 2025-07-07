document
  .getElementById("order-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
    fetch("/saveOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: document.getElementById("orderId").value,
        customerName: document.getElementById("customerName").value,
        orderDate: document.getElementById("orderDate").value,
        gmail: document.getElementById("gmail").value,
        items: getItemsData(),
        shop: document.getElementById("shop").value,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Order placed successfully");
        } else {
          console.error("Failed to place order");
        }
      })
      .then(() => {
        window.alert("Order placed successfully");
        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

function getItemsData() {
  const itemsData = [];
  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    const itemName = item.querySelector("select").value;
    const itemQuantity = parseInt(
      item.querySelector('input[type="number"]').value
    );
    itemsData.push({ itemName, quantity: itemQuantity });
  });

  return itemsData;
}

function generateRandomOrderId() {
  return Math.floor(1000 + Math.random() * 9000);
}
function setOrderId() {
  const orderIdInput = document.getElementById("orderId");
  if (orderIdInput.value.trim() === "") {
    const randomOrderId = generateRandomOrderId();
    orderIdInput.value = "ORD" + randomOrderId;
  }
}

window.addEventListener("load", setOrderId);

const addItemButton = document.getElementById("add-item");
const itemsContainer = document.getElementById("items-container");
const orderForm = document.getElementById("order-form");
const totalAmountSpan = document.getElementById("total-amount");

const itemPrices = {
  Printouts: 2,
  Pens: 10,
  Dusters: 15,
  Markers: 20,
  Notebooks: 30,
  Diaries: 50,
};

let itemCount = 0;

addItemButton.addEventListener("click", () => {
  itemCount++;

  const item = document.createElement("div");
  item.classList.add("item");

  const itemNameLabel = document.createElement("label");
  itemNameLabel.textContent = "Item:";
  itemNameLabel.hbsFor = `itemName-${itemCount}`;

  const itemNameSelect = document.createElement("select");
  itemNameSelect.id = `itemName-${itemCount}`;
  itemNameSelect.name = `items[${itemCount}].itemName`; // Name for form submission

  // Populate dropdown with items and set prices
  for (const itemName in itemPrices) {
    const option = document.createElement("option");
    option.value = itemName;
    option.textContent = itemName;
    itemNameSelect.appendChild(option);
  }

  const itemQuantityLabel = document.createElement("label");
  itemQuantityLabel.textContent = "Quantity:";
  itemQuantityLabel.hbsFor = `itemQuantity-${itemCount}`;

  const itemQuantityInput = document.createElement("input");
  itemQuantityInput.type = "number";
  itemQuantityInput.id = `itemQuantity-${itemCount}`;
  itemQuantityInput.name = `items[${itemCount}].quantity`; // Name for form submission

  // Add event listener to update total amount on quantity change
  itemQuantityInput.addEventListener("change", () => {
    updateTotalAmount();
  });

  item.appendChild(itemNameLabel);
  item.appendChild(itemNameSelect);
  item.appendChild(itemQuantityLabel);
  item.appendChild(itemQuantityInput);

  itemsContainer.appendChild(item);

  updateTotalAmount(); // Update total amount after adding a new item
});

function updateTotalAmount() {
  let total = 0;
  const itemQuantities = document.querySelectorAll('input[type="number"]');
  const itemNameSelects = document.querySelectorAll("select");

  for (let i = 0; i < itemQuantities.length; i++) {
    const itemName = itemNameSelects[i].value;
    const quantity = parseFloat(itemQuantities[i].value) || 0; // Handle missing values
    const price = itemPrices[itemName] || 0; // Get price from itemPrices object
    total += quantity * price;
  }

  totalAmountSpan.textContent = total.toFixed(2); // Display total with 2 decimal places
}

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Rest of the code remains the same

window.onload = function () {
  // for date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();

  const formattedDate = yyyy + "-" + mm + "-" + dd;
  document.getElementById("orderDate").value = formattedDate;

  // Generating the order ID
  const randomOrderId = Math.floor(100000 + Math.random() * 900000);

  const orderId = "ORD" + randomOrderId;

  document.getElementById("orderId").value = orderId;
};

const gmailInput = document.getElementById("gmail");

gmailInput.addEventListener("blur", function () {
  const email = gmailInput.value;
  const gmailPattern = /@gmail\.com$/;

  if (!gmailPattern.test(email)) {
    alert("Please enter a valid Gmail address.");
    gmailInput.focus();
  }
});

updateTotalAmount();
