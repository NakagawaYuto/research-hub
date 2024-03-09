import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, TextField } from '@mui/material';

const baseURL = 'http://127.0.0.1:8080/users/';

const AddUserPage = () => {
  const [name, setName] = useState('');
  const [student_id, setStudent_id] = useState('');
  const [research_theme, setResearch_theme] = useState('');
  const [novelty, setNovelty] = useState('');
  const [memo, setMemo] = useState('');

  const addUser = async () => {
    const newUser = {
      name: name,
      student_id: student_id,
      research_theme: research_theme,
      novelty: novelty,
      memo: memo,
    };

    try {
      const response = await axios.post(baseURL, newUser);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant='h4' align='center' sx={{ mt: 6 }}>
        ユーザー追加
      </Typography>
      <Box sx={{ position: 'relative', mt: 8 }}>
        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <Button
            variant='contained'
            sx={{
              position: 'absolute',
              left: 0,
              top: -100,
              width: '65px',
              height: '40px',
              backgroundColor: 'white',
              color: 'black',
              borderColor: 'black',
              borderWidth: 2,
              borderStyle: 'solid'
            }}
          >
            <Typography variant="h7">
              戻る
            </Typography>
          </Button>
        </Link>
        <TextField
          fullWidth
          variant='outlined'
          placeholder='名前'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 4 }}
        />
        <TextField
          fullWidth
          variant='outlined'
          placeholder='学籍番号'
          value={student_id}
          onChange={(e) => setStudent_id(e.target.value)}
          required
          sx={{ mb: 4 }}
        />
        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={addUser}
            sx={{
              position: 'absolute',
              right: 0,
              bottom: -120,
              width: '150px',
              height: '50px',
            }}
          >
            <Typography variant="h6">
              追加
            </Typography>
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default AddUserPage;
