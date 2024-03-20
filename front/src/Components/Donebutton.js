import * as React from 'react';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

const Donebutton = ({ doneTarget,Target, }) => {

    
    return (
      


      
        
        <IconButton 
                  aria-label="delete" 
                  size="inherit"
                  style={{ 
                    background: '#1976d2', 
                    margin:5,
                    boxShadow: '2px 2px 2px rgba(0,0,0,0.3)'
                  }}
                  onClick={() => {
                    doneTarget(Target);
                  }}
                >
                  <CheckIcon 
                    fontSize="large"
                    style={{ color: '#eceff1' }}
                  />
                </IconButton>
    )
}
  
  
export default Donebutton;