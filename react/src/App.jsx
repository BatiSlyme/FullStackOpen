import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Search from './Search';
import RecipeList from './RecipeList';
import axios from 'axios'
import RecipeDetails from './RecipeDetails';
import './App.css';
import Login from './Login';
import NavBar from './NavBar';
import CreateRecipe from './CreateRecipe';
import recipeService from './services/recipeService';

const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUsername] = useState();
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateRecipe, setShowCreateRecipe] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const editRef = useRef();

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

  useEffect(() => {
    if (filteredRecipes.length > 0) {
      setShowCreateRecipe(false);
      setSelectedRecipe();
    }
  }, [filteredRecipes]);

  useEffect(() => {
    if (!userName) {
      setSelectedRecipe();
      setFilteredRecipes([]);
      setShowCreateRecipe(false);
      setShowOptions(false);
    }
  }, [userName]);

  return (
    <div style={{ width: '100%', }} >
      <div style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <Header />
        <NavBar
          setShowLogin={setShowLogin}
          userName={userName}
          setUsername={setUsername}
          setReceipts={setFilteredRecipes}
          setShowCreateRecipe={setShowCreateRecipe}
          setShowOptions={setShowOptions} />
        <Login
          setUser={setUsername}
          showLogin={showLogin}
          setShowLogin={setShowLogin} />
      </div>
      {/* <div className="container"> */}
      <Search
        setFilteredRecipes={setFilteredRecipes}
        setSelectedRecipe={setSelectedRecipe}
        setShowOptions={setShowOptions} />
      {loading && <p>Loading...</p>}
      <div className="app-body">
        <div className="recipe-list-container">
          {(!showCreateRecipe && filteredRecipes.length > 0) &&
            <RecipeList
              recipes={filteredRecipes}
              onSelectRecipe={selectRecipe}
              setRecipe={setRecipe}
              setShowCreateRecipe={setShowCreateRecipe}
              editRef={editRef}
              showOptions={showOptions} />}
        </div>
        {(!showCreateRecipe && selectedRecipe) && (
          <div style={{ width: '100%' }}>
            <RecipeDetails
              recipe={selectedRecipe}
            />
          </div>
        )}

      </div>
      {showCreateRecipe &&
        <CreateRecipe
          edit={editRef.current}
          recipe={recipe}
          userName={userName}
          setShowCreateRecipe={setShowCreateRecipe}
        />}
      {/* </div> */}
    </div>
  );
};

export default App;
