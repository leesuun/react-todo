import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Trash = styled.div`
  text-align: center;
  line-height: 50px;
  font-size: 1.5rem;
  border-radius: 50%;
  margin: 10rem auto 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background-color: white;
`;

function TrashCan() {
  return (
    <Droppable droppableId="del">
      {(provided, snapshot) => (
        <Trash ref={provided.innerRef}>
          🗑️
          {provided.placeholder}
        </Trash>
      )}
    </Droppable>
  );
}

export default TrashCan;
