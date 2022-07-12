import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Trash = styled.div<ITrashCanProps>`
  text-align: center;
  line-height: 50px;
  font-size: 1.5rem;
  border-radius: 50%;
  margin: 5rem auto 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  width: 50px;
  height: 50px;

  background-color: ${(props) => {
    return props.isDraggingOver
      ? "#cbd2d6"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "white";
  }};

  transition: background-color 0.3s ease-in-out;
`;

interface ITrashCanProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

function TrashCan() {
  return (
    <Droppable droppableId="del">
      {(provided, snapshot) => (
        <Trash
          isDraggingOver={snapshot.isDraggingOver}
          isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          ref={provided.innerRef}
        >
          🗑️
          {provided.placeholder}
        </Trash>
      )}
    </Droppable>
  );
}

export default TrashCan;
