import * as React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Deletebutton = ({ delTarget,Target, }) => {

    
    return (
        <IconButton 
                  aria-label="delete" 
                  size="inherit"
                  style={{ 
                    background: '#8d6e63', 
                    margin:5,
                    boxShadow: '2px 2px 2px rgba(0,0,0,0.3)'
                  }}
                  onClick={() => {
                    delTarget(Target);
                  }}
                >
                  <DeleteIcon 
                    fontSize="large"
                    style={{ color: '#eceff1' }}
                  />
                </IconButton>
    )
}
  
  
export default Deletebutton;