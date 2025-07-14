import React, { useState, useEffect } from 'react';
import questionsData from './../../data/qa-temp.json';
import QuestionHeader from './QuestionHeader';
import OptionsRenderer from './OptionsRenderer';
import Controls from './Controls';
import Pagination from './Pagination';
import AnswerFeedback from './AnswerFeedback';
import './QuestionUI.scss';

// Simple formatter splits by newline and period+space
const formatQuestionSimple = (text: string | string[]): string[] => {
  if (Array.isArray(text)) {
    return text.map(line => line.trim()).filter(Boolean);
  }

  if (typeof text === 'string') {
    return text
      .split('\n')
      .flatMap(line => line.split('. '))
      .map(line => line.trim())
      .filter(Boolean);
  }

  return ['[Invalid or missing question text]'];
};


const QuestionUI = () => {
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const currentQuestion = questionsData[currentQIndex];

  useEffect(() => {
    if (currentQuestion.type === 'drag-sequence' && !answers[currentQuestion.id]) {
      setAnswers((prev: any) => ({
        ...prev,
        [currentQuestion.id]: {
          source: currentQuestion.options?.map(o => o.id) || [],
          target: []
        }
      }));
    } else if (currentQuestion.type === 'dropdown-pair' && !answers[currentQuestion.id]) {
      setAnswers((prev: any) => ({
        ...prev,
        [currentQuestion.id]: { left: '', right: '' }
      }));
    }
  }, [currentQuestion]);

  const handleOptionChange = (qid: string, value: any) => {
    setAnswers((prev: any) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = () => setSubmitted(true);

  const handleNext = () => {
    setSubmitted(false);
    if (currentQIndex < questionsData.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const handleBack = () => {
    setSubmitted(false);
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setSubmitted(false);
    setCurrentQIndex(index);
  };

  const handleResetDrag = (qid: string) => {
    const originalOptions = questionsData.find(q => q.id === qid)?.options?.map(o => o.id) || [];
    handleOptionChange(qid, { source: originalOptions, target: [] });
    setSubmitted(false);
  };

  const userAnswer = currentQuestion.type === 'drag-sequence'
    ? answers[currentQuestion.id]?.target
    : currentQuestion.type === 'dropdown-pair'
      ? answers[currentQuestion.id]
      : answers[currentQuestion.id];

  const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(currentQuestion.correctAnswer);

  return (
    <div className="question-ui">
      <div key={currentQuestion.id} className="question-card">
<QuestionHeader
  questionNumber={currentQIndex + 1}
  questionText={formatQuestionSimple(currentQuestion.question)}
/>

        <div className="option-container">
          <OptionsRenderer
            question={currentQuestion}
            answers={answers}
            submitted={submitted}
            onOptionChange={handleOptionChange}
            onResetDrag={handleResetDrag}
          />
        </div>

        {submitted && (
          <AnswerFeedback
            isCorrect={isCorrect}
            explanation={currentQuestion.explanation}
          />
        )}
      </div>

      <Controls
        onBack={handleBack}
        onSubmit={handleSubmit}
        onNext={handleNext}
        disableBack={currentQIndex === 0}
        disableNext={currentQIndex === questionsData.length - 1}
      />

      <Pagination
        currentIndex={currentQIndex}
        total={questionsData.length}
        onJump={handleJumpToQuestion}
      />
    </div>
  );
};

export default QuestionUI;
