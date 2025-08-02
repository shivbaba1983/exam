import React, { useReducer } from 'react';

type State = {
  count: number;
  name: string;
};

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number }
  | { type: 'inputChange'; field: 'name'; value: string };

const initialState: State = {
  count: 0,
  name: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'reset':
      return initialState;
    case 'set':
      return { ...state, count: action.payload };
    case 'inputChange':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const ReactReducerLearn = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Count: {state.count}</h2>
      <div>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        <button onClick={() => dispatch({ type: 'set', payload: 10 })}>Set to 10</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Name: {state.name}</h2>
        <input
          type="text"
          value={state.name}
          onChange={(e) =>
            dispatch({
              type: 'inputChange',
              field: 'name',
              value: e.target.value,
            })
          }
          placeholder="Enter your name"
        />
      </div>
    </div>
  );
};

export default ReactReducerLearn;
