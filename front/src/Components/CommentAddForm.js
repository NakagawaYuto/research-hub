import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const CommentAddForm = ({ postId }) => {
  //const navigate = useNavigate();
  const [name, setName] = useState('');
  const [body, setBody] = useState('');

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
        //navigate('/');
        window.location.reload();
      })
    }
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ margin: '20px 0', fontFamily: 'serif' }}>
        コメントを入力する
      </Typography>
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
        <Button type="submit" variant="contained" color="primary"　onClick={() => {
              addComment();
            }}>
          投稿
        </Button>
      </form>
    </div>
  );
};

export default CommentAddForm;