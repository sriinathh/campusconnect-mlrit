const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 7000;

if (!process.env.MISTRAL_API_KEY) {
  console.error("❌ MISTRAL_API_KEY not set in .env");
  process.exit(1);
}

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  console.log("📨 Received prompt:", prompt);

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral-tiny',
        messages: [
          { role: 'system', content: 'You are a helpful assistant developed by Srinath.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Mistral API error:", errText);
      return res.status(500).json({ error: 'Mistral API error.', details: errText });
    }

    const data = await response.json();
    console.log("✅ Mistral Response:", data);

    const reply = data.choices[0].message.content;
    res.json({ response: reply });

  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: 'Server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Bot server running on http://localhost:${PORT}`);
});
