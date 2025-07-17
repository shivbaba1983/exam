import React from 'react';
import { Question } from './../model/type';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import './DragSequence.scss';

interface DragSequenceProps {
  question: Question;
  answer: { source: string[]; target: string[] };
  onOptionChange: (qid: string, value: { source: string[]; target: string[] }) => void;
  onResetDrag: (qid: string) => void;
}

const DragSequence = ({ question: q, answer, onOptionChange, onResetDrag }: DragSequenceProps) => {
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    // Copy current source and target arrays
    const newSource = Array.from(answer.source);
    const newTarget = Array.from(answer.target);

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      const list = source.droppableId === 'source' ? newSource : newTarget;
      const [moved] = list.splice(source.index, 1);
      list.splice(destination.index, 0, moved);

      if (source.droppableId === 'source') {
        onOptionChange(q.id, { source: list, target: newTarget });
      } else {
        onOptionChange(q.id, { source: newSource, target: list });
      }
    } else {
      // Moving between lists
      const sourceList = source.droppableId === 'source' ? newSource : newTarget;
      const destList = destination.droppableId === 'source' ? newSource : newTarget;

      const [moved] = sourceList.splice(source.index, 1);
      if (!destList.includes(moved)) {
        destList.splice(destination.index, 0, moved);
      }

      onOptionChange(q.id, { source: newSource, target: newTarget });
    }
  };

  return (
    <>
      <button className="reset-btn" onClick={() => onResetDrag(q.id)}>
        Reset
      </button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="drag-panes">
          <Droppable droppableId="source">
            {(provided) => (
              <div className="option-drag-column" ref={provided.innerRef} {...provided.droppableProps}>
                <h4>Available Options</h4>
                {answer?.source?.map((id, index) => {
                  const opt = q.options?.find((o) => o.id === id);
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
              <div className="answer-drag-column" ref={provided.innerRef} {...provided.droppableProps}>
                <h4>Drop in Order</h4>
                <div className="drag-items">
                  {answer?.target?.map((id, index) => {
                    const opt = q.options?.find((o) => o.id === id);
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
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

export default DragSequence;
