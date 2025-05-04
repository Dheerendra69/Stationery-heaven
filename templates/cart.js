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
    console.log(cartData.length);
    console.log(cartData);
    const totalPrice = cartData.reduce((total, cartItem) => {
      return total + calculateTotalPrice(cartItem);
    }, 0);

    console.log("Total Price:", totalPrice);

    // ----
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
      return null; // Handle if product is not found
    });

    console.log(cartItemsWithDetails);

    // ----

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
    return 0; // Return 0 if product is not found
  }

  const refreshCartHTML = () => {
    let listHTML = document.querySelector(".listCart"); // to display the list
    let totalHTML = document.querySelector(".icon-cart span"); // number of products in the list
    let totalQuantity = 0; // initially totalQuantity is 0
    listHTML.innerHTML = null;
    console.log("shopping Cart: ");
    console.log(shoppingCart);
    shoppingCart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let position = products.findIndex((value) => value.id == item.product_id); // find location of item in the products table
      let info = products[position];
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.innerHTML = `
        <div class="image">
        <img src="${info.image}"/>
        </div>
        <div class="name" >Name</div>
        <div class="totalPrice">$${info.price * item.quantity}</div>
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

  // event click
  document.addEventListener("click", (event) => {
    let buttonClick = event.target; // this stores the element that was clicked
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
      // console.log(naming);
    } else if (buttonClick.classList.contains("minus")) {
      quantity--;
      setProductInCart(idProduct, quantity, position);
      // console.log(naming);
    } else if (buttonClick.classList.contains("checkOut")) {
      // console.log(3);
      // console.log(x[0]);
      // printArrayElements(x);
      //   const temp = printArrayElements(x);
    //   console.log(JSON.stringify(temp));
      // Set the value of the input field in the form
    //   document.getElementById("dataField").value = JSON.stringify(temp);
    //   console.log(document.getElementById("dataField").value);
      document.getElementById("dynamicForm").submit();
    }
  });
  const initApp = () => {
    if (localStorage.getItem("cart")) {
      shoppingCart = JSON.parse(localStorage.getItem("cart"));
    }
    refreshCartHTML();
  };
  initApp();

  // --------

  // variable to store email of user
  //   const username = callingNaming();
  //   console.log(username);

  //   // function to generate order ID
  //   function generateRandomOrderId() {
  //     return "ORD" + Math.floor(1000 + Math.random() * 9000);
  //   }

  //   function printArrayElements(array) {
  //     let jsonArray = []; // Initialize an empty array to store JSON objects
  //     jsonArray.push({ name: username }); // to push username
  //     jsonArray.push({ "order-ID": generateRandomOrderId() });
  //     jsonArray.push({ Date: new Date() });

  //     let materials = [];
  //     array.forEach(function (element) {
  //       let jsonObject = {
  //         product_id: element.product_id,
  //         quantity: element.quantity,
  //       };
  //       materials.push(jsonObject); // Push the JSON object to the jsonArray
  //     });
  //     jsonArray.push(materials);

  //     return jsonArray; // Return the array of JSON objects
  //   }
  //   printArrayElements(x);
};
export default cart;
export { cartData };
