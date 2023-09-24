import {useEffect, useState} from "react";
import axios from "axios";
import OfferCard from "../offers/OfferCard.jsx";
import {useLocation, useSearchParams} from "react-router-dom";
import Filters from "../filters/Filters.jsx";

function Search() {
    const [query, setQuery] = useState('');
    const [offers, setOffers] = useState([]);
    const [filters, setFilters] = useState({
        category: "",
        minDuration: 0,
        maxDuration: 600
    });
    const [sorting, setSorting] = useState({
        price: ''
    })

    const [searchParams, setSearchParams] = useSearchParams();

    const {state} = useLocation();

    function applySearchParams() {
        const queryParamsFilter = {}
        if (searchParams.get('category')) queryParamsFilter['category'] = searchParams.get('category');
        if (searchParams.get('minDuration')) queryParamsFilter['minDuration'] = searchParams.get('minDuration');
        if (searchParams.get('maxDuration')) queryParamsFilter['maxDuration'] = searchParams.get('maxDuration');

        setFilters({...filters, ...queryParamsFilter});

        if (searchParams.get('query')) setQuery(searchParams.get('query'));

        const queryParamsSort = {}
        if (searchParams.get('price')) queryParamsSort['price'] = searchParams.get('price');

        setSorting({...sorting, ...queryParamsSort});
    }

    useEffect(() => {
        getOffers().then(({data}) => {
            setOffers(data)

            applySearchParams();
        })
    }, [])

    useEffect(() => {
            const queryParams = {}
            const {category, minDuration, maxDuration} = filters;

            if (category !== '') queryParams.category = category;
            if (minDuration !== 0) queryParams.minDuration = minDuration;
            if (maxDuration !== 600) queryParams.maxDuration = maxDuration;

            const {price} = sorting;
            if (price !== '') queryParams.price = price;

            if (query) queryParams.query = query;

            setSearchParams(queryParams)
        }, [setSearchParams, filters, sorting, query])

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

    function applySorting(a, b) {
        if (sorting.price === '') return 0;
        return sorting.price === 'asc' ? a.price - b.price : b.price - a.price
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
                <Filters
                    offers={offers}
                    filters={filters}
                    setFilters={setFilters}
                    sorting={sorting}
                    setSorting={setSorting}
                />

                <section>
                    {offers.length === 0 ?
                        (<h2>Nie ma ofert</h2>)
                        :
                        (
                            offers
                                .filter(applyFilters)
                                .sort(applySorting)
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