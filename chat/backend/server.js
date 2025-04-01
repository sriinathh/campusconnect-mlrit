require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_URL = "https://api.mistral.ai/v1/chat/completions";

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await axios.post(
            MISTRAL_URL,
            {
                model: "mistral-medium",
                messages: [{ role: "user", content: message }]
            },
            { headers: { Authorization: `Bearer ${MISTRAL_API_KEY}`, "Content-Type": "application/json" } }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to connect to AI" });
    }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
