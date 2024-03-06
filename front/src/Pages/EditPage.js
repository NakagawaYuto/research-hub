import * as React from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


const Edit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const baseURL = "http://127.0.0.1:8080/trouble/" + String(params.id) + "/"
  const [trouble, setTrouble] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [name, setName] = React.useState('');
  const [body, setBody] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  // 初回ロード時の処理を記述する.
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      const { title, name, body } = response.data;
      setTitle(title);
      setName(name);
      setBody(body);
      setTrouble(response.data);
     });
  }, []);
  if (!trouble) return null;

  const updateBlog = () => {
    const titleOk = title.length !== 0;
    const nameOk = name.length !== 0;
    const bodyOk = body.length !== 0;
    if (titleOk && nameOk && bodyOk) {
      axios.patch(baseURL, { //patchで上書きする
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
    } else {
      setErrorMessage('全ての項目を入力してください');
      window.scrollTo({ top: 0, behavior: 'smooth' }); // ページ上部にスクロール
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
            悩みや課題の編集をする
          </Typography>
        </Grid>
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
              margin: 20, 
              fontFamily:'serif',
              width: '50vw',
            }}
            value={title}
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
            value={name}
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
            value={body}
            onChange={(e)=>{setBody(e.target.value)}}
          />
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={() => {
              updateBlog();
            }}
            style={{
              width: 200,
              color: "#e0f2f1",
              fontSize: 25,
              fontFamily: 'serif',
              background: "#3c3c3c",
              padding: 3,
              borderRadius: 5,
              boxShadow: '5px 5px 5px rbga(0,0,0,0.3)',
            }}
            size="large"
          >編集して投稿</Button>
        </Grid>
      </Grid>
      </Box>
    </>
  )
}

export default Edit;