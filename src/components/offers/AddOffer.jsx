import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AddOffer() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const navigate = useNavigate();

    const onSubmit = (data) => sendData(data)

    async function sendData(data) {
        const updatedData = {
            ...data,
            rating: 0,
            voters: 0,
            prerequisites: data.prerequisites.split(' '),
            tags: data.tags.split(' '),
            price: parseFloat(data.price),
            duration: parseFloat(data.duration),
            thumbnail: data.thumbnail[0]?.name
        }

        await axios.post('/api/v1/offers', updatedData);

        navigate('/', {state: data.title})
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title">Nazwa</label>
                <input {...register("title", {required: true})} id='title'/>
                {errors.title && <span>This field is required</span>}
            </div>

            <div>
                <label htmlFor="author">Autor</label>
                <input {...register("author")} id="author"/>
            </div>

            <div>
                <label htmlFor="price">Cena</label>
                <input {...register("price")} type="number" id="price"/>
            </div>

            <div>
                <label htmlFor="duration">Długość</label>
                <input {...register("duration")} id="duration" type="number"/>
            </div>

            <div>
                <label htmlFor="isTeach">Nauka/uczenie</label>
                <input {...register("isTeach")} id="isTeach" type="checkbox"/>
            </div>

            <div>
                <label htmlFor="isGroup">Indywidualne/grupowe</label>
                <input {...register("isGroup")} id="isGroup" type="checkbox"/>
            </div>

            <div>
                <label htmlFor="thumbnail">Miniaturka</label>
                <input {...register("thumbnail")} id="thumbnail" type="file"/>
            </div>

            <div>
                <label htmlFor="description">Opis</label>
                <textarea {...register("description", {required: true})} id="description"/>
                {errors.description && <span>This field is required</span>}
            </div>

            <div>
                <label htmlFor="category">Kategoria</label>
                <select {...register("category")} id="category">
                    <option>Programowanie</option>
                    <option>Wędkarstwo</option>
                    <option>Bazy danych</option>
                </select>
            </div>

            <div>
                <label htmlFor="tags">Tagi</label>
                <input {...register("tags")} id="tags"/>
            </div>

            <div>
                <label htmlFor="prerequisites">Wymagania początkowe</label>
                <input {...register("prerequisites")} id="prerequisites"/>
            </div>
            <input type="submit"/>
        </form>
    )
}

export default AddOffer;