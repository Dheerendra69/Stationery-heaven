const message = document.getElementById('message');
const homeButton = document.getElementById('homeButton');


homeButton.addEventListener('click', () => {
  window.location.href = '/login';
});

function redirect() {
  window.location.href = '/login';
}

setTimeout(redirect, 5 * 60 * 1000);
