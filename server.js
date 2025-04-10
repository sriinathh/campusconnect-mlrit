require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

// Optional: For Mistral API call
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

// App Setup
const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/campusconnect", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err));

// ======================= USER AUTH ========================
const userSchema = new mongoose.Schema({
    fullName: String,
    rollNumber: String,
    email: { type: String, unique: true },
    password: String
});
const User = mongoose.model("User", userSchema);

// Register Route
app.post("/register", async (req, res) => {
    const { fullName, rollNumber, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, rollNumber, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ success: true, message: "Login successful", token });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// ======================= EVENT ROUTES ========================
const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    imageUrl: String,
    date: Date
});
const Event = mongoose.model("Event", eventSchema);

// Multer Storage
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Add Event
app.post("/add-event", upload.single("image"), async (req, res) => {
    try {
        const newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
            date: new Date(req.body.date),
        });
        await newEvent.save();
        res.json({ message: "Event Added!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Events
app.get("/events", async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Event
app.delete("/delete-event/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });

        if (event.imageUrl) {
            const imagePath = path.join(__dirname, event.imageUrl.replace(/^\/+/, ""));
            fs.unlink(imagePath, err => {
                if (err) console.log("Error deleting image:", err);
            });
        }

        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ======================= CHATBOT ROUTE ========================
app.post("/api/chat", async (req, res) => {
    const { prompt } = req.body;
    console.log("📨 Received prompt:", prompt);

    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    try {
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: "mistral-tiny",
                messages: [
                    { role: "system", content: "You are a helpful assistant developed by Srinath." },
                    { role: "user", content: prompt }
                ]
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("Mistral API error:", errText);
            return res.status(500).json({ error: "Mistral API error.", details: errText });
        }

        const data = await response.json();
        const reply = data.choices[0].message.content;
        res.json({ response: reply });
    } catch (err) {
        console.error("❌ Server error:", err);
        res.status(500).json({ error: "Server error." });
    }
});

// ======================= START SERVER ========================
app.listen(PORT, () => {
    console.log(`🚀 Combined server running at http://localhost:${PORT}`);
});
