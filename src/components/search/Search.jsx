import {useEffect, useState} from "react";
import axios from "axios";
import OfferCard from "../offers/OfferCard.jsx";

function Search() {
    const [query, setQuery] = useState('');
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
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <section>
                {offers.length === 0 ?
                    (<h2>Nie ma ofert</h2>)
                    :
                    (
                        offers
                            .filter((offer) => `${offer.title} ${offer.description} ${offer.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
                            .map((offer) => (
                                    <OfferCard
                                        key={offer.id}
                                        id={offer.id}
                                        title={offer.title}
                                        thumbnail={offer.thumbnail}
                                        price={offer.price}
                                        author={offer.author}
                                        tags={offer.tags}
                                    />
                                )
                            )
                    )}
            </section>
        </div>
    );
}


export default Search;