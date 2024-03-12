import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import AddButton from '../components/AddButton';

const baseURL = 'http://127.0.0.1:8080/users/';

const pageStyle = {
  backgroundColor: '#f5f5f5', // 薄いグレー
  minHeight: '100vh', // 画面全体の高さに背景を広げる
};

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  function goToAddPage() {
    navigate('/user/add/');
  }

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
        <AddButton onClick={goToAddPage}></AddButton>
      </Container>
    </div>
  );
}

export default UserList;
