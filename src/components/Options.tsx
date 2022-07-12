import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { toDoState } from "../atoms";

const Option = styled.div``;

const Form = styled.form`
  input {
    padding: 5px;
    border: none;
    border-radius: 3px;
  }
`;

interface IForm {
  [board: string]: string[];
}

function Options() {
  const { register, handleSubmit, setValue } = useForm();
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onValid = ({ board }: IForm) => {
    setToDos((prevToDos) => {
      // 숫자입력시 앞에 추가됨
      const copyBoard = { ...prevToDos, [`${board}`]: [] };
      return { ...copyBoard };
    });
    setValue("board", "");
  };

  return (
    <Option>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          type="text"
          {...register("board", { required: true })}
          placeholder="Add Board.."
        />
      </Form>
    </Option>
  );
}

export default Options;
