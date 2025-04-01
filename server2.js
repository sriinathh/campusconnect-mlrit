const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/campusconnect', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Schemas
const discussionSchema = new mongoose.Schema({ message: String });
const answerSchema = new mongoose.Schema({ questionId: String, answer: String });

// Create Models
const Discussion = mongoose.model('Discussion', discussionSchema);
const Answer = mongoose.model('Answer', answerSchema);

// API Endpoints
app.get('/api/discussions', async (req, res) => {
    const discussions = await Discussion.find();
    res.json(discussions);
});

app.post('/api/discussions', async (req, res) => {
    const newDiscussion = new Discussion(req.body);
    await newDiscussion.save();
    res.json({ message: 'Discussion added' });
});

app.get('/api/answers', async (req, res) => {
    const answers = await Answer.find({ questionId: req.query.questionId });
    res.json(answers);
});

app.post('/api/answers', async (req, res) => {
    const newAnswer = new Answer(req.body);
    await newAnswer.save();
    res.json({ message: 'Answer added' });
});

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
