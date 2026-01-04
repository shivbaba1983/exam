import React, { useState, useEffect, useRef } from 'react';
import questionsData from '../../data/qa.json';
import QuestionHeader from './QuestionHeader';
import OptionsRenderer from './OptionsRenderer';
import Controls from './Controls';
import Pagination from './Pagination';
import AnswerFeedback from './AnswerFeedback';
import './QuestionMaster.scss';

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

const QuestionMaster = () => {
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [questionsPerPage, setQuestionsPerPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
 const [speakingId, setSpeakingId] = useState<string | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const filteredQuestions = questionsData.filter(q => {
    const questionText = Array.isArray(q.question) ? q.question.join(' ') : q.question;
    const optionsText = q.options?.map(opt => opt.text).join(' ') || '';

    const fullText = (questionText + ' ' + optionsText).toLowerCase();
    return fullText.includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const pageQuestions = filteredQuestions.slice(
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

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, questionsPerPage]);

  const handleOptionChange = (qid: string, value: any) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = (qid: string) => {
    setSubmitted(prev => ({ ...prev, [qid]: true }));
  };

  const handleResetDrag = (qid: string) => {
    const original = questionsData.find(q => q.id === qid)?.options?.map(o => o.id) || [];
    handleOptionChange(qid, { source: original, target: [] });
    setSubmitted(prev => ({ ...prev, [qid]: false }));
  };

  const handlePageJump = (index: number) => {
    setCurrentPage(index);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

    const sanitizeSearch = (value: string) => {
    return value
      .replace(/[^a-zA-Z0-9 ,'": ]/g, '')
      .slice(0, 50);
  };

   const buildSpeechText = (question: any) => {
    const questionText = Array.isArray(question.question)
      ? question.question.join('. ')
      : question.question;

    const optionsText = question.options
      ? question.options.map((o: any, i: number) => `Option ${i + 1}. ${o.text}.`).join(' ')
      : '';

    const explanationText = question.explanation
      ? `Explanation. ${question.explanation}`
      : '';

    return `
      Question.
      ${questionText}.
      ${optionsText}
      Correct Answer.
      ${JSON.stringify(question.correctAnswer)}.
      ${explanationText}
    `;
  };

  const handleSpeak = (question: any) => {
    if (!('speechSynthesis' in window)) {
      alert('Text to speech not supported');
      return;
    }

    // Stop if already speaking same question
    if (speakingId === question.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(buildSpeechText(question));
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.lang = 'en-US';

    utterance.onend = () => {
      setSpeakingId(null);
    };

    speechRef.current = utterance;
    setSpeakingId(question.id);
    window.speechSynthesis.speak(utterance);
  };

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 🔊 SPEECH ADDITION
    window.speechSynthesis.cancel();
    setSpeakingId(null);
  }, [currentPage]);

  return (
    <div>
      {/* <Pagination
        currentIndex={currentPage}
        total={totalPages}
        onJump={handlePageJump}
      /> */}
      {/* Top bar with search and pagination side by side */}
      <div className="top-bar">
        <div className="pagination-wrapper">
          <Pagination
            currentIndex={currentPage}
            total={totalPages}
            onJump={handlePageJump}
          />
        </div>

        <div className="search-wrapper">
        <input
        type="text"
        maxLength={50}
        placeholder="Search questions..."
        value={searchTerm}
        onChange={e => setSearchTerm(sanitizeSearch(e.target.value))}
        onKeyDown={e => {
          if (e.key === 'Enter') setCurrentPage(0);
        }}
        aria-label="Search questions"
        className="top-search"
      />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="question-ui">

        {pageQuestions.length === 0 && (
          <p>No questions match your search.</p>
        )}

        {pageQuestions.map((question, index) => {
          const userAnswer =
            question.type === 'drag-sequence'
              ? answers[question.id]?.target
              : question.type === 'dropdown-pair'
                ? answers[question.id]
                : answers[question.id];

          const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
          const isSubmitted = submitted[question.id];

          return (
            <div
              key={question.id}
              className="question-card"
              ref={el => (questionRefs.current[question.id] = el)}
            >
              <QuestionHeader
                questionNumber={currentPage * questionsPerPage + index + 1}
                questionText={formatQuestionSimple(question.question)}
                id={question.id}
                totalQuestions={filteredQuestions?.length}
              />
              <button
                className="speak-btn"
                onClick={() => handleSpeak(question)}
                style={{ marginBottom: '10px' }}
              >
                {speakingId === question.id ? '⏹ Stop Reading' : '🔊 Read Aloud'}
              </button>
              <div className="option-container">
                <OptionsRenderer
                  question={question}
                  answers={answers}
                  submitted={isSubmitted}
                  onOptionChange={handleOptionChange}
                  onResetDrag={handleResetDrag}
                />
              </div>

              {questionsPerPage !== 1 && !isSubmitted && (
                <button
                  className="submit-btn"
                  onClick={() => {
                    handleSubmit(question.id);
                    setTimeout(() => {
                      const currentIndex = pageQuestions.findIndex(q => q.id === question.id);
                      const nextQuestion = pageQuestions[currentIndex + 1];
                      if (nextQuestion) {
                        const nextEl = questionRefs.current[nextQuestion.id];
                        if (nextEl) {
                          nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                    }, 100);
                  }}
                >
                  Submit
                </button>
              )}

              {isSubmitted && (
                <AnswerFeedback
                  isCorrect={isCorrect}
                  explanation={question.explanation}
                />
              )}
            </div>
          );
        })}

        {questionsPerPage === 1 && pageQuestions[0] && (
          <Controls
            onBack={() => handlePageJump(currentPage - 1)}
            onSubmit={() => handleSubmit(pageQuestions[0].id)}
            onNext={() => handlePageJump(currentPage + 1)}
            disableBack={currentPage === 0}
            disableNext={currentPage === totalPages - 1}
          />
        )}

        <Pagination
          currentIndex={currentPage}
          total={totalPages}
          onJump={handlePageJump}
        />
        <div className="question-count-selector" style={{ marginBottom: '1rem' }}>
          <label htmlFor="perPage">Questions per page: </label>
          <select
            id="perPage"
            value={questionsPerPage}
            onChange={e => {
              setQuestionsPerPage(Number(e.target.value));
              setCurrentPage(0);
            }}
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default QuestionMaster;
