import React from 'react';
import { useFavourites } from './FavouritesState';
import { Button, Card, CardContent, Typography } from '@mui/material';

const Episode = ({episode}) => {
    const {favourites, addFavourites, removeFavourites} = useFavourites();
    const isFavourites = favourites.some(fav => fav.id === episode.id);

    const toggleFavourites = () => {
        if(isFavourites){
            removeFavourites(favourites.filter(fav => fav.id !== episode.id));
        } else{
            addFavourites({...episode, update: new Date()});
        }
    };

    return(
        <Card>
            <CardContent>
                <Typography variant='h5'>{episode.title}</Typography>
                <Typography color='textSecondary'>{episode.description}</Typography>
                <Button onClick={toggleFavourites}>
                    {isFavourites ? 'Remove from Favourites' : 'Add to Favourites'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default Episode;