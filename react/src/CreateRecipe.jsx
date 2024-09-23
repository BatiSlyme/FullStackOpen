import { useEffect, useState } from "react";
import recipeService from "./services/recipeService";

const CreateRecipe = ({ userName, setShowCreateRecipe, edit, recipe }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    useEffect(() => {
        console.log('edit', edit);
        if (edit) {
            setTitle(recipe.title);
            setContent(recipe.content);
        } else {
            setTitle();
            setContent();
        }
    }, [edit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (edit) {
            try {
                await recipeService.updateReceipt(recipe.id, { title: title, content: content, likes: recipe.likes, userName: userName });
                setTitle('');
                setContent('');
                setError('');
                setShowCreateRecipe(false);
                alert('Recipe edited successfully!');

            } catch (error) {
                console.error("Error creating recipe:", error);
                setError('Failed to create recipe');
            }
        } else {
            try {
                await recipeService.createReceipt({ title: title, content: content, userName: userName });
                setTitle('');
                setContent('');
                setError('');
                setShowCreateRecipe(false);
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
            <form  onSubmit={handleSubmit}>
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