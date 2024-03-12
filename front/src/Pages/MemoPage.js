import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Typography, Box, TextField } from '@mui/material';

const baseURL = 'http://127.0.0.1:8080/users/';

const MemoPage = () => {
  const [memo, setMemo] = useState('');
  const { user_id } = useParams();

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
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative', mt: 6 }}>
        <Link to={`/user/${user_id}`} style={{ textDecoration: 'none', position: 'absolute', top: '-25px', left: 0 }}>
          <Button
            variant='contained'
            sx={{
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
        <Typography variant='h4' align='center'>
          メモ
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={8}
          variant='outlined'
          placeholder='メモを入力してください。'
          value={memo}
          onChange={handleMemoChange}
          sx={{ mt: 2 }}
        />
      </Box>
    </Container>
  );
};

export default MemoPage;
