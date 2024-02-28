import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';


function UserPage() {
    const [user, setUser] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/users/${userId}`);
                setUser(response.name);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" align="center">
                    {user ? user : 'Loading...'}
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Link to="/novelty" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" fullWidth sx={{ height: 200, backgroundColor: 'white', color: 'black', borderColor: 'black', borderWidth: 2, borderStyle: 'solid' }}>
                            新規性
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={6}>
                    <Link to="/todo" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" fullWidth sx={{ height: 200, backgroundColor: 'white', color: 'black', borderColor: 'black', borderWidth: 2, borderStyle: 'solid' }}>
                            TODO
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={6}>
                    <Link to="/trouble" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" fullWidth sx={{ height: 200, backgroundColor: 'white', color: 'black', borderColor: 'black', borderWidth: 2, borderStyle: 'solid' }}>
                            Trouble
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={6}>
                    <Link to="/memo" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" fullWidth sx={{ height: 200, backgroundColor: 'white', color: 'black', borderColor: 'black', borderWidth: 2, borderStyle: 'solid' }}>
                            メモ
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
}

export default UserPage;
