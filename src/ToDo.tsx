import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDos, toDoState } from "./atoms";

function ToDo({ text, id, category }: IToDos) {
    const setToDos = useSetRecoilState(toDoState);

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((prevToDos) => {
            const targetIndex = prevToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, id, category: name as any };

            return [
                ...prevToDos.slice(0, targetIndex),
                newToDo,
                ...prevToDos.slice(targetIndex + 1),
            ];
        });
    };

    return (
        <li>
            <span>{text}</span>
            {category !== "DOING" && (
                <button name="DOING" onClick={onClick}>
                    Doing
                </button>
            )}
            {category !== "TO_DO" && (
                <button name="TO_DO" onClick={onClick}>
                    To Do
                </button>
            )}
            {category !== "DONE" && (
                <button name="DONE" onClick={onClick}>
                    Done
                </button>
            )}
        </li>
    );
}

export default ToDo;
