const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.getElementById("chat-container");
const chatClose = document.getElementById("chat-close");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

chatToggle.addEventListener("click", () => {
  chatContainer.style.display = "flex";
  chatToggle.style.display = "none";
});

chatClose.addEventListener("click", () => {
  chatContainer.style.display = "none";
  chatToggle.style.display = "block";
});

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  userInput.value = "";

  // Replace with your actual webhook URL
  const webhookUrl = "https://n8n.srv1023211.hstgr.cloud/webhook/st-michael-chatbot";

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })
    .then((res) => res.json())
    .then((data) => {
      appendMessage(data.reply || "Thank you for reaching out.", "bot");
    })
    .catch(() => appendMessage("Sorry, I could not connect to the assistant.", "bot"));
}

function appendMessage(text, type) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(type === "user" ? "user-msg" : "bot-msg");
  msgDiv.textContent = text;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}
