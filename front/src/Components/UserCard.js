import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const tagURL = 'http://127.0.0.1:8080/techtags/';

const UserCard = ({ user }) => {
    const navigate = useNavigate();
    const [techTags, setTechTags] = useState([]);

    useEffect(() => {
        axios.get(`${tagURL}`)
            .then(response => {
                setTechTags(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleCardClick = () => {
        navigate(`/user/${user.id}`);
    };

    const techTagNames = user.tech_tags.map(tagId => {
        const tag = techTags.find(t => t.id === tagId);
        return tag ? tag.name : '';
    }).join(', ');

    return (
        <Card sx={{ mb: 4, width: '70%' }} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <CardContent>
                <Typography variant='h5'>{user.name}</Typography>
                <Typography color='textSecondary'>{user.student_id}</Typography>
                <Typography color='textSecondary'>{user.research_theme}</Typography>
                <Typography color='textSecondary'>{techTagNames}</Typography>
            </CardContent>
        </Card>
    );
};

export default UserCard;
