import { useState } from "react";

function CreateToDo() {
    const [toDo, setToDo] = useState([]);
    const [input, setInput] = useState("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setToDo((prevState) => {
            console.log([...prevState, 1]);
            return [...prevState];
        });
        setInput("");
    };

    // console.log(toDo);

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = e;
        setInput(value);
    };

    return (
        <div>
            <h1>ToDo-List</h1>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="write a to do.."
                    value={input}
                />
                <button>add</button>
            </form>
        </div>
    );
}

export default CreateToDo;
