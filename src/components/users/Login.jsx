import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const users = await axios.get('/api/v1/users')

        users.data.forEach((user) => {
            if (user.email === data.email && user.password === data.password) {
                navigate('/');
            } else {
                console.log('Niepoprawne dane')
            }
        })
    }


    return (
        <div>
            <h1>Zaloguj się</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

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
                <button>Logowanie</button>
            </form>
        </div>
    );
}

export default Login;