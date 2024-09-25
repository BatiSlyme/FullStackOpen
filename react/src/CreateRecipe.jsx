import { useEffect, useState } from "react";
import recipeService from "./services/recipeService";

const CreateRecipe = ({ recipes, setFilteredRecipes, setShowCreateRecipe, edit, recipe }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [servings, setServings] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [error, setError] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleCookingTimeChange = (e) => {
        setCookingTime(e.target.value);
    }

    const handleServingsChange = (e) => {
        setServings(e.target.value);
    }

    const handleIngredientsChange = (e) => {
        setIngredients(e.target.value);
    }

    useEffect(() => {
        console.log('edit', edit);
        if (edit) {
            setTitle(recipe.title);
            setContent(recipe.content);
            setServings(recipe.servings);
            setCookingTime(recipe.cookingTime);
            setIngredients(recipe.ingredients.join(', '));
        } else {
            setTitle();
            setContent();
            setServings();
            setCookingTime();
            setIngredients();
        }
    }, [edit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ingArr = ingredients.split(', ');
        if (edit) {
            const newRecipe = {
                title: title,
                content: content,
                likes: recipe.likes,
                cookingTime: Number(cookingTime),
                servings: Number(servings),
                ingredients: ingArr
            };
            try {
                await recipeService.updateReceipt(
                    recipe.id,
                    newRecipe
                );
                setTitle('');
                setContent('');
                setServings('');
                setCookingTime('');
                setIngredients('');
                setError('');
                setShowCreateRecipe(false);
                alert('Recipe edited successfully!');
                setFilteredRecipes((prev) => prev.map((r) => r.id === recipe.id ? { ...r, ...newRecipe } : r));

            } catch (error) {
                console.error("Error creating recipe:", error);
                setError('Failed to create recipe');
            }
        } else {
            const newRecipe = {
                title: title,
                content: content,
                cookingTime: Number(cookingTime),
                servings: Number(servings),
                ingredients: ingArr
            };
            try {
                await recipeService.createReceipt(newRecipe);
                setTitle('');
                setContent('');
                setServings('');
                setCookingTime('');
                setIngredients('');
                setError('');
                setShowCreateRecipe(false);
                const copy = [...recipes];
                copy.push(newRecipe);
                setFilteredRecipes(copy);
                alert('Recipe created successfully!');
            } catch (error) {
                console.error("Error creating recipe:", error);
                setError('Failed to create recipe');
            }
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            {edit ? <h2>Edit {recipe.title}</h2> : <h2>Create a new recipe</h2>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        required
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cookingTime">Cooking Time:</label>
                    <textarea
                        rows="4" cols="50"
                        required
                        type="text"
                        id="cookingTime"
                        value={cookingTime}
                        onChange={handleCookingTimeChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="servings">Servings:</label>
                    <textarea
                        rows="4" cols="50"
                        required
                        type="text"
                        id="servings"
                        value={servings}
                        onChange={handleServingsChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea
                        rows="4" cols="50"
                        required
                        type="text"
                        id="ingredients"
                        value={ingredients}
                        onChange={handleIngredientsChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        rows="4" cols="50"
                        required
                        type="text"
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>
                <button type="submit">Submit</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
}

export default CreateRecipe;