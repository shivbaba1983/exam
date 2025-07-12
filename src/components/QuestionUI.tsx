import React, { useState, useEffect } from 'react';
import './QuestionUI.scss';
import questionsData from './../data/qa.json';
import { Question, Option } from './../model/type';
import './QuestionUI.scss';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';


import './QuestionUI.scss';

 const QuestionUI = () => {
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const currentQuestion = questionsData[currentQIndex];

  useEffect(() => {
    if (currentQuestion.type === 'drag-sequence' && !answers[currentQuestion.id]) {
      setAnswers((prev: any) => ({
        ...prev,
        [currentQuestion.id]: {
          source: currentQuestion.options?.map(o => o.id) || [],
          target: []
        }
      }));
    }
  }, [currentQuestion]);

  const handleOptionChange = (qid: string, value: string | string[] | { source: string[]; target: string[] }) => {
    setAnswers((prev: any) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNext = () => {
    setSubmitted(false);
    if (currentQIndex < questionsData.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const handleBack = () => {
    setSubmitted(false);
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const qid = currentQuestion.id;
    const currentAnswer = answers[qid] || {
      source: currentQuestion.options?.map(o => o.id) || [],
      target: []
    };

    const sourceList = Array.from(currentAnswer[source.droppableId]);
    const destList = Array.from(currentAnswer[destination.droppableId]);

    const [moved] = sourceList.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      destList.splice(destination.index, 0, moved);
    } else {
      if (!destList.includes(moved)) {
        destList.splice(destination.index, 0, moved);
      }
    }

    const updated = {
      source: source.droppableId === 'source' ? sourceList : destList,
      target: source.droppableId === 'target' ? sourceList : destList
    };

    handleOptionChange(qid, updated);
  };

  const renderOptions = (q: Question) => {
    if (q.type === 'drag-sequence') {
      const defaultAnswer = {
        source: q.options?.map(o => o.id) || [],
        target: []
      };
      const answer = answers[q.id] || defaultAnswer;
      return (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="drag-panes">
            <Droppable droppableId="source">
              {(provided) => (
                <div className="drag-column" ref={provided.innerRef} {...provided.droppableProps}>
                  <h4>Available Options</h4>
                  {answer.source.map((id: string, index: number) => {
                    const opt = q.options?.find(o => o.id === id);
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <div
                            className="draggable-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {opt?.text}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="target">
              {(provided) => (
                <div className="drag-column" ref={provided.innerRef} {...provided.droppableProps}>
                  <h4>Drop in Order</h4>
                  {answer.target.map((id: string, index: number) => {
                    const opt = q.options?.find(o => o.id === id);
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <div
                            className="draggable-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {opt?.text}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
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
              onChange={() => handleOptionChange(q.id, opt.id)}
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
                handleOptionChange(q.id, Array.from(selected));
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
              onChange={() => handleOptionChange(q.id, val)}
            />
            {val}
          </label>
        ));

      default:
        return null;
    }
  };

  const checkAnswer = (q: Question) => {
    const userAns = q.type === 'drag-sequence'
      ? answers[q.id]?.target
      : answers[q.id];

    const correct = JSON.stringify(userAns) === JSON.stringify(q.correctAnswer);
    return (
      <div className={correct ? 'correct' : 'incorrect'}>
        {correct ? '✅ Correct' : `❌ Incorrect. ${q.explanation}`}
      </div>
    );
  };

  return (
    <div className="question-ui">
      <div key={currentQuestion.id} className="question-card">
        <h3>
          Q{currentQIndex + 1}: {currentQuestion.question}
        </h3>
        <div className="options-container">{renderOptions(currentQuestion)}</div>
        {submitted && checkAnswer(currentQuestion)}
      </div>
      <div className="controls">
        {!submitted ? (
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <>
            <button className="back-btn" onClick={handleBack} disabled={currentQIndex === 0}>
              Back
            </button>
            <button className="next-btn" onClick={handleNext}>
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionUI
