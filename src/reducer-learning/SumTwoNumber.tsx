import React, { useReducer } from "react";
import { act } from "react-dom/test-utils";
type State = {
    num1: number;
    num2: number;
    sum: number;
}

type Action =
    | { type: 'setNum1'; payload: number }
    | { type: 'setNum2'; payload: number }
    | { type: 'calculateSum' }
    | { type: 'reset' };

const initialState: State = {
    num1: 0,
    num2: 0,
    sum: 0,
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setNum1':
            return { ...state, num1: action.payload };
        case 'setNum2':
            return { ...state, num2: action.payload };
        case 'calculateSum':
            return { ...state, sum: state.num1 + state.num2 };
        case 'reset':
            return initialState;
        default:
            return state;
    }
}

const SumTwoNumber = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Sum Calculator (useReducer)</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          placeholder="First number"
          value={state.num1}
          onChange={(e) =>
            dispatch({ type: 'setNum1', payload: Number(e.target.value) })
          }
        />
        {' + '}
        <input
          type="number"
          placeholder="Second number"
          value={state.num2}
          onChange={(e) =>
            dispatch({ type: 'setNum2', payload: Number(e.target.value) })
          }
        />
        <button onClick={() => dispatch({ type: 'calculateSum' })}>
          Calculate
        </button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
      <h3>Result: {state.sum}</h3>
    </div>
  );
};

export default SumTwoNumber;