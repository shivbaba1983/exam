import React, { useState, useEffect } from 'react';
import questionsData from './../../data/qa-temp.json';
import QuestionHeader from './QuestionHeader';
import OptionsRenderer from './OptionsRenderer';
import Controls from './Controls';
import Pagination from './Pagination';
import AnswerFeedback from './AnswerFeedback';
import './QuestionUI.scss';

const formatQuestionSimple = (text: string | string[]): string[] => {
  if (Array.isArray(text)) {
    return text.map(line => line.trim()).filter(Boolean);
  }
  return text
    .split('\n')
    .flatMap(line => line.split('. '))
    .map(line => line.trim())
    .filter(Boolean);
};

const QuestionUI = () => {
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [questionsPerPage, setQuestionsPerPage] = useState(1);

  const totalPages = Math.ceil(questionsData.length / questionsPerPage);
  const pageQuestions = questionsData.slice(
    currentPage * questionsPerPage,
    currentPage * questionsPerPage + questionsPerPage
  );

  useEffect(() => {
    pageQuestions.forEach(q => {
      if ((q.type === 'drag-sequence' || q.type === 'dropdown-pair') && !answers[q.id]) {
        setAnswers(prev => ({
          ...prev,
          [q.id]: q.type === 'drag-sequence'
            ? { source: q.options?.map(o => o.id) || [], target: [] }
            : { left: '', right: '' }
        }));
      }
    });
  }, [pageQuestions]);

  const handleOptionChange = (qid: string, value: any) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = () => setSubmitted(true);

  const handleResetDrag = (qid: string) => {
    const original = questionsData.find(q => q.id === qid)?.options?.map(o => o.id) || [];
    handleOptionChange(qid, { source: original, target: [] });
    setSubmitted(false);
  };

  const handlePageJump = (index: number) => {
    setSubmitted(false);
    setCurrentPage(index);
  };

  return (
    <div className="question-ui">
      <div className="question-count-selector" style={{ marginBottom: '1rem' }}>
        <label htmlFor="perPage">Questions per page: </label>
        <select
          id="perPage"
          value={questionsPerPage}
          onChange={e => {
            setQuestionsPerPage(Number(e.target.value));
            setCurrentPage(0); // reset to first page
          }}
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      {pageQuestions.map((question, index) => {
        const userAnswer =
          question.type === 'drag-sequence'
            ? answers[question.id]?.target
            : question.type === 'dropdown-pair'
              ? answers[question.id]
              : answers[question.id];

        const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);

        return (
          <div key={question.id} className="question-card">
            <QuestionHeader
              questionNumber={currentPage * questionsPerPage + index + 1}
              questionText={formatQuestionSimple(question.question)}
            />

            <div className="option-container">
              <OptionsRenderer
                question={question}
                answers={answers}
                submitted={submitted}
                onOptionChange={handleOptionChange}
                onResetDrag={handleResetDrag}
              />
            </div>

            {submitted && (
              <AnswerFeedback
                isCorrect={isCorrect}
                explanation={question.explanation}
              />
            )}
          </div>
        );
      })}

      <Controls
        onBack={() => handlePageJump(currentPage - 1)}
        onSubmit={handleSubmit}
        onNext={() => handlePageJump(currentPage + 1)}
        disableBack={currentPage === 0}
        disableNext={currentPage === totalPages - 1}
      />

      <Pagination
        currentIndex={currentPage}
        total={totalPages}
        onJump={handlePageJump}
      />
    </div>
  );
};

export default QuestionUI;
