async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    displayMessage(userInput, "user");

    document.getElementById("user-input").value = "";

    try {
        const response = await fetch("http://localhost:5000/chat", { // Update with your backend URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        displayMessage(data.reply, "bot");
    } catch (error) {
        displayMessage("Error connecting to chatbot!", "bot");
        console.error("Error:", error);
    }
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") sendMessage();
}
