function OfferCard({id, tags, author, price, title, thumbnail}) {
    return (
        <div>{title} | {author} <button>Szczegóły</button></div>
    );
}

export default OfferCard;