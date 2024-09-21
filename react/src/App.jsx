import React, { useState, useEffect } from 'react';
import Header from './Header';
import Search from './Search';
import RecipeList from './RecipeList';
import axios from 'axios'
import RecipeDetails from './RecipeDetails';
import './App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [setFilteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (query) => {
    setLoading(true);
    try {
      const titles = await axios.get(`http://localhost:3001/api/recipes`);
      setRecipes(titles.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    setLoading(false);
  };

  const selectRecipe = async (id) => {
    setLoading(true);
    try {
      const content = await axios.get(`http://localhost:3001/api/recipes/${id}`);
      setSelectedRecipe(content.data.content);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ width: '100%' }} >
      <Header />
      <div className="container">
        <Search onSearch={fetchRecipes} recipes={recipes} setFilteredRecipes={setFilteredRecipes} />
        {loading && <p>Loading...</p>}
        <div className="app-body">
          <div className="recipe-list-container">
            <RecipeList recipes={recipes} onSelectRecipe={selectRecipe} />
          </div>
          {selectedRecipe && (
            <div style={{ width: '100%' }}>
              <RecipeDetails recipe={selectedRecipe} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
