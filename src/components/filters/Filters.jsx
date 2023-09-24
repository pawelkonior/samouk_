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
            <div>
                <div>
                    <label htmlFor="min">Długość minimalna</label>
                    <input
                        value={filters.minDuration}
                        type="number"
                        id='min'
                        onChange={(event) => setFilters({...filters, minDuration: event.target.valueAsNumber})}
                    />
                </div>
                <div>
                    <label htmlFor="max">Długość maksymalna</label>
                    <input
                        value={filters.maxDuration}
                        type="number"
                        id='max'
                        onChange={(event) => setFilters({...filters, maxDuration: event.target.valueAsNumber})}
                    />

                </div>
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