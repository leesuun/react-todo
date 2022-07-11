import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  height: 30px;
  background-color: white;
  padding: 5px;
  border-radius: 3px;
  width: 80%;
`;

interface IDraggableCardProps {
  text: string;
  index: number;
  dragId: number;
}

function DraggableCard({ text, index, dragId }: IDraggableCardProps) {
  return (
    <Draggable index={index} draggableId={dragId + ""}>
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

export default DraggableCard;
