import React from 'react';

interface QuestionHeaderProps {
  questionNumber: number;
  questionText: string;
}

const QuestionHeader = ({ questionNumber, questionText }: QuestionHeaderProps) => (
  <h3>
    Q{questionNumber}: {questionText}
  </h3>
);

export default QuestionHeader;
