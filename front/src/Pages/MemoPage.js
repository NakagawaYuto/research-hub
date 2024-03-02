import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Button, Box, TextField } from '@mui/material';

const baseURL = 'http://127.0.0.1:8080/users/';

const MemoPage = () => {
    const [memo, setMemo] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchData = () => {
            try {
                axios.get(`${baseURL}${id}/`).then((response) => {
                    setMemo(response.data.memo);
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const saveMemo = () => {
        try {
            axios.patch(`${baseURL}${id}/`, { memo: memo });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant='h4' align='center'>
                    Memo Page
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        placeholder='Enter your memo'
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' color='primary' onClick={saveMemo}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MemoPage;
