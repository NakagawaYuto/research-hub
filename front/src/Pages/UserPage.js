import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Header from '../components/Header';
import EditModal from '../components/EditModal';

const baseURL = 'http://127.0.0.1:8080/users/';
const tagURL = 'http://127.0.0.1:8080/techtags/';
const todoURL = 'http://127.0.0.1:8080/todo/todo/';

const pageStyle = {
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
};

const fieldStyle = {
  height: 220,
  backgroundColor: 'white',
  color: 'black',
  '&:hover': {
    backgroundColor: 'primary',
  }
};

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [techtag, setTechtag] = useState('');
  const [theme, setTheme] = useState('');
  const [novelty, setNovelty] = useState('');
  const [todo, setTodo] = useState(null);
  const [techtagModalOpen, setTechtagModalOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [noveltyModalOpen, setNoveltyModalOpen] = useState(false);
  const { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${baseURL}${user_id}/`);
        setUser(userResponse.data);
        setTheme(userResponse.data.research_theme);
        setNovelty(userResponse.data.novelty);

        const todoResponse = await axios.get(`${todoURL}`);
        const userTodos = todoResponse.data.filter(todo => todo.user === parseInt(user_id) && !todo.done);
        const earliestTodo = userTodos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0];
        setTodo(earliestTodo);

        const tagsResponse = await axios.get(tagURL);
        const tags = tagsResponse.data.reduce((acc, tag) => {
          acc[tag.id] = tag.name;
          return acc;
        }, {});
        setTechtag(userResponse.data.tech_tags.map(id => tags[id]).join(' '));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user_id]);

  const saveTechtag = async () => {
    try {
      const techtagArray = Array.from(new Set(techtag.split(/[\s　]+/).filter(tag => tag !== '')));
      const existingTagsResponse = await axios.get(`${tagURL}`);
      const existingTags = existingTagsResponse.data.map(tag => tag.name);
      let techTagIds = [];

      for (const tagName of techtagArray) {
        if (!existingTags.includes(tagName)) {
          const newTagResponse = await axios.post(`${tagURL}`, { name: tagName });
          techTagIds.push(newTagResponse.data.id);
        } else {
          const existingTag = existingTagsResponse.data.find(tag => tag.name === tagName);
          techTagIds.push(existingTag.id);
        }
      }

      await axios.patch(`${baseURL}${user_id}/`, { tech_tags: techTagIds });
      setTechtagModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

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
          <Typography variant='h3' style={{ fontFamily: 'Meiryo' }} align='center' sx={{ mt: 4, mb: 6 }}>
            {user ? user.name : 'Loading...'}
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ textAlign: 'right', paddingRight: '50px' }}>
          <Button
            variant='contained'
            fullWidth
            onClick={() => setTechtagModalOpen(true)}
            sx={{
              height: 60,
              width: 150,
              backgroundColor: 'white',
              color: 'black'
            }}
          >
            <Typography variant='h5' align='center'>
              タグ
            </Typography>
          </Button>
          <EditModal
            open={techtagModalOpen}
            onClose={() => setTechtagModalOpen(false)}
            title="タグ"
            value={techtag}
            onChange={setTechtag}
            onSave={saveTechtag}
            placeholder="タグをスペース区切りで入力してください。"
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} justifyContent="center">
        <Grid container item xs={8} justifyContent="center" spacing={6}>
          <Grid item xs={8}>
            <Button
              variant='contained'
              fullWidth
              onClick={() => setThemeModalOpen(true)}
              sx={{
                height: 75,
                backgroundColor: 'white',
                color: 'black'
              }}
            >
              <Typography variant='h4' align='center'>
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
          <Grid item xs={6} justifyContent="flex-start">
            {novelty ? (
              <Button
                variant='contained'
                fullWidth
                onClick={() => setNoveltyModalOpen(true)}
                sx={fieldStyle}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant='h4' align='center' sx={{ mb: 3 }}>
                    新規性
                  </Typography>
                  <Typography variant='h5' align='center' sx={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {novelty}
                  </Typography>
                </Box>
              </Button>
            ) : (
              <Button
                variant='contained'
                fullWidth
                onClick={() => setNoveltyModalOpen(true)}
                sx={fieldStyle}
              >
                <Typography variant='h4' align='center'>
                  新規性
                </Typography>
              </Button>
            )}
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
            {todo ? (
              <Button
                variant='contained'
                fullWidth
                onClick={() => navigate(`/user/${user_id}/todo`)}
                sx={fieldStyle}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant='h4' align='center' sx={{ mb: 3 }}>
                    TODO
                  </Typography>
                  <Typography variant='h5' align='center' sx={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                    {todo.title}
                  </Typography>
                  <Typography variant='h5' align='center'>
                    {new Date(todo.deadline).toLocaleDateString()}
                  </Typography>
                </Box>
              </Button>
            ) : (
              <Button
                variant='contained'
                fullWidth
                onClick={() => navigate(`/user/${user_id}/todo`)}
                sx={fieldStyle}
              >
                <Typography variant='h4' align='center'>
                  TODO
                </Typography>
              </Button>
            )}
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='contained'
              fullWidth
              sx={fieldStyle}
              onClick={() => navigate(`/user/${user_id}/trouble`)}
            >
              <Typography variant='h4' align='center'>
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
              <Typography variant='h4' align='center'>
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
