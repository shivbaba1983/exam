import React from 'react';
import './QuestionHeader.scss';

interface QuestionHeaderProps {
  questionNumber: number;
  questionText: string[];
  id:string;
  totalQuestions:number;
}

const QuestionHeader = ({ questionNumber, questionText,id , totalQuestions}: QuestionHeaderProps) => {
  return (
    <div className="question-header">
      <h3>Q:{id} of {totalQuestions}</h3>
      <ul>
        {questionText.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionHeader;
