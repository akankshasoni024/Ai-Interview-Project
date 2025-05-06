import React, { useState } from 'react';
import InterviewSetup from './components/InterviewSetup';
import Interview from './components/interview';

const App: React.FC = () => {
  const [showSetup, setShowSetup] = useState(true);
  const [showInterview, setShowInterview] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [instructorName, setInstructorName] = useState('');

  const handleSetupComplete = (instructor: string) => {
    setInstructorName(instructor);
    setShowSetup(false);
    setShowInterview(true);
  };

  const handleInterviewComplete = () => {
    setShowInterview(false);
    setShowEnd(true);
  };

  const InterviewEnd = () => (
    <div>
      <h2>Interview Complete!</h2>
      <p>Thank you for your responses.</p>
      <p>Interview conducted by: {instructorName || "AI-Generated Interviewer"}</p>
      <button onClick={() => {
        setShowEnd(false);
        setShowSetup(true);
      }}>
        Restart Interview
      </button>
    </div>
  );

  return (
    <div>
      {showSetup && (
        <InterviewSetup onSetupComplete={handleSetupComplete} />
      )}

      {showInterview && (
        <Interview instructorName={instructorName} onInterviewComplete={handleInterviewComplete} />
      )}

      {showEnd && <InterviewEnd />}
    </div>
  );
};

export default App;
