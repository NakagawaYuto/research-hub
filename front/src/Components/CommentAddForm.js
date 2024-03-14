import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';



const CommentAddForm = ({ postId }) => {
  //const navigate = useNavigate();
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const baseURL = "http://127.0.0.1:8080/comment/"

  const addComment = () => {
    const nameOk = name.length !== 0;
    const bodyOk = body.length !== 0;
    if (nameOk && bodyOk) {
      axios.post(baseURL, {
        name: String(name),
        body: String(body),
        trouble:String(postId),
      })
      .then(() => {
        setName('');
        setBody('');
        window.location.reload();
      })
    }
    else{
      setErrorMessage('全ての項目を入力してください');
    }
  }

  return (
    <div>
      <Typography variant="h4" align="left" style={{ fontFamily: 'Meiryo', fontSize: '20px', fontWeight: 'bold', color: '#333', marginTop: '30px', marginBottom: '10px'}}>
        コメントを入力する
      </Typography>

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

      <form>
        <TextField
          fullWidth
          label="名前"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="コメント"
          multiline
          rows={4}
          variant="outlined"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          margin="normal"
        />
      </form>
      <Button type="submit" variant="contained" color="primary" style={{marginTop: '15px'}}onClick={() => {
        addComment();
        }}>
        投稿
      </Button>
    </div>
  );
};

export default CommentAddForm;