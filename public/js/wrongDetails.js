const message = document.getElementById('message');
const homeButton = document.getElementById('homeButton');

function redirect() {
  window.location.href = '/login';
}

// Set a timeout to redirect after 5 minutes (5 * 60 * 1000 milliseconds)
setTimeout(redirect, 5 * 60 * 1000);

// Add event listener for button click (can be linked to a different page if desired)
homeButton.addEventListener('click', () => {
  // Your home page redirection logic here (or any other action)
  console.log("Button clicked!");
});
