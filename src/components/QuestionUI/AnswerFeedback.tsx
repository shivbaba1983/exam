import React from 'react';
import './AnswerFeedback.scss';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  explanation: string;
}

const AnswerFeedback = ({ isCorrect, explanation }: AnswerFeedbackProps) => (
  <div className={isCorrect ? 'correct' : 'incorrect'}>
    {isCorrect ? `✅ Correct: ${explanation}` : `❌ Incorrect. Right answer is- ${explanation}`}
  </div>
);

export default AnswerFeedback;
