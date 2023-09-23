import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import CartContext from "../../contexts/CartContext.jsx";

function OfferDetails() {
    const {offerId} = useParams();
    const [offer, setOffer] = useState(null);
    const {cart, setCart} = useContext(CartContext);

    useEffect(() => {
        getOffer(offerId).then(({data}) => setOffer(data));
    }, [offerId])

    async function getOffer(id) {
        return axios.get(`/api/v1/offers/${id}`);
    }

    if (!offer) {
        return <div>Loading...</div>
    }

    function addToCart() {
        setCart([...cart, {
            title: offer.title,
            price: offer.price,
            id: offer.id
        }])
    }

    return (
        <div>
            <h1>{offer.title}</h1>
            <p>{offer.description}</p>
            <p>Cena: {offer.price} PLN</p>
            <button
                disabled={cart.some((cartOffer) => cartOffer.id === offer.id)}
                onClick={addToCart}
            >Kup</button>
            <Link to={'/'}>Powrót do wyszukiwania</Link>
        </div>
    );
}

export default OfferDetails;