const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const chatClose = document.getElementById("chat-close");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

chatToggle.addEventListener("click", () => {
  chatWindow.style.display = "flex";
  chatToggle.style.display = "none";
});

chatClose.addEventListener("click", () => {
  chatWindow.style.display = "none";
  chatToggle.style.display = "flex";
});

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // Add user message
  const userMsg = document.createElement("div");
  userMsg.classList.add("user-msg");
  userMsg.textContent = message;
  chatMessages.appendChild(userMsg);

  chatInput.value = "";

  // Simulated bot reply (replace with webhook call later)
  const botMsg = document.createElement("div");
  botMsg.classList.add("bot-msg");
  botMsg.textContent = "Thank you for your question. I’ll respond shortly.";
  chatMessages.appendChild(botMsg);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}
