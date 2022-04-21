import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";

// interface IForm {
//     toDo: string;
// }

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const handleValid = ({ toDo }: IForm) => {
        setToDos((prevToDos) => [
            ...prevToDos,
            { text: toDo, category, id: Date.now() },
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
