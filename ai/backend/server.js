require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await axios.post(
            "https://api.mistral.ai/v1/chat/completions",
            {
                model: "mistral-medium",
                messages: [{ role: "user", content: message }]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error connecting to Mistral AI:", error.response?.data || error.message);
        res.status(500).json({ error: "Error connecting to AI" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
