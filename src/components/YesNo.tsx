import React from 'react';

interface Props {
  id: string;
  label: string;
  value?: string;
  onChange: (id: string, value: string) => void;
}

const YesNo: React.FC<Props> = ({ id, label, value, onChange }) => (
  <fieldset className="question-block">
    <legend>{label}</legend>
    <label>
      <input
        type="radio"
        name={id}
        checked={value === 'Yes'}
        onChange={() => onChange(id, 'Yes')}
      />
      Yes
    </label>
    <label>
      <input
        type="radio"
        name={id}
        checked={value === 'No'}
        onChange={() => onChange(id, 'No')}
      />
      No
    </label>
  </fieldset>
);

export default YesNo;