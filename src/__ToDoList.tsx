import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Categories, categoryState, toDoSelector } from "./__atoms";
import CreateToDo from "./__CreateToDo";
import ToDo from "./__ToDo";

function ToDoList() {
    // const toDos = useRecoilValue(toDoState);
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);

    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };

    return (
        <div>
            <h1>To Dos</h1>
            <hr />

            <select onInput={onInput}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
            </select>
            <CreateToDo />
            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
        </div>
    );
}

export default ToDoList;
