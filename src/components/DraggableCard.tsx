import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  height: 30px;
  background-color: white;
  padding: 5px;
  border-radius: 3px;
`;

interface IDraggableCardProps {
  text: string;
  index: number;
}

function DraggableCard({ text, index }: IDraggableCardProps) {
  return (
    <Draggable index={index} draggableId={text}>
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
