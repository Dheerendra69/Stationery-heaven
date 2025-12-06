function setupLogout() {

  const tryAttach = () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/login";
      });
    } else {
      console.warn("Logout button not found yet, retrying...");
      setTimeout(tryAttach, 500); 
    }
  };

  tryAttach();
}

document.addEventListener("DOMContentLoaded", setupLogout);
