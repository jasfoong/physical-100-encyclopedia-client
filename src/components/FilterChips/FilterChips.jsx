import { useState } from 'react';
import './FilterChips.scss'

const FilterChips = ({ careerCategories, filterContestants }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleChipClick = (category) => {
        setSelectedCategory((selectedCategory === category) ? null : category);
        filterContestants((selectedCategory === category) ? null : category)
    }

    return (
        <div className="filter-chips">
        {
            careerCategories.map((category) => (
            <span
                key={category}
                className={`filter-chips__chip ${selectedCategory === category && "filter-chips__chip--selected"}`}
                onClick={() => handleChipClick(category)}
            >
                {category}
            </span>
            ))
        }
        </div>
    )
}

export default FilterChips;

