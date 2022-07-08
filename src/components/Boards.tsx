import { FormEvent } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  border-radius: 5px;
`;

const BoardTitle = styled.h2`
  position: relative;
  padding: 7px;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #868686;
  text-shadow: 1px 1px 1px black;
`;

const DelBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  position: absolute;
  right: 3px;
  top: 5px;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 250px;
  padding: 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #d9d9d9;
`;

interface IBoardProps {
  toDo: string;
  toDos: IToDo;
}

function Boards({ toDos, toDo }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onClickBtn = (e: FormEvent<HTMLButtonElement>) => {
    setToDos((prevToDos) => {
      const copyToDos = { ...prevToDos };
      delete copyToDos[e.currentTarget.value];
      return { ...copyToDos };
    });
  };
  return (
    <Wrapper>
      <BoardTitle>
        <span>{toDo}</span>
        <DelBtn value={toDo} onClick={onClickBtn}>
          ❌
        </DelBtn>
      </BoardTitle>
      <Droppable droppableId={toDo}>
        {(provided, snapshot) => (
          <Board ref={provided.innerRef}>
            {toDos[toDo as any].map((text, index) => (
              <DraggableCard key={text} text={text} index={index} />
            ))}
            {provided.placeholder}
          </Board>
        )}
      </Droppable>
    </Wrapper>
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
