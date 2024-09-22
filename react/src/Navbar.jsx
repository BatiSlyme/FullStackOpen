import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from './Logout';
import receipts from './services/receipts';

const getAllRecipes = async (setReceipts, setShowCreateRecipe) => {
    console.log(setReceipts);
    setShowCreateRecipe(false);
    const recipes = await receipts.getReceipts()
    setReceipts(recipes);
}

export default function NavBar({ setShowLogin, userName, setUsername, setReceipts, setShowCreateRecipe }) {
    console.log('setReceipts', setReceipts);
    console.log('setUsername', setUsername);
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
                    <Button style={{ color: 'white', fontWeight: 'bold' }} onClick={() => { getAllRecipes(setReceipts, setShowCreateRecipe) }}>Recipes</Button>
                    {userName && <Button style={{ color: 'white', fontWeight: 'bold' }} onClick={() => { setShowCreateRecipe(true) }}>Create Recipe</Button>}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>
                    {userName ? <div className='welcome'> Welcome {userName}! <Logout setUsername={setUsername} /> </div> : <Button color="inherit" onClick={() => { setShowLogin(true) }}>Login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}