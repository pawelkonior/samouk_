import {Link} from "react-router-dom";

function OfferCard({id, tags, author, price, title, thumbnail, duration}) {
    return (
        <div className="card">{title} | {price} PLN | {duration} min | <Link to={`/offer/${id}`}>Szczegóły</Link></div>
    );
}

export default OfferCard;