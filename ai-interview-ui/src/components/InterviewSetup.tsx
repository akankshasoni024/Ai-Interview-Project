import React, { useState } from 'react';

// ✅ Define prop types
interface InterviewSetupProps {
  onSetupComplete: (instructor: string) => void;
}

const InterviewSetup: React.FC<InterviewSetupProps> = ({ onSetupComplete }) => {
  const [jobPosition, setJobPosition] = useState('');
  const [interviewer, setInterviewer] = useState('');

  const handleSubmit = async () => {
    if (!jobPosition.trim()) {
      alert('Please enter a job position.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/job-position', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobPosition,
          interviewer: interviewer || 'AI-Generated Interviewer',
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      alert('Job data saved successfully!');
      setJobPosition('');
      setInterviewer('');

      // ✅ Call parent callback with instructor's name
      onSetupComplete(interviewer || 'AI-Generated Interviewer');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>AI Interview - Setup</h2>
      <input
        type="text"
        value={jobPosition}
        onChange={(e) => setJobPosition(e.target.value)}
        placeholder="e.g. Frontend Developer"
      />
      <select
        value={interviewer}
        onChange={(e) => setInterviewer(e.target.value)}
      >
        <option value="">AI-Generated Interviewer (Default)</option>
        <option value="John Doe">John Doe</option>
        <option value="Jane Smith">Jane Smith</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default InterviewSetup;
