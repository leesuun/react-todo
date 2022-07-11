import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  margin-top: 5px;
  height: 30px;
  background-color: white;
  padding: 5px;
  border-radius: 3px;
  width: 100%;
`;

interface IDraggableCardProps {
  text: string;
  index: number;
  boardId: number;
}

function DraggableCard({ text, index, boardId }: IDraggableCardProps) {
  return (
    <Draggable index={index} draggableId={boardId + ""}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DraggableCard);
