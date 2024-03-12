import * as React from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [name, setName] = React.useState('');
  const [body, setBody] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const { user_id } = useParams();

  const baseURL = "http://127.0.0.1:8080/trouble/trouble/";

  const pageStyle = {
    backgroundColor: '#f5f5f5', // 薄いグレー
    minHeight: '100vh', // 画面全体の高さに背景を広げる
  };

  const addBlog = () => {
    const titleOk = title.length !== 0;
    const nameOk = name.length !== 0;
    const bodyOk = body.length !== 0;
    if (titleOk && nameOk && bodyOk) {
      axios.post(baseURL, {
        title: String(title),
        name: String(name),
        body: String(body),
        user: String(user_id),
      })
      .then(() => {
        setTitle('');
        setName('');
        setBody('');
        navigate('/user/'+String(user_id)+'/trouble/');
      })
    } else {
      setErrorMessage('全ての項目を入力してください');
      window.scrollTo({ top: 0, behavior: 'smooth' }); // ページ上部にスクロール
    }
  }
  return (
    <div style={pageStyle}>
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <Grid container alignItems='center' justify='center' direction="column">
      <Card
        sx={{ width: '55vw', pt: 3, pb: 3, pl: 1, pr: 1}} 
        elevation={1} 
        style={{
        margin: '10px 0px 30px 0px',
        display: 'flex',
        justifyContent: 'center', // カードの内部で要素を左右に配置
        alignItems: 'center', // カードの内部で要素を中央に配置
        }}
      >
      <Grid container alignItems='center' justify='center' direction="column">
        {errorMessage && ( // エラーメッセージがある場合に表示
          <Grid item>
            <Typography 
              variant="body1" 
              style={{ 
                margin: 10, 
                fontFamily:'serif',
                color: 'red'
              }}
            >
              {errorMessage}
            </Typography>
          </Grid>
        )}
        <Grid item>
          <TextField
            id="outlined-multiline-flexible"
            label="タイトル"
            multiline
            maxRows={4}
            style={{ 
              margin: 10, 
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
              margin: 10, 
              fontFamily:'serif',
              width: '50vw',
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
              margin: 10, 
              fontFamily:'serif',
              width: '50vw',
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
              color: "white",
              fontSize: 20,
              fontFamily: 'Meiryo',
              fontWeight: 'normal',
              background: "primary",
              padding: 5,
              borderRadius: 5,
              boxShadow: '5px 5px 5px rbga(0,0,0,0.3)',
            }}
            size="large"
          >投稿</Button>
        </Grid>
      </Grid>
      </Card>
      </Grid>
      </Box>
    </div>
  )
}

export default Add;