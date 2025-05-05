import products from "./products.js";
import cart from "./cart.js";

let listProduct = document.getElementById("listProduct");
let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporaryContent");

const loadTemplate = () => {
  fetch("/template.hbs")
    .then((response) => response.text())
    .then((html) => {
      app.innerHTML = html;
      let contentTab = document.getElementById("contentTab");
      contentTab.innerHTML = temporaryContent.innerHTML;
      temporaryContent.innerHTML = null;
      cart();
      initApp();
    });
};
loadTemplate();
const initApp = () => {
  let idProduct = new URLSearchParams(window.location.search).get("id");
  let info = products.filter((value) => value.id == idProduct)[0];
  if (!info) {
    window.location.href = "/";
  }

  let detail = document.querySelector(".detail");
  detail.querySelector(".image img").src = info.image;
  detail.querySelector(".name").innerText = info.name;
  detail.querySelector(".price").innerText = "Rs." + info.price;
  detail.querySelector(".description").innerText = info.description;
  detail.querySelector(".addCart").dataset.id = info.id;

  // load Similar products
  let listProductHTML = document.querySelector(".listProduct");
  products
    .filter((value) => value.id != idProduct)
    .forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.innerHTML = `<a href="/detail?id=${product.id}">
            <img src="${product.image}">
        </a>
        <h2>${product.name}</h2>
        <div class="price">Rs. ${product.price}</div>
        <button 
            class="addCart" 
            data-id='${product.id}'>
                Add To Cart
        </button>`;
      listProductHTML.appendChild(newProduct);
    });
};
