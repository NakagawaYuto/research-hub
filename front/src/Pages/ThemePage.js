import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Box, TextField } from '@mui/material';

const baseURL = 'http://127.0.0.1:8080/users/';

const ThemePage = () => {
    const [theme, setTheme] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}${id}/`);
                setTheme(response.data.research_theme);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const saveTheme = async () => {
        try {
            await axios.patch(`${baseURL}${id}/`, { research_theme: theme });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container maxWidth="lg">
            <Typography variant='h4' align='center' sx={{ mt: 6 }}>
                テーマ
            </Typography>
            <Box sx={{ position: 'relative', mt: 8 }}>
                <TextField
                    fullWidth
                    variant='outlined'
                    placeholder='テーマを入力してください。'
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                />
                <Link to={`/user/${id}/`} style={{ textDecoration: 'none' }}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={saveTheme}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            bottom: -120,
                            width: '150px',
                            height: '50px',
                        }}
                    >
                        <Typography variant="h6">
                            保存
                        </Typography>
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default ThemePage;
