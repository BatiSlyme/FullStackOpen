import React, { useState } from 'react';
import axios from 'axios';
import receipts from './services/recipeService';

const onSearch = async (query, setFilteredRecipes, setSelectedRecipe, setShowOptions) => {
    // setLoading(true);
    try {
        const recipes = await receipts.getRecipeBySearch(query);//await axios.get(`http://localhost:3001/api/recipes`);
        setFilteredRecipes(recipes);
        setSelectedRecipe(recipes.length === 1 ? recipes[0] : undefined);
        setShowOptions(false);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
};

const Search = ({ setFilteredRecipes, setSelectedRecipe, setShowOptions }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('query', query);
        if (query.trim()) {
            setSelectedRecipe(undefined);
            onSearch(query, setFilteredRecipes, setSelectedRecipe, setShowOptions);
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
