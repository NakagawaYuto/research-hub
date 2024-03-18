import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Header from '../components/Header';
import EditModal from '../components/EditModal';

const baseURL = 'http://127.0.0.1:8080/users/';

const pageStyle = {
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
};

const fieldStyle = {
  height: 200,
  backgroundColor: 'white',
  color: 'black',
  borderColor: 'black',
  borderWidth: 2,
  borderStyle: 'solid'
};

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('');
  const [novelty, setNovelty] = useState('');
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [noveltyModalOpen, setNoveltyModalOpen] = useState(false);
  const { user_id } = useParams();
  const navigate = useNavigate();

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
            {user ? user.name : 'Loading...'}
          </Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12} justifyContent="center">
        <Grid container item xs={8} justifyContent="center" spacing={4}>
          <Grid item xs={12}>
            <Button
              variant='contained'
              fullWidth
              onClick={() => setThemeModalOpen(true)}
              sx={fieldStyle}
            >
              <Typography variant='h5' align='center'>
                {theme || '研究テーマ'}
              </Typography>
            </Button>
            <EditModal
              open={themeModalOpen}
              onClose={() => setThemeModalOpen(false)}
              title="研究テーマ"
              value={theme}
              onChange={setTheme}
              onSave={saveTheme}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='contained'
              fullWidth
              onClick={() => setNoveltyModalOpen(true)}
              sx={fieldStyle}
            >
              <Typography variant='h5' align='center' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                {novelty || '新規性'}
              </Typography>
            </Button>
            <EditModal
              open={noveltyModalOpen}
              onClose={() => setNoveltyModalOpen(false)}
              title="新規性"
              value={novelty}
              onChange={setNovelty}
              onSave={saveNovelty}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='contained'
              fullWidth
              sx={fieldStyle}
              onClick={() => navigate(`/user/${user_id}/todo`)}
            >
              <Typography variant='h5' align='center'>
                TODO
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='contained'
              fullWidth
              sx={fieldStyle}
              onClick={() => navigate(`/user/${user_id}/trouble`)}
            >
              <Typography variant='h5' align='center'>
                課題・悩み
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='contained'
              fullWidth
              sx={fieldStyle}
              onClick={() => navigate(`/user/${user_id}/memo`)}
            >
              <Typography variant='h5' align='center'>
                メモ
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div >
  );
}

export default UserPage;
