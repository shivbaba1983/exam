import React, { useEffect, useState } from 'react';
import YesNo from './YesNo';
import Dropdown from './Dropdown';
import DragDropMatch from './DragDropMatch';
import '../styles/QuestionForm.scss';

interface QuestionBase {
  id: string;
  type: 'yesno' | 'dropdown' | 'dragdrop';
  question: string;
}

type YesNoQ = QuestionBase;

interface DropdownQ extends QuestionBase {
  options: string[];
}

interface DragPair { left: string; right: string; }
interface DragDropQ extends QuestionBase { pairs: DragPair[]; }

type Question = YesNoQ | DropdownQ | DragDropQ;

type Answers = Record<string, string | DragPair[]>;

const QuestionForm = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    import('../data/questions.json')
      .then((module) => setQuestions(module.default as Question[]));
  }, []);

  const updateAnswer = (id: string, value: Answers[string]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Collected answers:', answers);
    alert('Check console for collected answers!');
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      {questions.map((q) => {
        switch (q.type) {
          case 'yesno':
            return (
              <YesNo
                key={q.id}
                id={q.id}
                label={q.question}
                value={answers[q.id] as string}
                onChange={updateAnswer}
              />
            );
          case 'dropdown':
            return (
              <Dropdown
                key={q.id}
                id={q.id}
                label={q.question}
                options={(q as DropdownQ).options}
                value={answers[q.id] as string}
                onChange={updateAnswer}
              />
            );
          case 'dragdrop':
            return (
              <DragDropMatch
                key={q.id}
                id={q.id}
                label={q.question}
                pairs={(q as DragDropQ).pairs}
                value={answers[q.id] as DragPair[]}
                onChange={updateAnswer}
              />
            );
          default:
            return null;
        }
      })}
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default QuestionForm;