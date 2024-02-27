import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users/');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                ユーザーリスト
            </Typography>
            <Grid container spacing={3}>
                {users.map((user) => (
                    <Grid item xs={12} sm={6} md={12} key={user.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{user.name}</Typography>
                                <Typography color="textSecondary">{user.student_id}</Typography>
                                <Typography color="textSecondary">{user.research_theme}</Typography>
                                <Typography color="textSecondary">{user.tech_tags.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default UserList;
