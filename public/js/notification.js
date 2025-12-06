export function showNotification(message, type = "info", duration = 3000) {
  const container = document.getElementById("notification-container");
  if (!container) return;

  const notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.innerHTML = `
    ${message}
    <span class="close-btn">&times;</span>
  `;

  container.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 10);

  notification.querySelector(".close-btn").addEventListener("click", () => {
    notification.classList.remove("show");
    setTimeout(() => container.removeChild(notification), 400);
  });

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (container.contains(notification)) container.removeChild(notification);
    }, 400);
  }, duration);
}

