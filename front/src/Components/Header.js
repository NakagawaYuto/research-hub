import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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
