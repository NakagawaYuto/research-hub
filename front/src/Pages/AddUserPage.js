import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Header from '../components/Header';

import createAxiosInstance from '../createAxiosInstance';


const baseURL = 'users/';

const pageStyle = {
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
};

const textFieldStyle = {
  mb: 6,
  bgcolor: 'white',
  borderRadius: '5px',
};

const buttonStyle = {
  width: '150px',
  height: '50px',
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
      const ax = createAxiosInstance();
      const response = await ax.post(baseURL, newUser);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={pageStyle}>
      <Header />

      <Grid container item xs={12}>
        <Grid item xs={3}>
          <IconButton onClick={() => navigate('/')} style={{ fontFamily: 'Meiryo', fontSize: '20px', fontWeight: 'bold', color: '#666', marginTop: '0px', marginLeft: '20px' }}>
            <ArrowBackIosIcon />
            <Typography>
              戻る
            </Typography>
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h4' style={{ fontFamily: 'Meiryo' }} align='center' sx={{ mt: 4, mb: 6 }}>
            ユーザー追加
          </Typography>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Grid item xs={6}>
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
            <Box display="flex" justifyContent="center">
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
          </Grid>
        </Grid>
      </Grid >
    </div >
  );
};

export default AddUserPage;
