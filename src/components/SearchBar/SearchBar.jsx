import { useState } from 'react';
import './SearchBar.scss';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="search-bar">
            <input 
                className="search-bar__input"
                type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;