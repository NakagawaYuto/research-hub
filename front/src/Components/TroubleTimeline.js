import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const TroubleTimeline = ({ trouble }) => {
    return (
        <Card sx={{ display: 'flex', marginBottom: '20px', overflow: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardContent sx={{ flex: '1 0 auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5'>{trouble.title}</Typography>
                    <Typography variant='h6'>{trouble.user_name}</Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default TroubleTimeline;
