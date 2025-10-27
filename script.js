const webhookUrl = "https://n8n.srv1023211.hstgr.cloud/webhook/840b46c5-e624-4b00-8fb8-90f2e4912414/chat";

const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

// Toggle window
chatToggle.addEventListener("click", () => {
  chatWindow.classList.toggle("hidden");
});

// Send message
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    addMessage(data.response || "No response received.", "bot");
  } catch (err) {
    addMessage("Error contacting the chapel assistant.", "bot");
  }
}

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
