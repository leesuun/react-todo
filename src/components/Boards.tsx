import { FormEvent, memo } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, IToDoState, toDoState } from "../atoms";
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
  min-height: 200px;
`;

interface IBoardProps {
  toDo: string;
  toDos: IToDoState;
}

interface IForm {
  task: string;
}

function Boards({ toDos, toDo }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onClickBtn = (e: FormEvent<HTMLButtonElement>) => {
    setToDos((prevToDos) => {
      const copyToDos = { ...prevToDos };
      delete copyToDos[e.currentTarget.value];
      return { ...copyToDos };
    });
  };

  const onValid = ({ task }: IForm) => {
    setToDos((prevToDos) => {
      const copyTask = [...prevToDos[toDo]];

      copyTask.push({ text: task, id: Date.now() });
      return { ...prevToDos, [toDo]: copyTask };
    });
    setValue("task", "");
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
            <form onSubmit={handleSubmit(onValid)}>
              <input
                type="text"
                {...register("task", { required: true })}
                placeholder="add a task.."
              />
            </form>
            {toDos[toDo as any].map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                dragId={toDo.id}
                text={toDo.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Board>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default memo(Boards);

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
