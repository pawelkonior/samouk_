import {useEffect, useState} from "react";
import axios from "axios";

function Search() {
    const [offer, setOffer] = useState('');
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        getOffers().then(({data}) => setOffers(data))
    }, [])

    async function getOffers() {
        return axios.get('/api/v1/offers');
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
                {offers.length === 0 ?
                    (<h2>Nie ma ofert</h2>)
                    :
                    (
                        offers.map((offer) => (
                                <div key={offer.id}>{offer.title}</div>
                            )
                        )
                    )}
            </section>
        </div>
    );
}

export default Search;