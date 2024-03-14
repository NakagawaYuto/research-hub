import * as React from 'react';
import Button from '@mui/material/Button';
import axios from "axios";

const baseURL = "http://127.0.0.1:8080/todo/todo/"

const Donebutton = ({ doneTarget,Target }) => {
   


    
    return (
        <Button 
        variant="contained" 
        onClick={() => {
            doneTarget(Target);
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
      >完了</Button>
    )
}
  
  
export default Donebutton;