import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Grid, Button, Box, TextField, Modal } from '@mui/material';

const baseURL = 'http://127.0.0.1:8080/users/';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function UserPage() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('');
  const [novelty, setNovelty] = useState('');
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [noveltyModalOpen, setNoveltyModalOpen] = useState(false);
  const { user_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}${user_id}/`);
        setUser(response.data);
        setTheme(response.data.research_theme);
        setNovelty(response.data.novelty);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user_id]);

  const saveTheme = async () => {
    try {
      await axios.patch(`${baseURL}${user_id}/`, { research_theme: theme });
      setThemeModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const saveNovelty = async () => {
    try {
      await axios.patch(`${baseURL}${user_id}/`, { novelty: novelty });
      setNoveltyModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6, mb: 6 }}>
        <Typography variant='h4' align='center'>
          {user ? user.name : 'Loading...'}
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <Button
            variant='contained'
            sx={{
              position: 'relative',
              left: 30,
              top: -55,
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
        <Grid item xs={12}>
          <Button
            variant='contained'
            fullWidth
            onClick={() => setThemeModalOpen(true)}
            sx={{
              height: 200,
              backgroundColor: 'white',
              color: 'black',
              borderColor: 'black',
              borderWidth: 2,
              borderStyle: 'solid'
            }}
          >
            <Typography variant='h5' align='center'>
              {theme || 'テーマ'}
            </Typography>
          </Button>
          <Modal
            open={themeModalOpen}
            onClose={() => setThemeModalOpen(false)}
            aria-labelledby="theme-modal-title"
            aria-describedby="theme-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="theme-modal-title" variant="h6" component="h2">
                テーマ
              </Typography>
              <TextField
                fullWidth
                variant='outlined'
                placeholder='テーマを入力してください。'
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Button
                variant='contained'
                color='primary'
                onClick={saveTheme}
                sx={{ mt: 2 }}
              >
                保存
              </Button>
            </Box>
          </Modal>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant='contained'
            fullWidth
            onClick={() => setNoveltyModalOpen(true)}
            sx={{
              height: 200,
              backgroundColor: 'white',
              color: 'black',
              borderColor: 'black',
              borderWidth: 2,
              borderStyle: 'solid'
            }}
          >
            <Typography variant='h5' align='center' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
              {novelty || '新規性'}
            </Typography>
          </Button>
          <Modal
            open={noveltyModalOpen}
            onClose={() => setNoveltyModalOpen(false)}
            aria-labelledby="novelty-modal-title"
            aria-describedby="novelty-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="novelty-modal-title" variant="h6" component="h2">
                新規性
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant='outlined'
                placeholder='新規性を入力してください。'
                value={novelty}
                onChange={(e) => setNovelty(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Button
                variant='contained'
                color='primary'
                onClick={saveNovelty}
                sx={{ mt: 2 }}
              >
                保存
              </Button>
            </Box>
          </Modal>
        </Grid>
        <Grid item xs={6}>
          <Link to={`/user/${user_id}/todo`} style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              fullWidth
              sx={{
                height: 200,
                backgroundColor: 'white',
                color: 'black',
                borderColor: 'black',
                borderWidth: 2,
                borderStyle: 'solid'
              }}
            >
              <Typography variant='h5' align='center'>
                TODO
              </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to={`/user/${user_id}/trouble`} style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              fullWidth
              sx={{
                height: 200,
                backgroundColor: 'white',
                color: 'black',
                borderColor: 'black',
                borderWidth: 2,
                borderStyle: 'solid'
              }}
            >
              <Typography variant='h5' align='center'>
                課題・悩み
              </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to={`/user/${user_id}/memo`} style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              fullWidth
              sx={{
                height: 200,
                backgroundColor: 'white',
                color: 'black',
                borderColor: 'black',
                borderWidth: 2,
                borderStyle: 'solid'
              }}
            >
              <Typography variant='h5' align='center'>
                メモ
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserPage;
