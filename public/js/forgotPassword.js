const forgotForm = document.getElementById("forgot-form");
const verifyForm = document.getElementById("verify-form");

let userEmail = "";
let generatedOTP = "";

forgotForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  if (!email) return showNotification("Please enter your email", "error");

  userEmail = email;
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

  const message = `
    Dear user,
    \nYour OTP for password reset is: ${generatedOTP}
    \nPlease use this code to reset your password.
    \nIf you didn't request this, please ignore this email.
    \n\nRegards,
    \nStationery Heaven Team
  `;

  try {
    const res = await fetch("/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiver: email, message }),
    });

    const data = await res.json();

    if (data.success) {
      showNotification("OTP sent to your email!", "success");
      forgotForm.style.display = "none";
      verifyForm.style.display = "block";
    } else {
      showNotification(data.message || "Failed to send OTP", "error");
    }
  } catch (error) {
    console.error(error);
    showNotification("Something went wrong while sending OTP", "error");
  }
});

verifyForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const otp = document.getElementById("otp").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();

  if (otp !== generatedOTP) {
    showNotification("Invalid OTP. Please check again.", "error");
    return;
  }

  try {
    const res = await fetch("/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, newPassword }),
    });

    const data = await res.json();
    if (data.success) {
      showNotification("Password updated successfully!", "success");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } else {
      showNotification(data.message || "Failed to update password", "error");
    }
  } catch (error) {
    console.error(error);
    showNotification("Something went wrong", "error");
  }
});
