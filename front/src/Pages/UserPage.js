import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Grid, Button, Box } from '@mui/material';

const baseURL = 'http://127.0.0.1:8080/users/';

const CustomButton = ({ to, children }) => (
    <Link to={to} style={{ textDecoration: 'none' }}>
        <Button variant='contained' fullWidth sx={buttonStyle}>
            {children}
        </Button>
    </Link>
);

const buttonStyle = {
    height: 200,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid'
};

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
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant='h4' align='center'>
                    {user ? user.name : 'Loading...'}
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomButton to={`/user/${id}/theme`}>
                        <Typography variant='h4' align='center'>
                            {user ? user.research_theme : 'Loading...'}
                        </Typography>
                    </CustomButton>
                </Grid>
                <Grid item xs={6}>
                    <CustomButton to={`/user/${id}/novelty`}>新規性</CustomButton>
                </Grid>
                <Grid item xs={6}>
                    <CustomButton to={`/user/${id}/todo`}>todo</CustomButton>
                </Grid>
                <Grid item xs={6}>
                    <CustomButton to={`/user/${id}/trouble`}>課題・悩み</CustomButton>
                </Grid>
                <Grid item xs={6}>
                    <CustomButton to={`/user/${id}/memo`}>メモ</CustomButton>
                </Grid>
            </Grid>
        </Container>
    );
}

export default UserPage;
