import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import recipeService from './services/recipeService';

const RecipeList = ({ recipes, onSelectRecipe, setRecipe, setShowCreateRecipe, editRef, showOptions, setFilteredRecipes }) => {
  const selectRecipe = (setRecipe, recipe, setShowCreateRecipe, editRef) => {
    setRecipe(recipe);
    setShowCreateRecipe(true);
    editRef.current = true;
  }
  const deleteRecipe = (recipe, recipes, setFilteredRecipes) => {
    try {
      recipeService.deleteReceipt(recipe.id);
      setFilteredRecipes(recipes.filter((r) => r.id !== recipe.id));
      alert('Recipe deleted successfully!');
    } catch (error) {
      alert('Failed to delete recipe');
    }
  }
  return (
    <>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-list">
          <div
            className="recipe-item"
            onClick={() => onSelectRecipe(recipe.id)}
          >
            {/* <img src={recipe.image_url} alt={recipe.title} /> */}
            <h3>{recipe.title}</h3>
          </div>
          {showOptions && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
            <EditIcon onClick={() => { selectRecipe(setRecipe, recipe, setShowCreateRecipe, editRef) }} style={{ fontSize: 40 }} />
            <DeleteForeverIcon onClick={() => { deleteRecipe(recipe, recipes, setFilteredRecipes) }} style={{ fontSize: 40 }} />
          </div>
          }
        </div>
      ))}
    </>
  );
};

export default RecipeList;
