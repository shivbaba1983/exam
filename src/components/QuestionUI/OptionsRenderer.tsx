import React from 'react';
import { Question } from './../model/type';
import DragSequence from './DragSequence';
import DropdownPair from './DropdownPair';

interface OptionsRendererProps {
  question: Question;
  answers: any;
  submitted: boolean;
  onOptionChange: (qid: string, value: any) => void;
  onResetDrag: (qid: string) => void;
}

const OptionsRenderer = ({ question: q, answers, submitted, onOptionChange, onResetDrag }: OptionsRendererProps) => {
  if (q.type === 'drag-sequence') {
    return (
      <DragSequence
        question={q}
        answer={answers[q.id]}
        onOptionChange={onOptionChange}
        onResetDrag={onResetDrag}
      />
    );
  }

  if (q.type === 'dropdown-pair') {
    return (
      <DropdownPair
        question={q}
        answer={answers[q.id]}
        submitted={submitted}
        onOptionChange={onOptionChange}
      />
    );
  }

  switch (q.type) {
    case 'single':
      return q.options?.map((opt) => (
        <label key={opt.id} className="option">
          <input
            type="radio"
            name={q.id}
            value={opt.id}
            checked={answers[q.id] === opt.id}
            onChange={() => onOptionChange(q.id, opt.id)}
          />
          {opt.text}
        </label>
      ));

    case 'multiple':
      return q.options?.map((opt) => (
        <label key={opt.id} className="option">
          <input
            type="checkbox"
            checked={answers[q.id]?.includes(opt.id)}
            onChange={() => {
              const selected = new Set(answers[q.id] || []);
              selected.has(opt.id) ? selected.delete(opt.id) : selected.add(opt.id);
              onOptionChange(q.id, Array.from(selected));
            }}
          />
          {opt.text}
        </label>
      ));

    case 'boolean':
      return ['True', 'False'].map((val) => (
        <label key={val} className="option">
          <input
            type="radio"
            name={q.id}
            value={val}
            checked={answers[q.id] === val}
            onChange={() => onOptionChange(q.id, val)}
          />
          {val}
        </label>
      ));

    default:
      return null;
  }
};

export default OptionsRenderer;
