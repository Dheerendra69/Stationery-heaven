const existingToken = localStorage.getItem("token");
if (existingToken) {
  window.location.href = "/index";
}

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log("here");

  const url = window.location.pathname === "/login" || window.location.pathname === "/" ? "/login" : "/signup";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("res: ", res);
    if (res.ok) {
      const result = await res.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.name);
      showNotification("Login successful!", "success"); 
      setTimeout(() => window.location.href = "/index", 1000); 
    } else {
      const err = await res.text();
      showNotification(err, "error"); 
    }
  } catch (error) {
    console.error("Error:", error);
    showNotification("Something went wrong. Please try again later.", "error");
  }
});