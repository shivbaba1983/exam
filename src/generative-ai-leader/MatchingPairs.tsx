import React from 'react';
import { Option } from './../model/type';

interface MatchingPairsProps {
  leftOptions: Option[];
  rightOptions: Option[];
  answer: Record<string, string>;
  submitted: boolean;
  onChange: (leftId: string, rightId: string) => void;
}

const MatchingPairs: React.FC<MatchingPairsProps> = ({
  leftOptions,
  rightOptions,
  answer,
  submitted,
  onChange,
}) => {
  return (
    <div className="matching-pairs">
      {leftOptions.map((leftOpt) => (
        <div key={leftOpt.id} className="matching-row">
          <span className="left-item">{leftOpt.text}</span>
          <select
            value={answer[leftOpt.id] || ''}
            onChange={(e) => onChange(leftOpt.id, e.target.value)}
            // disabled={submitted}
          >
            <option value="">Select match</option>
            {rightOptions.map((rightOpt) => (
              <option key={rightOpt.id} value={rightOpt.id}>
                {rightOpt.text}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default MatchingPairs;
