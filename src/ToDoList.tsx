import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { toDoState } from "./atom";
import { useRecoilValue } from "recoil";

function ToDoList() {
    const toDos = useRecoilValue(toDoState);
    // const setToDos = useSetRecoilState(toDoState);
    return (
        <div>
            <h1>ToDo-List</h1>
            <hr />
            <CreateToDo />
            <ul>
                {toDos.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                    // <ToDo
                    //     id={toDo.id}
                    //     text={toDo.text}
                    //     category={toDo.category}
                    // />
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
