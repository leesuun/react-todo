import { Droppable, Draggable } from "react-beautiful-dnd";
import { IToDo } from "../atoms";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDo: string;
  toDos: IToDo;
}

function Boards({ toDos, toDo }: IBoardProps) {
  return (
    <Droppable droppableId={toDo}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          {toDos[toDo as any].map((text, index) => (
            <DraggableCard key={text} text={text} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
export default Boards;

{
  /* <Draggable key={text} index={index} draggableId={text}>
{(provided, snapshot) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    {text}
  </div>
)}
</Draggable> */
}
