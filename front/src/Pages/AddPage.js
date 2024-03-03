import * as React from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const baseURL = "http://127.0.0.1:8080/trouble/"

const Add = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [name, setName] = React.useState('');
  const [body, setBody] = React.useState('');
  const addBlog = () => {
    const titleOk = title.length !== 0;
    const nameOk = name.length !== 0;
    const bodyOk = body.length !== 0;
    if (titleOk && nameOk && bodyOk) {
      axios.post(baseURL, {
        title: String(title),
        name: String(name),
        body: String(body),
      })
      .then(() => {
        setTitle('');
        setName('');
        setBody('');
        navigate('/');
      })
    }
  }
  return (
    <>
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <Grid container alignItems='center' justify='center' direction="column">
        <Grid item>
          <Typography 
            variant="h4" 
            style={{ 
              margin: 20, 
              fontFamily:'serif' 
            }}
          >
            悩みや課題を投稿してください
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-multiline-flexible"
            label="タイトル"
            multiline
            maxRows={4}
            style={{ 
              margin: 20, 
              fontFamily:'serif',
              width: '50vw',
            }}
            onChange={(e)=>{setTitle(e.target.value)}}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-multiline-flexible"
            label="名前"
            multiline
            maxRows={4}
            style={{ 
              margin: 20, 
              fontFamily:'serif',
              width: '55vw',
            }}
            onChange={(e)=>{setName(e.target.value)}}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-multiline-static"
            label="悩みや課題"
            multiline
            rows={15}
            style={{ 
              margin: 20, 
              fontFamily:'serif',
              width: '60vw',
            }}
            onChange={(e)=>{setBody(e.target.value)}}
          />
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => {
              addBlog();
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
          >投稿</Button>
        </Grid>
      </Grid>
      </Box>
    </>
  )
}

export default Add;