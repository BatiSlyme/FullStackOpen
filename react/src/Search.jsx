import React, { useState } from 'react';
import axios from 'axios';

const onSearch = async (setRecipes, query, setFilteredRecipes) => {
    // setLoading(true);
    try {
        const titles = await axios.get(`http://localhost:3001/api/recipes`);
        const regex = new RegExp(`\\b${query}\\b`, 'i');
        const filteredRec = titles.data.map((recipe) => {
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
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
};

const Search = ({ setFilteredRecipes }) => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('query', query);

        if (query.trim()) {
            onSearch(setRecipes, query, setFilteredRecipes);
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
