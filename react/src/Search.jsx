import React, { useState } from 'react';
import axios from 'axios';

const onSearch = async (setRecipes) => {
    // setLoading(true);
    try {
        const titles = await axios.get(`http://localhost:3001/api/recipes`);
        const word = "JavaScript";
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        const filteredRec = titles.data.map((recipe) => {
            if (regex.test(recipe.title)) {
                return false;
            }
        });
        return true;
        setRecipes(filteredRec);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
    // setLoading(false);
};

const Search = ({ setFilteredReceipts }) => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(setRecipes);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a recipe..."
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;
