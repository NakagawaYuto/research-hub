import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const HomeHeader = () => {
    return (
        <Box sx={{ flexGrow: 1 }} style={{ marginBottom: 20 }}>
            <AppBar position="static" style={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <Typography component="div" sx={{ flexGrow: 1 }} color="primary" style={{ fontFamily: 'Arial Black', fontSize: '25px', fontWeight: 'bold' }}>
                        Research Hub
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default HomeHeader;