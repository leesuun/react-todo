import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "./atom";

function ToDo({ text, category, id }: IToDo) {
    // const toDos = useRecoilValue(toDoState); // useState와 흡사함
    // const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     console.log(event.currentTarget.name);
    // };

    const setToDos = useSetRecoilState(toDoState);

    const onClick = (newCategory: IToDo["category"]) => {
        setToDos((oldToDos) => {
            const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, category: newCategory, id };
            console.log(newCategory);
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
            {category !== "DOING" && (
                <button onClick={() => onClick("DOING")}>Doing</button>
            )}
            {category !== "TO_DO" && (
                <button onClick={() => onClick("TO_DO")}>To_Do</button>
            )}

            {category !== "DONE" && (
                <button onClick={() => onClick("DONE")}>Done</button>
            )}
        </li>
    );
}
export default ToDo;
