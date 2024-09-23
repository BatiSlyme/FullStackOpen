import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from './Logout';
import recipeService from './services/recipeService';

const getAllRecipes = async (setReceipts, setShowCreateRecipe, setShowOptions) => {
    setShowCreateRecipe(false);
    const recipes = await recipeService.getReceipts()
    setReceipts(recipes);
    setShowOptions(false);
}

const getMyRecipes = async (setReceipts, setShowCreateRecipe, setShowOptions) => {
    setShowCreateRecipe(false);
    const recipes = await recipeService.getAllReceiptsByUser()
    setReceipts(recipes);
    setShowOptions(true);
}

export default function NavBar({ setShowLogin, userName, setUsername, setReceipts, setShowCreateRecipe, setShowOptions }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button style={{ color: 'white', fontWeight: 'bold' }} onClick={() => { getAllRecipes(setReceipts, setShowCreateRecipe, setShowOptions) }}>Recipes</Button>
                    {userName && <Button style={{ color: 'white', fontWeight: 'bold' }} onClick={() => { setShowCreateRecipe(true) }}>Create Recipe</Button>}

                    {userName && <Typography onClick={() => { getMyRecipes(setReceipts, setShowCreateRecipe, setShowOptions) }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Recipes
                    </Typography>}
                    <div>
                        {userName ? <div className='welcome'> Welcome {userName}! <Logout setUsername={setUsername} /> </div> : <Button color="inherit" onClick={() => { setShowLogin(true) }}>Login</Button>}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}