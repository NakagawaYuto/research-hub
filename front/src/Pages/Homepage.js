import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Fab, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const baseURL = 'http://127.0.0.1:8080/users/';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        axios.get(baseURL).then((response) => {
          setUsers(response.data);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent='center'>
          <Grid item xs={12} md={6}>
            {users.map((user) => (
              <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant='h5'>{user.name}</Typography>
                    <Typography color='textSecondary'>{user.student_id}</Typography>
                    <Typography color='textSecondary'>{user.research_theme}</Typography>
                    <Typography color='textSecondary'>{user.tech_tags}</Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='h4' gutterBottom>
              タイムライン
            </Typography>
            {/* タイムラインのコンテンツをここに追加 */}
          </Grid>
        </Grid>
      </Box>
      <Link to='/user/add' style={{ textDecoration: 'none', position: 'fixed', bottom: '20px', right: '20px' }}>
        <Fab color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Link>
    </Container>
  );
}

export default UserList;
