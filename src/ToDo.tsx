import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atom";

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);

    const onClick = (newCategory: IToDo["category"]) => {
        setToDos((oldToDos) => {
            const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, category: newCategory, id };
            return [
                ...oldToDos.slice(0, targetIdx),
                newToDo,
                ...oldToDos.slice(targetIdx + 1),
            ];
        });
    };

    return (
        <li>
            <span>{text}</span>
            {category !== Categories.DOING && (
                <button onClick={() => onClick(Categories.DOING)}>Doing</button>
            )}
            {category !== Categories.TO_DO && (
                <button onClick={() => onClick(Categories.TO_DO)}>To_Do</button>
            )}

            {category !== Categories.DONE && (
                <button onClick={() => onClick(Categories.DONE)}>Done</button>
            )}
        </li>
    );
}
export default ToDo;
