import React from 'react';

const RecipeDetails = ({ recipe }) => {
    return (
        <div className="recipe-details">
            <img src={recipe.image_url} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <p>Cooking Time: 123 minutes</p>
            <p>Servings: 2</p>

            <h3>Ingredients:</h3>
            <ul>
                {recipe}
                {/* {recipe.ingredients.map((ing, index) => (
                    <li key={index}>{ing.quantity} {ing.unit} {ing.description}</li>
                ))} */}
            </ul>
        </div>
    );
};

export default RecipeDetails;
