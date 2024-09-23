import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const RecipeList = ({ recipes, onSelectRecipe, setRecipe, setShowCreateRecipe, editRef, showOptions }) => {
  const selectRecipe = (setRecipe, recipe, setShowCreateRecipe, editRef) => {
    setRecipe(recipe);
    setShowCreateRecipe(true);
    editRef.current = true;
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
            <DeleteForeverIcon style={{ fontSize: 40 }} />
          </div>
          }
        </div>
      ))}
    </>
  );
};

export default RecipeList;
