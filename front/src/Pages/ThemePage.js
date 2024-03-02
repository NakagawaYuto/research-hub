import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Button, Box, TextField } from '@mui/material';

const baseURL = 'http://127.0.0.1:8080/users/';

const ThemePage = () => {
    const [theme, setTheme] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = () => {
            try {
                axios.get(`${baseURL}${id}/`).then((response) => {
                    setTheme(response.data.research_theme);
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const saveTheme = () => {
        try {
            axios.patch(`${baseURL}${id}/`, { research_theme: theme });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant='h4' align='center'>
                    テーマ
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        placeholder=''
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' color='primary' onClick={saveTheme}>
                        保存
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ThemePage;
