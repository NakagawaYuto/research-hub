import * as React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

const Editbutton = ({ editTarget,Target, }) => {

    
    return (
        <Button 
        variant="contained" 
        onClick={() => {
            editTarget(Target);
        }}
        style={{
          width: 100,
          color: "#e0f2f1",
          fontSize: 25,
          fontFamily: 'serif',
          background: "#3c3c3c",
          padding: 3,
          borderRadius: 5,
          boxShadow: '5px 5px 5px rbga(0,0,0,0.3)',
        }}
        size="large"
      >編集</Button>
    )
}
  
  
export default Editbutton;

