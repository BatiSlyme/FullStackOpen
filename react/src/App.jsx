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
import CircularProgress from '@mui/material/CircularProgress';
import Loader from './Loader';
import SignUp from './SignUp';

const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUsername] = useState();
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateRecipe, setShowCreateRecipe] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showSingUp, setShowSingUp] = useState(false);
  const editRef = useRef();

  const selectRecipe = async (id) => {
    setLoading(true);
    try {
      const content = await recipeService.getReceiptById(id);
      setSelectedRecipe(content.content);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // setShowCreateRecipe(filteredRecipes.length > 0);
    setSelectedRecipe(filteredRecipes.length === 1 ? filteredRecipes[0] : undefined);
    console.log('filteredRecipes', filteredRecipes);
  }, [filteredRecipes]);

  useEffect(() => {
    if (!userName) {
      setSelectedRecipe();
      setFilteredRecipes([]);
      setShowCreateRecipe(false);
      setShowOptions(false);
      editRef.current = false;
      setShowCreateRecipe(false);
      setShowSingUp(false);
    }
  }, [userName]);

  return (
    <div style={{ width: '100%', }} >
      <Loader />
      <div style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <Header />
        <NavBar
          setShowLogin={setShowLogin}
          userName={userName}
          setUsername={setUsername}
          setReceipts={setFilteredRecipes}
          setShowCreateRecipe={setShowCreateRecipe}
          setShowOptions={setShowOptions}
          editRef={editRef}
          setShowSingUp={setShowSingUp} />
        <Login
          setUser={setUsername}
          showLogin={showLogin}
          setShowLogin={setShowLogin} />
        <SignUp
          setShowSingUp={setShowSingUp}
          showSingUp={showSingUp}
        />
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
              setSelectedRecipe={setSelectedRecipe}
              // onSelectRecipe={selectRecipe}
              setRecipe={setRecipe}
              setShowCreateRecipe={setShowCreateRecipe}
              editRef={editRef}
              showOptions={showOptions}
              setFilteredRecipes={setFilteredRecipes} />}
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
          recipes={filteredRecipes}
          setFilteredRecipes={setFilteredRecipes}
          edit={editRef.current}
          recipe={recipe}
          setShowCreateRecipe={setShowCreateRecipe}
        />}
      {/* </div> */}
    </div>
  );
};

export default App;
