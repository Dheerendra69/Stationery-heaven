const existingToken = localStorage.getItem("token");
if (existingToken) {
  window.location.href = "/index";
}

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const result = await res.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.name);
      sessionStorage.setItem("showSignupSuccess", "true");
      window.location.href = "/index";
    } else {
      const err = await res.text();
      alert(err);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  }
});
