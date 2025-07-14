import React from 'react';
import { Question } from './../model/type';
import './DropdownPair.scss';

interface DropdownPairProps {
  question: Question;
  answer: { left: string; right: string };
  submitted: boolean;
  onOptionChange: (qid: string, value: any) => void;
}

const DropdownPair = ({ question: q, answer, submitted, onOptionChange }: DropdownPairProps) => (
  <div className="dropdown-pair">
    <select value={answer?.left || ''} onChange={(e) => onOptionChange(q.id, { ...answer, left: e.target.value })}>
      <option value="">Select Section</option>
      {q.leftOptions?.map((opt) => (
        <option key={opt.id} value={opt.id}>{opt.text}</option>
      ))}
    </select>

    <select value={answer?.right || ''} onChange={(e) => onOptionChange(q.id, { ...answer, right: e.target.value })}>
      <option value="">Select Category</option>
      {q.rightOptions?.map((opt) => {
        const isCorrect = submitted && q.correctAnswer?.right === opt.id && answer?.right === opt.id;
        return (
          <option
            key={opt.id}
            value={opt.id}
            className={isCorrect ? 'highlight-correct' : ''}
          >
            {opt.text}
          </option>
        );
      })}
    </select>
  </div>
);

export default DropdownPair;
