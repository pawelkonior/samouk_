import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Register() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await axios.post('/api/v1/users', data)

        navigate('/');
    }

    return (
        <div>
            <h1>Zarejestruj się</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input type="text" id='username' {...register("username", {required: true})}/>
                    {errors.username && <span>This field is required</span>}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" {...register("email", {required: true})} id='email'/>
                    {errors.email && <span>This field is required</span>}
                </div>

                <div>
                    <label htmlFor="password">Hasło</label>
                    <input type="password" id='password' {...register("password", {required: true})}/>
                    {errors.password && <span>This field is required</span>}
                </div>
                <button>Rejestracja</button>
            </form>
        </div>
    );
}

export default Register;