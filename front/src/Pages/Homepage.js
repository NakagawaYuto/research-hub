import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Card, CardContent, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import UserCard from '../components/UserCard';
import AddButton from '../components/AddButton';
import TroubleTimeline from '../components/TroubleTimeline';

const baseURL = 'http://127.0.0.1:8080/users/';
const troubleURL = 'http://127.0.0.1:8080/trouble/trouble/';

const pageStyle = {
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
};

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [troubles, setTroubles] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(baseURL);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTroubles = async () => {
    try {
      const response = await axios.get(troubleURL);
      const sortedData = response.data.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
      setTroubles(sortedData);
    } catch (error) {
      console.error('There was an error fetching the troubles:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTroubles();
  }, []);

  return (
    <div style={pageStyle}>
      <Header />

      <Box sx={{ flexGrow: 1, padding: '20px' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={6} container justifyContent="center" sx={{ overflow: 'auto', maxHeight: '90vh' }}>
            {users.map((user) => (
              <Grid item key={user.id} xs={12} container justifyContent="center">
                <UserCard user={user} />
              </Grid>
            ))}
            <AddButton onClick={() => navigate('/user/add/')}></AddButton>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h4' gutterBottom>
              悩みタイムライン
            </Typography>
            {troubles.map((trouble) => (
              <Box key={trouble.id}>
                <TroubleTimeline trouble={trouble} />
                <Divider />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HomePage;
