// SearchBar.jsx
import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Rechercher une échéance..."
                value={searchTerm}
                onChange={(event)=>{ setSearchTerm(event.target.value)}}
                className="form-control"
            />
        </div>
    );
}

export default SearchBar;
