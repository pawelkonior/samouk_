import {useEffect, useState} from "react";
import axios from "axios";
import OfferCard from "../offers/OfferCard.jsx";
import {useLocation} from "react-router-dom";
import Filters from "../filters/Filters.jsx";

function Search() {
    const [query, setQuery] = useState('');
    const [offers, setOffers] = useState([]);
    const [filters, setFilters] = useState({category: ""});

    const {state} = useLocation();

    useEffect(() => {
        getOffers().then(({data}) => setOffers(data))
    }, [])

    async function getOffers() {
        return axios.get('/api/v1/offers');
    }

    function applyFilters(offer) {
        const searchFilter = `${offer.title} ${offer.description} ${offer.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())

        return filters.category === '' ? searchFilter : searchFilter && offer.category === filters.category
    }

    return (
        <div>
            {state && (
                <div>Oferta <b>{state}</b>. Została pomyślnie dodana.</div>
            )}

            <input
                type="text"
                placeholder="Szukaj ofert"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />

            <div className="layout">
                <Filters offers={offers} filters={filters} setFilters={setFilters}/>

                <section>
                    {offers.length === 0 ?
                        (<h2>Nie ma ofert</h2>)
                        :
                        (
                            offers
                                .filter(applyFilters)
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
        </div>
    );
}


export default Search;