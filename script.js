const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.getElementById("chat-container");
const chatClose = document.getElementById("chat-close");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

// Open/close behavior
chatToggle.addEventListener("click", () => {
  chatContainer.style.display = "flex";
  chatToggle.style.display = "none";
});

chatClose.addEventListener("click", () => {
  chatContainer.style.display = "none";
  chatToggle.style.display = "block";
});

// Send message
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  userInput.value = "";

  const webhookUrl = "https://n8n.srv1023211.hstgr.cloud/webhook/st-michael-chatbot";

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    // Only display a bot message if one exists
    if (data && (data.reply || data.answer)) {
      appendMessage(data.reply || data.answer, "bot");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

function appendMessage(text, type) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(type === "user" ? "user-msg" : "bot-msg");
  msgDiv.textContent = text;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}
