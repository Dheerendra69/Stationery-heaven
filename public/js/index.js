import cart from "./cart.js";
import products from "./products.js";

let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporaryContent");

// load content of the template file
const loadTemplate = () => {
  fetch("template.hbs") //path containing the template file
    .then((response) => response.text()) // converted the response to text format
    .then((html) => {
      app.innerHTML = html; // we are embedding the contents of the template file in the 'app' container
      // embedding our template file on index page

      let contentTab = document.getElementById("contentTab");
      contentTab.innerHTML = temporaryContent.innerHTML;
      temporaryContent.innerHTML = null;

      cart(); // to perform functions related to shopping cart
      initApp(); // to perform functions related to the current page
    });
};
loadTemplate();

const initApp = () => {
  // load list product
  let listProductHTML = document.querySelector(".listProduct"); // this is where all the product data will be pushed
  listProductHTML.innerHTML = null; // setting its content to null

  products.forEach((product) => {
    let newProduct = document.createElement("div"); // for each product in data  we create a new element and give this element a class named 'item'
    newProduct.classList.add("item");
    newProduct.innerHTML = `<a href="/detail?id=${product.id}">
             <img src="${product.image}">
         </a>
         <h2>${product.name}</h2>
         <div class="price">Rs.${product.price}</div>
         <button 
             class="addCart" 
             data-id='${product.id}'>
                 Add To Cart
         </button>`;
    listProductHTML.appendChild(newProduct);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("showSignupSuccess")) {
    showNotification("Signup successful!", "success");
    sessionStorage.removeItem("showSignupSuccess");
  }
});
