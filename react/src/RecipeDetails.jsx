import axios from 'axios';
import { useEffect, useState } from 'react';

const RecipeDetails = ({ recipe }) => {
    const [img, setImg] = useState(null);
    

    console.log('recipe', recipe);

    // useEffect(() => {
    //     if (recipe) {
    //         getImg(recipe.title)
    //     }
    // }, [recipe]);

    return (
        <div className="recipe-details">
            {/* <button onClick={() => getImg(recipe.title)}>Generate Image</button> */}
            {/* <img src={img} alt={recipe.title} /> */}
            <h2>{recipe.title}</h2>
            <p>Cooking Time: <z>{recipe.cookingTime}mins</z></p>
            <p>Servings: <z>{recipe.servings}</z> </p>

            <h2>Ingredients:</h2>
            <ul>
                {(recipe.ingredients || []).map((ing, index) => (
                    <li key={index}>{ing}</li>
                ))}
            </ul>
            <h2>Instructions:</h2>
            {recipe.content}
        </div>
    );
};

export default RecipeDetails;
