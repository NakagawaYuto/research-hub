import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, TextField, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const baseURL = 'http://127.0.0.1:8080/users/';

const pageStyle = {
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
};

const textFieldStyle = {
  mb: 2,
  bgcolor: 'white',
  borderRadius: '5px',
};

const buttonStyle = {
  position: 'absolute',
  right: 0,
  bottom: -120,
  width: '150px',
  height: '50px',
  mt: 2,
  bgcolor: '#1976d2',
  '&:hover': {
    bgcolor: '#115293',
  },
};

const AddUserPage = () => {
  const [name, setName] = useState('');
  const [student_id, setStudent_id] = useState('');
  const navigate = useNavigate();

  const addUser = async () => {
    const newUser = {
      name: name,
      student_id: student_id,
      research_theme: '',
      novelty: '',
      memo: '',
    };

    try {
      const response = await axios.post(baseURL, newUser);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={pageStyle}>
      <Header />

      <Container maxWidth="lg">
        <IconButton onClick={() => navigate('/')} style={{ fontFamily: 'Meiryo', fontSize: '20px', fontWeight: 'bold', color: '#666', marginTop: '0px', marginLeft: '20px' }}>
          <ArrowBackIosIcon />
          <Typography>
            ユーザーページへ戻る
          </Typography>
        </IconButton>
        <Typography variant='h4' align='center' sx={{ mt: 6 }}>
          ユーザー追加
        </Typography>
        <Box sx={{ position: 'relative', mt: 8 }}>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='名前'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            variant='outlined'
            placeholder='学籍番号'
            value={student_id}
            onChange={(e) => setStudent_id(e.target.value)}
            required
            sx={textFieldStyle}
          />
          <Button
            variant='contained'
            onClick={addUser}
            sx={buttonStyle}
          >
            <Typography variant="h6">
              追加
            </Typography>
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default AddUserPage;
