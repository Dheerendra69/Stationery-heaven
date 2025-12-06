import products from "./products.js";
let cartData;
let x;
const cart = () => {
  let iconCart = document.querySelector(".icon-cart");
  let body = document.querySelector("body");
  let closeCart = document.querySelector(".cartTab .close");
  let shoppingCart = [];
  // open and close tab
  iconCart.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });
  closeCart.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });

  const setProductInCart = (idProduct, quantity, position) => {
    if (quantity > 0) {
      if (position < 0) {
        //product doesn't exist in the shopping cart
        shoppingCart.push({
          product_id: idProduct,
          quantity: quantity,
        });
      } else {
        shoppingCart[position].quantity = quantity;
      }
    } else {
      shoppingCart.splice(position, 1);
    }
    cartData = JSON.stringify(shoppingCart);
    x = JSON.parse(cartData);
    cartData = x;
    const totalPrice = cartData.reduce((total, cartItem) => {
      return total + calculateTotalPrice(cartItem);
    }, 0);

    // Fetch product details for each item in cartData
    const cartItemsWithDetails = cartData.map((cartItem) => {
      const product = getProductDetails(cartItem.product_id);
      if (product) {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: cartItem.quantity,
        };
      }
      return null;
    });

    localStorage.setItem("cart", JSON.stringify(shoppingCart));
    refreshCartHTML();
  };

  function getProductDetails(product_id) {
    return products.find((product) => product.id === parseInt(product_id));
  }

  function calculateTotalPrice(cartItem) {
    const product = products.find(
      (product) => product.id === parseInt(cartItem.product_id)
    );
    if (product) {
      return product.price * cartItem.quantity;
    }
    return 0;
  }

  const refreshCartHTML = () => {
    let listHTML = document.querySelector(".listCart");
    let totalHTML = document.querySelector(".icon-cart span");
    let totalQuantity = 0;
    listHTML.innerHTML = null;
    shoppingCart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let position = products.findIndex((value) => value.id == item.product_id);
      let info = products[position];
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.innerHTML = `
        <div class="image">
        <img src="${info.image}"/>
        </div>
        <div class="name" >"${info.name}"</div>
        <div class="totalPrice">Rs.${info.price * item.quantity}</div>
        <div class="quantity">
        <span class="minus" data-id="${info.id}">-</span>
        <span>${item.quantity}</span>
        <span class="plus" data-id="${info.id}">+</span>
        </div>


        `;
      listHTML.appendChild(newItem);
    });
    totalHTML.innerText = totalQuantity;
  };

  document.addEventListener("click", (event) => {
    let buttonClick = event.target;
    let idProduct = buttonClick.dataset.id;
    let position = shoppingCart.findIndex((value) => {
      return value.product_id == idProduct;
    });
    let quantity = position < 0 ? 0 : shoppingCart[position].quantity;
    if (
      buttonClick.classList.contains("addCart") ||
      buttonClick.classList.contains("plus")
    ) {
      quantity++;
      setProductInCart(idProduct, quantity, position);
    } else if (buttonClick.classList.contains("minus")) {
      quantity--;
      setProductInCart(idProduct, quantity, position);
    } else if (buttonClick.classList.contains("checkOut")) {

      const cartData = localStorage.getItem("cart");

      if (!cartData) {
        alert("Your cart is empty!");
        return;
      }

      const shoppingCart = JSON.parse(cartData);

      const orderPayload = {
        items: shoppingCart,
        customerName: "anonymous",
        gmail: "anonymous@gmail.com",
        shop: "lpu30block",
      };

      fetch("/check-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Order saved successfully") {
            alert("Order placed successfully!");
            localStorage.removeItem("cart");
            window.location.href = "/index";
          } else {
            alert("Failed to place order");
          }
        })
        .catch((err) => {
          console.error("Checkout error:", err);
          alert("Something went wrong while placing your order.");
        });
    }
  });
  const initApp = () => {
    if (localStorage.getItem("cart")) {
      shoppingCart = JSON.parse(localStorage.getItem("cart"));
    }
    refreshCartHTML();
  };
  initApp();
};
export default cart;
export { cartData };
