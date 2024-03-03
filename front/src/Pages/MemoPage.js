import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Box, TextField } from '@mui/material';

const baseURL = 'http://127.0.0.1:8080/users/';

const MemoPage = () => {
  const [memo, setMemo] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}${id}/`);
        setMemo(response.data.memo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const saveMemo = async () => {
    try {
      await axios.patch(`${baseURL}${id}/`, { memo: memo });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container maxWidth="lg">
      <Typography variant='h4' align='center' sx={{ mt: 6 }}>
        メモ
      </Typography>
      <Box sx={{ position: 'relative', mt: 8 }}>
        <TextField
          fullWidth
          multiline
          rows={8}
          variant='outlined'
          placeholder='メモを入力してください。'
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <Link to={`/user/${id}/`} style={{ textDecoration: 'none' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={saveMemo}
            sx={{
              position: 'absolute',
              right: 0,
              bottom: -120,
              width: '150px',
              height: '50px',
            }}
          >
            <Typography variant="h6">
              保存
            </Typography>
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default MemoPage;
