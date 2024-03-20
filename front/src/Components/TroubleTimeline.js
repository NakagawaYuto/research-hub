import React, { useState, useEffect } from 'react';
import { CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TroubleTimeline = ({ trouble, users }) => {
    const userName = users.find(user => user.id === trouble.user)?.name || '不明なユーザー';
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/trouble/${trouble.id}`);
    };

    const [maxTitleLength, setMaxTitleLength] = useState(0);
    useEffect(() => {
        const handleResize = () => {
            const newMaxTitleLength = Math.floor(window.innerWidth * 0.007) - 1;
            setMaxTitleLength(newMaxTitleLength);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const truncatedTitle = trouble.title.length > maxTitleLength ? `${trouble.title.substring(0, maxTitleLength)}...` : trouble.title;

    return (
        <Grid item key={trouble.id} xs={12} container justifyContent="center">
            <CardContent onClick={handleCardClick} sx={{
                '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.2s',
                },
                display: 'flex',
                alignItems: 'center',
                width: '90%',
            }}>
                <div style={{ flexGrow: 7, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Typography variant='h5'>{truncatedTitle}</Typography>
                </div>
                <div style={{ flexGrow: 3, textAlign: 'right' }}>
                    <Typography variant='h8'>{userName}</Typography>
                </div>
            </CardContent>
        </Grid>
    );
};

export default TroubleTimeline;
