import React, { useEffect, useState, useContext } from 'react';
import { FavouritesState } from '../Favorites/FavouritesState';
import { ShowDetailWrapper } from './ShowDetail.styled';
import { useParams, useNavigate } from 'react-router-dom';
import { ListItem, Typography, List, Paper, CircularProgress, Button } from '@mui/material';
import styled from 'styled-components';

const StyledImg = styled.img`
   border-radius: 8px;
   width: 50%;          
   height: auto;       
   display: block;      
   margin-left: auto;   
   margin-right: auto;  
   margin-bottom: 1rem;
`;

const ShowDetail = ({showId}) => { 
   const { id } = useParams();
   const navigate = useNavigate();
   const [show, setShow] = useState();
   const [selectedEpisode, setSelectedEpisode] = useState();
   const [selectedSeason, setSelectedSeason] = useState();
   const { favourites, addFavourites, removeFavourites } = useContext(FavouritesState)
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState();

   useEffect(() => {
      const fetchData = async () => {
         try {
            setLoading(true);
            const response = await fetch(`https://podcast-api.netlify.app/id/${id}`)
            if (!response.ok) {
               throw new Error('Failed to retrieve data');
            }
            const data = await response.json();
            setShow(data);
            if (data.seasons && data.seasons.length > 0) {
               setSelectedSeason(data.seasons[0]);
            }
            setLoading(false);
         } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
         }
      };

      fetchData();
   }, [id]);

   const handleEpisodeSelect = (episode) => {
      setSelectedEpisode(episode);
   }

   const handleNavigateToSeasons = () =>{
      navigate(`/`);
   }

   const handleFavouriteToggle = (episode) => {
      const isFavourites = favourites.some(ep => ep.id === episode.id);
      if (isFavourites) {
          removeFavourites(episode.id);
      } else {
          addFavourites(episode);
      }
  };

   if (loading) {
      return (
         <ShowDetailWrapper>
            <CircularProgress>Loading Please wait...</CircularProgress>
         </ShowDetailWrapper>
      );
   }

   if (!show) {
      return (
         <ShowDetailWrapper>
            <Typography variant='h4'>No data found</Typography>
         </ShowDetailWrapper>
      );
   }

   return (
      <ShowDetailWrapper>
         <Button variant='outlined' color='primary' onClick={handleNavigateToSeasons}>Back to Show</Button>
         {selectedSeason && <StyledImg src={selectedSeason.image} alt={selectedSeason.title} />}
         <Typography variant='h4'>{show.title}</Typography>
         <Typography variant='body1'>{show.description}</Typography>
         <Typography variant='h6'>Season:</Typography>
         <List key={ShowDetail}>
            {show.seasons.sort((a, b) => a.number - b.number).map(season =>
               <ListItem
                  key={season.id}
                  selected={season.id === selectedSeason?.id}
                  onClick={() => setSelectedSeason(season)}>
                  {season.title}
               </ListItem>
            )}
         </List>
         {selectedSeason && (
            <>
               <Typography variant='h6'>Episodes:</Typography>
               <List>
                  {selectedSeason.episodes.map(episode => (
                     <ListItem
                        button
                        key={episode.id}
                        selected={episode.id === selectedEpisode?.id}
                        onClick={() => handleEpisodeSelect(episode)}>
                        {episode.title}
                     </ListItem>
                  ))}
               </List>
               {selectedEpisode && (
                  <Paper style={{ padding: '1rem', marginTop: '1rem' }}>
                     <Typography variant='h5'>{selectedEpisode.title}</Typography>
                     <Typography variant='body1'>{selectedEpisode.description}</Typography>
                     <Button
                        variant='contained'
                        color='primary'
                        href={selectedEpisode.audioUrl} // Assuming that there is a mp3 file I can import here
                        target='_blank'
                        rel='noopener noreferrer'>
                        Listen Now
                     </Button>
                     <Button
                         variant='outlined'
                         color={favourites.some(ep => ep.id === selectedEpisode.id) ? 'secondary' : 'primary'}
                         onClick={() => handleFavouriteToggle(selectedEpisode)}>
                         {favourites.some(ep => ep.id === selectedEpisode.id) ? 'Remove from Favourites' : 'Add to Favourites'}
                     </Button>
                  </Paper>
               )}
            </>
         )}
      </ShowDetailWrapper>
   );
};

export default ShowDetail;
