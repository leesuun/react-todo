/*
interface IForm {
    email: string;
    name?: string;
    password: string;
    password1: string;
    extraErr?: string;
}

function ToDoList() {
    const {
        register,
        formState: { errors },

        handleSubmit,
        setError,
    } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        },
    });

    console.dir(register);

    const onVaild = (data: IForm) => {
        if (data?.password !== data?.password1) {
            setError(
                "password1",
                { message: "Password are not same." },
                { shouldFocus: true }
            );
        }
        // setError("extraErr", { message: " Server disconnected!" });
    };
    // console.log(errors);

    return (
        <div>
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleSubmit(onVaild)}
            >
                <input
                    {...register("email", {
                        required: "write a email..",

                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "Only naver.com emails allowed",
                        },
                    })}
                    type="text"
                />
                <span>{errors?.email?.message}</span>
                <input
                    {...register("name", {
                        required: "write a name..",
                        validate: {
                            noNick: (value) =>
                                value?.includes("nico") ? "no nick" : false,
                        },
                    })}
                    type="text"
                />
                { <span>{errors?.name?.message}</span> }
                <input
                    {...register("password", {
                        required: "write a password..",
                    })}
                    type="text"
                />
                <span>{errors?.password?.message}</span>
                <input
                    {...register("password1", {
                        required: "write a password1..",
                    })}
                    type="text"
                />
                { <span>{errors?.password1?.message}</span> }
                <button>submit</button>
                <span>{errors?.extraErr?.message}</span>
            </form>
        </div>
    );
}
*/

export default () => {};
