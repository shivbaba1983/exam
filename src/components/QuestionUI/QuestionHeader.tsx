import React from 'react';
import './QuestionHeader.scss';

interface QuestionHeaderProps {
  questionNumber: number;
  questionText: string[];
}

const QuestionHeader = ({ questionNumber, questionText }: QuestionHeaderProps) => {
  return (
    <div className="question-header">
      <h3>Q{questionNumber}:</h3>
      <ul>
        {questionText.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionHeader;
