import React from 'react';
import QuestionHeader from './QuestionHeader';

const sampleQuestion = `This is the first line of the question.
Here is the second line of the question.
And finally, the third line!`;

const formatQuestion = (text: string): string[] => {
  return text
    .split(/\n/)           // split by newline characters
    .map(line => line.trim())
    .filter(line => line.length > 0);
};

const TestQuestionUI = () => {
  const lines = formatQuestion(sampleQuestion);

  return (
    <div>
      <QuestionHeader questionNumber={1} questionText={lines} />
    </div>
  );
};

export default TestQuestionUI;
