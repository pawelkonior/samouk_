import {useEffect, useState} from "react";
import axios from "axios";
import OfferCard from "../offers/OfferCard.jsx";
import {useLocation} from "react-router-dom";
import Filters from "../filters/Filters.jsx";

function Search() {
    const [query, setQuery] = useState('');
    const [offers, setOffers] = useState([]);
    const [filters, setFilters] = useState({
        category: "",
        minDuration: 0,
        maxDuration:  180
    });

    const {state} = useLocation();

    useEffect(() => {
        getOffers().then(({data}) => {
            setOffers(data)
            setFilters({...filters, maxDuration: Math.max(...data.map((offer) => offer.duration))})
        })

    }, [])

    async function getOffers() {
        return axios.get('/api/v1/offers');
    }

    function applyFilters(offer) {
        const searchFilter = `${offer.title} ${offer.description} ${offer.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())
        const categoryFilter = filters.category === '' ? true : offer.category === filters.category
        const minDuration = filters.minDuration <= offer.duration
        const maxDuration = filters.maxDuration >= offer.duration

        return searchFilter && categoryFilter && minDuration && maxDuration
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
                                            duration={offer.duration}
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