import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Box, TextField } from '@mui/material';

const baseURL = 'http://127.0.0.1:8080/users/';

const NoveltyPage = () => {
  const [novelty, setNovelty] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}${id}/`);
        setNovelty(response.data.novelty);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const saveNovelty = async () => {
    try {
      await axios.patch(`${baseURL}${id}/`, { novelty: novelty });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container maxWidth="lg">
      <Typography variant='h4' align='center' sx={{ mt: 6 }}>
        新規性
      </Typography>
      <Box sx={{ position: 'relative', mt: 8 }}>
        <TextField
          fullWidth
          multiline
          rows={8}
          variant='outlined'
          placeholder='新規性を入力してください。'
          value={novelty}
          onChange={(e) => setNovelty(e.target.value)}
        />
        <Link to={`/user/${id}/`} style={{ textDecoration: 'none' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={saveNovelty}
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

export default NoveltyPage;
