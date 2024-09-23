import React, { useState } from 'react';
import axios from 'axios';
import receipts from './services/recipeService';

const onSearch = async (setRecipes, query, setFilteredRecipes, setShowOptions) => {
    // setLoading(true);
    try {
        const titles = await receipts.getReceipts();//await axios.get(`http://localhost:3001/api/recipes`);
        const regex = new RegExp(`\\b${query}\\b`, 'i');
        const filteredRec = titles.map((recipe) => {
            if (regex.test(recipe.title)) {
                console.log('found query', recipe.title);
                return {
                    id: recipe.id,
                    title: recipe.title,
                    content: recipe.content,
                    likes: recipe.likes,
                    user: recipe.user
                };
            }
        }).filter(Boolean);
        console.log('filteredRec', filteredRec);
        setFilteredRecipes(filteredRec);
        setShowOptions(false);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
};

const Search = ({ setFilteredRecipes, setSelectedRecipe, setShowOptions }) => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('query', query);
        if (query.trim()) {
            setSelectedRecipe(undefined);
            onSearch(setRecipes, query, setFilteredRecipes, setShowOptions);
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
