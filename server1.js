require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/campusconnect", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Event Schema
const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String, // birthday, hackathon, promotion, news
  imageUrl: String,
  date: Date
});

const Event = mongoose.model("Event", EventSchema);

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// API to Add Event
app.post("/add-event", upload.single("image"), async (req, res) => {
  try {
    const newEvent = new Event({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
      date: new Date(req.body.date)
    });
    await newEvent.save();
    res.json({ message: "Event Added!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to Get Events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to Delete Event
app.delete("/delete-event/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));