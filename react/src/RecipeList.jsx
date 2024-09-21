import React from 'react';

const RecipeList = ({ recipes, onSelectRecipe }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="recipe-item"
          onClick={() => onSelectRecipe(recipe.id)}
        >
          {/* <img src={recipe.image_url} alt={recipe.title} /> */}
          <h3>{recipe.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
