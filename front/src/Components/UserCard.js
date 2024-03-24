import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import createAxiosInstance from '../createAxiosInstance';

const tagURL = 'techtags/';

const UserCard = ({ user, onTagClick }) => {
    const navigate = useNavigate();
    const [techTags, setTechTags] = useState([]);

    useEffect(() => {
        const ax = createAxiosInstance();
        ax.get(`${tagURL}`)
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

    const handleTagClick = (tagId) => {
        onTagClick(tagId);
    };

    return (
        <Card sx={{ width: '70%' }} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Typography variant='h5'>{user.name}</Typography>
                <Typography color='textSecondary'>{user.student_id}</Typography>
                <Typography color='textSecondary'>{user.research_theme}</Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {user.tech_tags.map(tagId => {
                        const tag = techTags.find(t => t.id === tagId);
                        return tag ? (
                            <Chip
                                key={tag.id}
                                label={tag.name}
                                style={{ margin: '2px' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleTagClick(tag.id);
                                }}
                            />
                        ) : null;
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default UserCard;
