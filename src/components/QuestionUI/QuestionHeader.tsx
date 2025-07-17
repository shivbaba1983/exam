import React from 'react';
import './QuestionHeader.scss';

interface QuestionHeaderProps {
  questionNumber: number;
  questionText: string[];
  id:string
}

const QuestionHeader = ({ questionNumber, questionText,id }: QuestionHeaderProps) => {
  return (
    <div className="question-header">
      <h3>{id}:</h3>
      <ul>
        {questionText.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionHeader;
