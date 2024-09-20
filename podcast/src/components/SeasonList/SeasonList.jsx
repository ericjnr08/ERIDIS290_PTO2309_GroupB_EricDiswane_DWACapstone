import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { SeasonListWrapper } from './SeasonList.styled';

const StyledPaper = styled(Paper)`
    margin: 1rem;
    background: #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
`;

const StyledImg = styled.img`
    width: 150px,
    height: auto,
`;

const SeasonList = () => {
    const { showId } = useParams();
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`https://podcast-api.netlify.app/shows/${showId}/seasons`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to retrieve seasons')
                }
                return response.json();
            })
            .then(data => {
                setSeasons(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching seasons:', error);
                setLoading(false);
            })
    }, [showId])

    if (loading) {
        return (
            <SeasonListWrapper>
                <CircularProgress />
            </SeasonListWrapper>
        );
    }

    if (seasons.length === 0) {
        return (
            <SeasonListWrapper>

            </SeasonListWrapper>
        )
    }

    return (
        <SeasonListWrapper>
            {seasons.map(season => (
                <StyledPaper key={season.id}>
                    <StyledImg src={season.image} alt={season.title || 'No image found'} />
                    <Typography variant='h6'>{season.title}</Typography>
                    <Typography variant='body2'>{season.episodes} Episode{season.episode > 1 ? 's' : ''}</Typography>
                </StyledPaper>
            ))}
        </SeasonListWrapper>
    );
}

export default SeasonList;