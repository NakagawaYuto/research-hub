import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import UserCard from '../components/UserCard';
import AddButton from '../components/AddButton';

const baseURL = 'http://127.0.0.1:8080/users/';

const pageStyle = {
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
};

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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
    <div style={pageStyle}>
      <HomeHeader />

      <Box sx={{ flexGrow: 1, padding: '20px' }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography variant='h4' gutterBottom>
              ユーザー
            </Typography>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h4' gutterBottom>
              タイムライン
            </Typography>
            {/* タイムラインのコンテンツをここに追加 */}
          </Grid>
        </Grid>
      </Box>
      <AddButton onClick={() => navigate('/user/add/')}></AddButton>
    </div>

  );
};

export default HomePage;
