import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atom";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    // const [toDos, setToDos] = useRecoilState(toDoState); // useState와 흡사함
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const handleValid = (data: IForm) => {
        console.log(data.toDo);
        setToDos((prev) => [
            ...prev,
            { text: data.toDo, category: "TO_DO", id: Date.now() },
        ]);
        setValue("toDo", "");
    };

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input
                placeholder="write a todo.."
                {...register("toDo", { required: "Please write a todo" })}
            />
            <button>add</button>
        </form>
    );
}

export default CreateToDo;
