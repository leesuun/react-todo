import { FormEvent, memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "../atoms";
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

const Board = styled.div<IBoardAreaProps>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 250px;
  padding: 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  min-height: 200px;
  align-items: center;

  background-color: ${(props) => {
    return props.isDraggingOver
      ? "#cbd2d6"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "#d9d9d9";
  }};
  flex-grow: 1;
  padding: 20px;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  input {
    border: none;
    border-radius: 3px;
    padding: 3px;
  }
`;

interface IBoardAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  boardId: string;
  toDos: IToDoState;
}

interface IForm {
  task: string;
}

function Boards({ toDos, boardId }: IBoardProps) {
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
      const copyTask = [...prevToDos[boardId]];

      copyTask.push({ text: task, id: Date.now() });
      return { ...prevToDos, [boardId]: copyTask };
    });
    setValue("task", "");
  };

  return (
    <Wrapper>
      <BoardTitle>
        <span>{boardId}</span>
        <DelBtn value={boardId} onClick={onClickBtn}>
          ❌
        </DelBtn>
      </BoardTitle>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Board
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
          >
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                autoComplete="off"
                type="text"
                {...register("task", { required: true })}
                placeholder="add a task.."
              />
            </Form>

            {toDos[boardId].map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                boardId={toDo.id}
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
