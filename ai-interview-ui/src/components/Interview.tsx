import React, { useState, useEffect } from 'react';

const interviewQuestions = [
  "Tell me about yourself.",
  "Why do you want to work as a Frontend Developer?",
  "What are your strengths and weaknesses?",
  "How do you stay updated with the latest web technologies?",
  "Can you describe a challenging project you've worked on?"
];

interface InterviewProps {
  instructorName: string;
  onInterviewComplete: () => void;
}

const Interview: React.FC<InterviewProps> = ({ instructorName, onInterviewComplete }) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    setQuestions(interviewQuestions);
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/save-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const data = await response.json();
      console.log(data.message);  // Log the success message

      setAnswers([...answers, answer]);
      setAnswer("");
      setCurrentQuestion(currentQuestion + 1);
    } catch (error) {
      alert(`Something went wrong: ${error.message}`);
      console.error('Error:', error);
    }
  };

  return (
    <div className="interview">
      <h2>Interview with {instructorName ? instructorName : "Guest"}</h2>

      {currentQuestion < questions.length ? (
        <div>
          <div className="chat">
            <div className="message">
              <strong>Interviewer:</strong> {questions[currentQuestion]}
            </div>
            <div className="message">
              <strong>Candidate:</strong> {answer}
            </div>
          </div>
          <textarea 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer here"
            rows={4}
            cols={50}
          />
          <button onClick={handleSubmit}>Next Question</button>
        </div>
      ) : (
        <div>
            <h2>Interview complete! Thank you for your responses.</h2>
            <p>Interview conducted by: {instructorName || "AI-Generated Interviewer"}</p>
        </div>
      )}
    </div>
  );
};

export default Interview;
