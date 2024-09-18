import React, { useState, useEffect } from 'react';
import { useFavourites } from './FavouritesState';
import { List, ListItem, ListItemText, IconButton, Typography, Divider, ButtonGroup, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FavouritesData = () => {
    const { favourites, setFavourites } = useFavourites();
    const [sortedFavourites, setSortedFavourites] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('title');

    useEffect(() => {
        sortFavourites();
    }, [favourites, sortOrder, sortBy]);

    const sortFavourites = () => {
        const sorted = [...favourites].sort((a, b) => {
            if (sortBy === 'title') {
                return sortOrder === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            } else if (sortBy === 'updated') {
                return sortOrder === 'asc'
                    ? new Date(a.updated) - new Date(b.updated)
                    : new Date(b.updated) - new Date(a.updated);
            }
            return 0;
        });
        setSortedFavourites(sorted);
    };

    const handleSortChange = (data) => {
        if(data === sortBy){
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(data);
            setSortOrder('asc')
        }
        
    };

    const bindFavourites = favourites.reduce((acc, episode) => {
        const { show, season } = episode;
        if (!acc[show]) {
            acc[show] = {};
        }

        if (!acc[show, season]) {
            acc[show, season] = [];
        }

        acc[show][season].push(episode);

        return acc;
    }, {});

    const removeFavourites = (episodeRemove) => {
        setFavourites(favourites.filter(episode => episode.id !== episodeRemove.id));
    }

    return (
        <div>
            <Typography variant="h4">My Favorites</Typography>
            <ButtonGroup variant="contained" aria-label="sorting options">
                <Button onClick={() => handleSortChange('title')}>Sort by Title</Button>
                <Button onClick={() => handleSortChange('updated')}>Sort by Date Updated</Button>
            </ButtonGroup>

            {Object.keys(bindFavourites).map(show => (
                <div key={show}>
                    <Typography variant="h5">{show}</Typography>
                    {Object.keys(bindFavourites[show]).map(season => (
                        <div key={season}>
                            <Typography variant="h6">Season {season}</Typography>
                            <List>
                                {sortedFavourites.filter(episode => episode.show === show && episode.season === season)
                                .map(episode => (
                                    <ListItem key={episode.id} secondaryAction={
                                        <IconButton edge="end" onClick={() => removeFavourites(episode)}>
                                            <DeleteIcon />
                                        </IconButton>}>
                                        <ListItemText
                                            primary={episode.title}
                                            secondary={`Episode: ${episode.episodeNumber}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                        </div>
                    ))}
                </div>
            ))}
            {favourites.length === 0 && <Typography>No favourites added yet.</Typography>}
        </div>
    );
};

export default FavouritesData;