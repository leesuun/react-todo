import { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../atoms";

import Boards from "./Boards";

const Wrapper = styled.div`
  display: flex;

  padding: 0 5rem;

  /* justify-content: center; */

  gap: 30px;
`;
interface IBoardConentsProps {
  toDos: IToDo;
}

function BoardContents({ toDos }: IBoardConentsProps) {
  return (
    <Droppable type={"BoardContents"} direction="horizontal" droppableId="1">
      {(provided) => (
        <Wrapper ref={provided.innerRef}>
          {Object.keys(toDos).map((toDo, idx) => (
            <Draggable key={toDo} draggableId={toDo} index={idx}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                >
                  <Boards key={toDo} toDo={toDo} toDos={toDos} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default memo(BoardContents);
