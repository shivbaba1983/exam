import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface DragPair { left: string; right: string; }
interface Props {
  id: string;
  label: string;
  pairs: DragPair[];
  value?: DragPair[];
  onChange: (id: string, value: DragPair[]) => void;
}

// helper to reorder array
const reorder = <T,>(list: T[], start: number, end: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(start, 1);
  result.splice(end, 0, removed);
  return result;
};

const DragDropMatch: React.FC<Props> = ({ id, label, pairs, value, onChange }) => {
  const [items, setItems] = useState<DragPair[]>(value || pairs);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = reorder(items, result.source.index, result.destination.index);
    setItems(reordered);
    onChange(id, reordered);
  };

  return (
    <fieldset className="question-block drag-drop">
      <legend>{label}</legend>
      <div className="drag-drop-container">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="left-list">
            {(provided) => (
              <ul
                className="left-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {items.map((pair, idx) => (
                  <Draggable key={pair.left} draggableId={pair.left} index={idx}>
                    {(prov) => (
                      <li
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        className="draggable-item"
                      >
                        {pair.left}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <ul className="right-list">
            {items.map((pair) => (
              <li key={pair.left} className="static-item">
                {pair.right}
              </li>
            ))}
          </ul>
        </DragDropContext>
      </div>
    </fieldset>
  );
};

export default DragDropMatch;