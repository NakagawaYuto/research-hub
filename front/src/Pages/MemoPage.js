import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Header from '../components/Header';

const baseURL = 'http://127.0.0.1:8080/users/';

const pageStyle = {
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
};

const textFieldStyle = {
  mb: 6,
  bgcolor: 'white',
  borderRadius: '5px',
};

const MemoPage = () => {
  const [memo, setMemo] = useState('');
  const { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}${user_id}/`);
        setMemo(response.data.memo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user_id]);

  const saveMemo = async (updatedMemo) => {
    try {
      await axios.patch(`${baseURL}${user_id}/`, { memo: updatedMemo });
    } catch (error) {
      console.error(error);
    }
  }

  const handleMemoChange = (e) => {
    const updatedMemo = e.target.value;
    setMemo(updatedMemo);
    saveMemo(updatedMemo);
  };

  return (
    <div style={pageStyle}>
      <Header />

      <Grid container item xs={12}>
        <Grid item xs={3}>
          <IconButton onClick={() => navigate(`/user/${user_id}`)} style={{ fontFamily: 'Meiryo', fontSize: '20px', fontWeight: 'bold', color: '#666', marginTop: '0px', marginLeft: '20px' }}>
            <ArrowBackIosIcon />
            <Typography>
              戻る
            </Typography>
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h4' style={{ fontFamily: 'Meiryo' }} align='center' sx={{ mt: 4, mb: 6 }}>
            メモ
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item xs={6}>
          <TextField
            fullWidth
            multiline
            rows={8}
            variant='outlined'
            placeholder='メモを入力してください。'
            value={memo}
            onChange={handleMemoChange}
            sx={textFieldStyle}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MemoPage;
