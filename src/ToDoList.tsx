import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

// atom<{text: string, id: number, category: "TO_DO" | "DOING" | "DONE"}[]> 같음
const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

interface IForm {
    toDo: string;
}

interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

function ToDoList() {
    // const toDos = useRecoilValue(toDoState);
    // const setToDos = useSetRecoilState(toDoState);
    const [toDos, setToDos] = useRecoilState(toDoState); // useState와 흡사함

    const { register, setValue, handleSubmit } = useForm<IForm>();

    const handleValid = (data: IForm) => {
        console.log(data.toDo);
        setToDos((prev) => [
            { text: data.toDo, category: "TO_DO", id: Date.now() },
            ...prev,
        ]);
        setValue("toDo", "");
    };
    console.log(toDos);

    return (
        <div>
            <h1>ToDo-List</h1>
            <hr />
            <form onSubmit={handleSubmit(handleValid)}>
                <input
                    placeholder="write a todo.."
                    {...register("toDo", { required: "Please write a todo" })}
                />
                <button>add</button>
            </form>
            <ul>
                {toDos.map((toDo) => (
                    <li key={toDo.id}>{toDo.text}</li>
                ))}
            </ul>
        </div>
    );
}

/*
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
*/
export default ToDoList;
