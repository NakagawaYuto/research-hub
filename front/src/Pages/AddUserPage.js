import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Button, Box, TextField } from '@mui/material';

const baseURL = 'http://127.0.0.1:8080/users/';

const AddUserPage = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [researchTheme, setResearchTheme] = useState('');
  const [novelty, setNovelty] = useState('');
  const [memo, setMemo] = useState('');

  const addUser = () => {
    const newUser = {
      name: name,
      student_id: studentId,
      research_theme: researchTheme,
      novelty: novelty,
      memo: memo,
    };

    axios.post(baseURL, newUser)
      .then((response) => {
        console.log(response.data);
        // ユーザー追加後の処理（成功メッセージの表示など）
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' align='center'>
          ユーザー追加
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='名前（必須）'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='学籍番号（必須）'
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='研究テーマ（任意）'
            value={researchTheme}
            onChange={(e) => setResearchTheme(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='新規性（任意）'
            value={novelty}
            onChange={(e) => setNovelty(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='メモ（任意）'
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={addUser}>
            追加
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddUserPage;
