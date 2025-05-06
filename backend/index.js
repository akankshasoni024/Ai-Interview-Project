const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

let interviewData = {
  jobPosition: '',
  interviewer: '',
  answers: [],
};

// Endpoint to receive job position and interviewer
app.post('/api/job-position', (req, res) => {
  const { jobPosition, interviewer } = req.body;

  if (!jobPosition || jobPosition.trim() === '') {
    return res.status(400).json({ message: 'Job position is required.' });
  }

  interviewData.jobPosition = jobPosition;
  interviewData.interviewer = interviewer || 'AI-Generated Interviewer';
  console.log("data",interviewData);
  // Send success response in JSON format
  res.status(200).json({ message: 'Job data saved successfully.' });
});

// Endpoint to save interview responses
app.post('/api/save-response', (req, res) => {
  const { answer } = req.body;

  if (!answer) {
    return res.status(400).json({ message: 'Answer is required.' });
  }

  interviewData.answers.push(answer);
  console.log(`Received answer: ${answer}`);

  // Send success response
  res.status(200).json({ message: 'Answer received successfully!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
