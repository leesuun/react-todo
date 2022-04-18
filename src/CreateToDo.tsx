import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const handleValid = ({ toDo }: IForm) => {
        setToDos((prevToDos) => [
            ...prevToDos,
            { text: toDo, category: "TO_DO", id: Date.now() },
        ]);
        setValue("toDo", "");
    };
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input
                {...register("toDo", {
                    required: "Please write a to do..",
                })}
                placeholder="Write a to do"
                type="text"
            />
            <button>submit</button>
        </form>
    );
}

export default CreateToDo;
