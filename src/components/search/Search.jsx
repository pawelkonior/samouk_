import {useState} from "react";
import axios from "axios";

function Search() {
    const [offer, setOffer] = useState('');


    async function getOffers() {
        return axios.get('/offers');
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Szukaj ofert"
                value={offer}
                onChange={(event) => setOffer(event.target.value)}
            />
            <section>
                results
            </section>
        </div>
    );
}

export default Search;