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

      //
      cart(); // to perform functions related to shopping cart
      initApp(); // to perform functions related to the current page
      printlistCartItems();
    });
};
loadTemplate();

const initApp = () => {
  // load list product
  // console.log(products);
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

function printProductDetails(productId) {
  const product = products.find((item) => item.id === productId);
  if (product) {
    console.log(`Product ID: ${product.id}`);
    console.log(`Product Name: ${product.name}`);
    console.log(`Product Price: Rs.${product.price}`);
    console.log(`Product Image: ${product.image}`);
    console.log(`Product Description: ${product.description}`);
  } else {
    console.log(`Product with ID ${productId} not found.`);
  }
}

function printlistCartItems() {
  let addCartItems = document.querySelectorAll(".listCart");
  console.log("printing list cart items");
  addCartItems.forEach((item) => {
    let productId = item.dataset.id;
    printProductDetails(productId); // Call the function directly
  });
}

// --------
