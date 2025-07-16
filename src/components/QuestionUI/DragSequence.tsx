import React from 'react';
import { Question } from './../model/type';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import './DragSequence.scss';

interface DragSequenceProps {
  question: Question;
  answer: { source: string[]; target: string[] };
  onOptionChange: (qid: string, value: any) => void;
  onResetDrag: (qid: string) => void;
}

const DragSequence = ({ question: q, answer, onOptionChange, onResetDrag }: DragSequenceProps) => {
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = Array.from(answer[source.droppableId]);
    const destList = Array.from(answer[destination.droppableId]);

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
      target: source.droppableId === 'target' ? sourceList : destList,
    };

    onOptionChange(q.id, updated);
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
              <div className="drag-column" ref={provided.innerRef} {...provided.droppableProps}>
                <h4>Available Options</h4>
                {answer?.source?.map((id: string, index: number) => {
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
                <div className="drag-items">
                  {answer?.target?.map((id: string, index: number) => {
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
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

    </>
  );
};

export default DragSequence;
