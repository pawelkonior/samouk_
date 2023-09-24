import {Link} from "react-router-dom";

function OfferCard({id, tags, author, price, title, thumbnail}) {
    return (
        <div className="card">{title} | {author} <Link to={`/offer/${id}`}>Szczegóły</Link></div>
    );
}

export default OfferCard;