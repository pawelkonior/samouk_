import {useForm} from "react-hook-form";
import axios from "axios";

function AddOffer() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

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
            thumbnail: data.thumbnail[0].name
        }

        return axios.post('/api/v1/offers', updatedData);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title">Nazwa</label>
                <input {...register("title")} id='title'/>
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
                <textarea {...register("description")} id="description"/>
            </div>

            <div>
                <label htmlFor="category">Kategoria</label>
                <select {...register("category")} id="category">
                    <option>Programowanie</option>
                    <option>Wędkarstwo</option>
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

            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit"/>
        </form>
    )
}

export default AddOffer;