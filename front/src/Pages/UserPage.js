import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Container, Typography, Grid, Button, Box } from '@mui/material';

const baseURL = 'http://127.0.0.1:8080/users/';

function UserPage() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => {
      try {
        axios.get(`${baseURL}${id}/`).then((response) => {
          setUser(response.data);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

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
          <Link to={`/user/${id}/theme`} style={{ textDecoration: 'none' }}>
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
                {user ? (user.research_theme ? user.research_theme : 'テーマ') : 'Loading...'}
              </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to={`/user/${id}/novelty`} style={{ textDecoration: 'none' }}>
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
                新規性
              </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to={`/user/${id}/todo`} style={{ textDecoration: 'none' }}>
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
          <Link to={`/user/${id}/trouble`} style={{ textDecoration: 'none' }}>
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
          <Link to={`/user/${id}/memo`} style={{ textDecoration: 'none' }}>
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
