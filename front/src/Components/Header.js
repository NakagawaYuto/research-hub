import React from 'react';
import { Typography, Box, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }} style={{ marginBottom: 20 }}>
            <AppBar position="static" style={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <Button>
                        <Typography onClick={() => navigate('/')} component="div" sx={{ flexGrow: 1 }} color="primary" style={{ fontFamily: 'Arial Black', fontSize: '25px', fontWeight: 'bold' }}>
                            Research Hub
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;