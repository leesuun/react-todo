import { useState } from "react";
import { useForm } from "react-hook-form";

/*
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
*/

function ToDoList() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onValid = (data: any) => {
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    placeholder="email"
                    {...register("email", {
                        required: "write here",
                        minLength: {
                            value: 5,
                            message: "your email is too short",
                        },
                    })}
                />
                <span>{errors?.email?.message}</span>
                <input
                    placeholder="name"
                    {...register("name", { required: true, minLength: 5 })}
                    // Validate regExp option is pattern
                />
                <input
                    placeholder="password"
                    {...register("password", { required: true, minLength: 5 })}
                />
                <input
                    placeholder="password1"
                    {...register("password1", { required: true, minLength: 5 })}
                />

                <button>submit</button>
            </form>
        </div>
    );
}

export default ToDoList;
