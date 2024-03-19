import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const UserCard = ({ user }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/user/${user.id}`);
    };

    return (
        <Card sx={{ mb: 4, width: '70%', }} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <CardContent>
                <Typography variant='h5'>{user.name}</Typography>
                <Typography color='textSecondary'>{user.student_id}</Typography>
                <Typography color='textSecondary'>{user.research_theme}</Typography>
                <Typography color='textSecondary'>{user.tech_tags}</Typography>
            </CardContent>
        </Card>
    );
};

export default UserCard;
