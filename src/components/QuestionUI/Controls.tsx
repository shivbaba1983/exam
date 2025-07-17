import React from 'react';
import './Controls.scss';

interface ControlsProps {
  onBack: () => void;
  onSubmit: () => void;
  onNext: () => void;
  disableBack: boolean;
  disableNext: boolean;
}

const Controls = ({ onBack, onSubmit, onNext, disableBack, disableNext }: ControlsProps) => (
  <div className="controls">
    <button className="back-btn" onClick={onBack} disabled={disableBack}>
      Previous
    </button>
    <button className="submit-btn" onClick={onSubmit}>
      Submit
    </button>
    <button className="next-btn" onClick={onNext} disabled={disableNext}>
      Next
    </button>
  </div>
);

export default Controls;
