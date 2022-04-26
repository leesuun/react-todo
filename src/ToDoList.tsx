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

interface IForm {
    email?: string;
    name: string;
    password: string;
    password1: string;
    extraError?: string;
}

function ToDoList() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        },
    });

    const onValid = (data: IForm) => {
        const { password, password1 } = data;
        if (password !== password1) {
            setError(
                "password1",
                { message: "password not match" },
                { shouldFocus: true }
            );
        }
        setError("extraError", { message: "Server died" });
    };

    return (
        <div>
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleSubmit(onValid)}
            >
                <input
                    placeholder="email"
                    {...register("email", {
                        validate: {
                            nonick: (value) =>
                                value?.includes("nick")
                                    ? "no nick allowed"
                                    : true,
                        },
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
                    {...register("name", { required: true })}
                    // Validate regExp option is pattern
                />
                <input
                    placeholder="password"
                    {...register("password", { required: true })}
                />
                <input
                    placeholder="password1"
                    {...register("password1", { required: true })}
                />
                <span>{errors?.password1?.message}</span>

                <button>submit</button>
            </form>
        </div>
    );
}

export default ToDoList;
