import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import recipeService from './services/recipeService';

const RecipeList = ({ recipes, setSelectedRecipe, setRecipe, setShowCreateRecipe, editRef, showOptions, setFilteredRecipes }) => {
  const [list, setList] = useState(recipes);

  const setEditRecipe = (setRecipe, recipe, setShowCreateRecipe, editRef) => {
    setRecipe(recipe);
    setShowCreateRecipe(true);
    editRef.current = true;
  }
  const deleteRecipe = (recipe, recipes, setFilteredRecipes) => {
    try {
      const conf = confirm('Are you sure you want to delete this recipe?');
      if (!conf) return;
      recipeService.deleteReceipt(recipe.id);
      setFilteredRecipes(recipes.filter((r) => r.id !== recipe.id));
      alert('Recipe deleted successfully!');
    } catch (error) {
      alert('Failed to delete recipe');
    }
  }

  const selectRecipeForDesc = async (recipe, setSelectedRecipe, setFilteredRecipes) => {
    try {
      const content = await recipeService.getReceiptById(recipe.id);
      setSelectedRecipe(content.content);
      setFilteredRecipes([recipe]);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  return (
    <>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-list">
          <div
            className="recipe-item"
            onClick={() => { selectRecipeForDesc(recipe, setSelectedRecipe, setFilteredRecipes) }}
          >
            {/* <img src={recipe.image_url} alt={recipe.title} /> */}
            <h3>{recipe.title}</h3>

          </div>
          {showOptions &&
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
              <EditIcon className="recipe-item-options" onClick={() => { setEditRecipe(setRecipe, recipe, setShowCreateRecipe, editRef) }} style={{ fontSize: 40 }} />
              <DeleteForeverIcon className="recipe-item-options" onClick={() => { deleteRecipe(recipe, recipes, setFilteredRecipes) }} style={{ fontSize: 40 }} />
            </div>}

        </div >
      ))}
    </>
  );
};

export default RecipeList;
