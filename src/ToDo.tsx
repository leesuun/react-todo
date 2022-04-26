import { useRecoilValue } from "recoil";
import { IToDo, toDoState } from "./atom";

function ToDo({ text }: IToDo) {
    // const toDos = useRecoilValue(toDoState); // useState와 흡사함
    return (
        <li>
            <span>{text}</span>
            <button>To_Do</button>
            <button>Doing</button>
            <button>Done</button>
        </li>
    );
}
export default ToDo;
