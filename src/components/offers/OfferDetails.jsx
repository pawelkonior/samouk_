import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function OfferDetails() {
    const {offerId} = useParams();
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        getOffer(offerId).then(({data}) => setOffer(data));
    }, [offerId])

    async function getOffer(id) {
        return axios.get(`/api/v1/offers/${id}`);
    }

    if (!offer) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{offer.title}</h1>
            <p>{offer.description}</p>
            <p>Cena: {offer.price} PLN</p>
            <button>Kup</button>
            <Link to={'/'}>Powrót do wyszukiwania</Link>
        </div>
    );
}

export default OfferDetails;