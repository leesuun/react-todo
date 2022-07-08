import { Droppable, Draggable } from "react-beautiful-dnd";

interface IDraggableCardProps {
  text: string;
  index: number;
}

function DraggableCard({ text, index }: IDraggableCardProps) {
  return (
    <Draggable index={index} draggableId={text}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableCard;
