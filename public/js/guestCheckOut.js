document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("delivery-date").setAttribute("min", today);
});

document.getElementById("add-item-btn").addEventListener("click", function () {
  const itemsList = document.getElementById("items-list");

  const newItemRow = document.createElement("div");
  newItemRow.className = "placeorder-items-container item-row";
  newItemRow.setAttribute("data-item-index", itemIndex);

  newItemRow.innerHTML = `
    <div class="placeorder-item">
      <label for="item-name-${itemIndex}">Item Name</label>
      <input type="text" id="item-name-${itemIndex}" class="item-name" placeholder="Enter item name" required />
    </div>
    <div class="placeorder-item">
      <label for="quantity-${itemIndex}">Quantity</label>
      <input type="number" id="quantity-${itemIndex}" class="item-quantity" min="1" value="1" required />
    </div>
    <div class="placeorder-item-actions">
      <button type="button" class="remove-item-btn" title="Remove Item">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;

  itemsList.appendChild(newItemRow);
  itemIndex++;

  attachItemEventListeners(newItemRow);
  updateSummary();
});

function attachItemEventListeners(itemRow) {
  const removeBtn = itemRow.querySelector(".remove-item-btn");
  const quantityInput = itemRow.querySelector(".item-quantity");

  removeBtn.addEventListener("click", function () {
    removeItem(itemRow);
  });

  quantityInput.addEventListener("input", function () {
    updateSummary();
  });
}

function removeItem(itemRow) {
  const itemsList = document.getElementById("items-list");
  const allItems = itemsList.querySelectorAll(".item-row");

  if (allItems.length <= 1) {
    alert("You must have at least one item in your order.");
    return;
  }

  itemRow.remove();
  updateSummary();
}

function updateSummary() {
  const itemRows = document.querySelectorAll(".item-row");
  let totalItems = itemRows.length;
  let totalQuantity = 0;

  itemRows.forEach((row) => {
    const quantityInput = row.querySelector(".item-quantity");
    const quantity = parseInt(quantityInput.value) || 0;
    totalQuantity += quantity;
  });

  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("total-quantity").textContent = totalQuantity;
}

document.addEventListener("DOMContentLoaded", function () {
  const initialItem = document.querySelector(".item-row");
  if (initialItem) {
    attachItemEventListeners(initialItem);
  }
});

function getItemsData() {
  const itemsData = [];
  const itemRows = document.querySelectorAll(".item-row");

  itemRows.forEach((row) => {
    const itemName = row.querySelector(".item-name").value.trim();
    const itemQuantity = parseInt(row.querySelector(".item-quantity").value);

    if (itemName && itemQuantity > 0) {
      itemsData.push({
        itemName: itemName,
        quantity: itemQuantity,
      });
    }
  });

  return itemsData;
}

document
  .getElementById("placeorder-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const items = getItemsData();

    if (items.length === 0) {
      alert("Please add at least one item with a valid name and quantity.");
      return;
    }

    const orderData = {
      customerName: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(),
      deliveryDate: document.getElementById("delivery-date").value,
      shop: document.getElementById("shop").value.trim(),
      paymentMethod: document.getElementById("payment-method").value,
      items: items,
      orderDate: new Date().toISOString(),
    };

    fetch("/save-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to place order");
        }
      })
      .then((data) => {
        alert(
          `Order placed successfully! Your Order ID is: ${data?.data?.orderId}`
        );

        document.getElementById("placeorder-form").reset();

        const itemsList = document.getElementById("items-list");
        itemsList.innerHTML = `
      <div class="placeorder-items-container item-row" data-item-index="0">
        <div class="placeorder-item">
          <label for="item-name-0">Item Name</label>
          <input type="text" id="item-name-0" class="item-name" placeholder="Enter item name" required />
        </div>
        <div class="placeorder-item">
          <label for="quantity-0">Quantity</label>
          <input type="number" id="quantity-0" class="item-quantity" min="1" value="1" required />
        </div>
        <div class="placeorder-item-actions">
          <button type="button" class="remove-item-btn" title="Remove Item">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;

        itemIndex = 1;
        const initialItem = document.querySelector(".item-row");
        if (initialItem) {
          attachItemEventListeners(initialItem);
        }
        updateSummary();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to place order. Please try again.");
      });
  });

document
  .getElementById("placeorder-form")
  .addEventListener("reset", function () {
    setTimeout(() => {

      const itemsList = document.getElementById("items-list");
      itemsList.innerHTML = `
      <div class="placeorder-items-container item-row" data-item-index="0">
        <div class="placeorder-item">
          <label for="item-name-0">Item Name</label>
          <input type="text" id="item-name-0" class="item-name" placeholder="Enter item name" required />
        </div>
        <div class="placeorder-item">
          <label for="quantity-0">Quantity</label>
          <input type="number" id="quantity-0" class="item-quantity" min="1" value="1" required />
        </div>
        <div class="placeorder-item-actions">
          <button type="button" class="remove-item-btn" title="Remove Item">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;

      itemIndex = 1;
      const initialItem = document.querySelector(".item-row");
      if (initialItem) {
        attachItemEventListeners(initialItem);
      }
      updateSummary();
    }, 0);
  });
