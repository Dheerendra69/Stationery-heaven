const emailForm = document.getElementById('emailForm');
const otpContainer = document.getElementById('otpContainer');
const verifyButton = document.getElementById('verifyButton');

let x  = 0; // variable to store OTP

emailForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  alert('Instructions sent to your email!');
  // Show OTP input container
  otpContainer.style.display = 'block';
  sendEmail();
});

verifyButton.addEventListener('click', function() {
  const enteredOTP = document.getElementById('otp').value;

  // Simulate OTP verification (replace with actual verification logic)
  if (enteredOTP == x) { // Replace with your actual OTP validation logic
    alert('OTP verified! You are being redirected to home page.');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
    // Redirect to password reset page (replace with actual redirection logic)
  } else {
    alert('Invalid OTP. Please try again.');
    // Refresh the page after 2 seconds
    setTimeout(function() {
      location.reload();
    }, 2000);
  }
});

function sendEmail(){
    var recipientEmail = document.getElementById('email').value; // Get the value of email input
    x = generateRandomSixDigitNumber();
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "dheerendrapratapsingh1509@gmail.com",
        Password : "ECF23215F819034DB816FBC02BB5CCC245A9",
        To : recipientEmail, // Use the recipientEmail variable here
        From : "dheerendrapratapsingh1509@gmail.com",
        Subject : "Your OTP", // Change this subject as per your requirement
        Body : `Your OTP is: ${x}` // Change the body as per your requirement
    }).then(
        message => alert(message)
    );
}

function generateRandomSixDigitNumber() { // to generate OTP
    // Generate a random number between 100000 and 999999 (inclusive)
    const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  
    // Convert the number to a string and return it
    return randomNumber.toString();
  }