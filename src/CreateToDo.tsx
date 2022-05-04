import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atom";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    // const [toDos, setToDos] = useRecoilState(toDoState); // useState와 흡사함
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const handleValid = (data: IForm) => {
        setToDos((prev) => [
            ...prev,
            { text: data.toDo, category, id: Date.now() },
        ]);
        setValue("toDo", "");
    };

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input
                placeholder="write a todo.."
                {...register("toDo", { required: "Please write a todo" })}
            />
            {/* <button>add</button> */}
        </form>
    );
}

export default CreateToDo;
