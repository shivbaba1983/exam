import React from 'react';

interface Props {
  id: string;
  label: string;
  options: string[];
  value?: string;
  onChange: (id: string, value: string) => void;
}

const Dropdown: React.FC<Props> = ({ id, label, options, value, onChange }) => (
  <fieldset className="question-block">
    <legend>{label}</legend>
    <select
      value={value || ''}
      onChange={(e) => onChange(id, e.target.value)}
    >
      <option value="" disabled>
        Select…
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </fieldset>
);

export default Dropdown;