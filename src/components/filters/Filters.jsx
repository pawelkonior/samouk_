import PropTypes from "prop-types";

function Filters({offers, filters, setFilters}) {
    return (
        <div>
            <h2>Wyszukiwanie zaawansowane</h2>
            <div>
                <label htmlFor="category">Wybierz kategorie</label>
                <select
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={(event) => setFilters({...filters, category: event.target.value})}
                >
                    <option value="">---</option>
                    {[...new Set(offers.map((offer) => offer.category))]
                        .map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                </select>
            </div>
        </div>
    );
}

Filters.propTypes = {
    offers: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.string
        })
    ),
    filters: PropTypes.object,
    setFilters: PropTypes.func
}

export default Filters;