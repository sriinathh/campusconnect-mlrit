const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const MISTRAL_API_KEY = "akjs82kElpcsQmD9fppqR4ccvAS7UdY2"; // Replace with your actual API key

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            "https://api.mistral.ai/v1/chat/completions",
            {
                model: "mistral-7b-instruct", // Change as per model
                messages: [{ role: "user", content: userMessage }]
            },
            {
                headers: { Authorization: `Bearer ${MISTRAL_API_KEY}` }
            }
        );

        const botReply = response.data.choices[0].message.content;
        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ reply: "Sorry, an error occurred." });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
