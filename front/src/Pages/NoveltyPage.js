import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Button, Box, TextField } from '@mui/material';

const baseURL = 'http://127.0.0.1:8080/users/';

const NoveltyPage = () => {
    const [novelty, setNovelty] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = () => {
            try {
                axios.get(`${baseURL}${id}/`).then((response) => {
                    setNovelty(response.data.novelty);
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const saveNovelty = () => {
        try {
            axios.patch(`${baseURL}${id}/`, { novelty: novelty });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant='h4' align='center'>
                    Novelty Page
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        placeholder='Enter your novelty'
                        value={novelty}
                        onChange={(e) => setNovelty(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' color='primary' onClick={saveNovelty}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NoveltyPage;
