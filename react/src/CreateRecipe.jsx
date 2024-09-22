import { useState } from "react";
import receipts from "./services/receipts";

const CreateRecipe = ({ userName, setShowCreateRecipe }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const recipe = await receipts.createReceipt({ title: title, content: content, userName: userName });
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

    return (
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
    );
}

export default CreateRecipe;