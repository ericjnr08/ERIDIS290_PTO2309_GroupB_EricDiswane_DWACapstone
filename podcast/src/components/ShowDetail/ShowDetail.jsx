import React, { useEffect, useState } from 'react';
import { ShowDetailWrapper } from './ShowDetail.styled';
import { useParams } from 'react-router-dom';
import { ListItem, Typography, List, Paper, CircularProgress } from '@mui/material';
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

const ShowDetail = () => {
   const { id } = useParams();
   const [show, setShow] = useState();
   const [selectedSeason, setSelectedSeason] = useState();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            setLoading(true);
            const response = await fetch(`https://podcast-api.netlify.app/id/${id}`)
            if (!response.ok) {
               throw new Error('Faild to retrieve data')
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

   if(loading){
      return(
         <ShowDetailWrapper>
            <CircularProgress />
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
         <StyledImg src={selectedSeason.image} alt={selectedSeason.title} />
         <Typography variant='h4'>{show.title}</Typography>
         <Typography variant='body1'>{show.description}</Typography>
         <Typography variant='h6'>Season:</Typography>
         <List>
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
            <Paper style={{ padding: '1rem', marginTop: '1rem' }}>
               <Typography variant='h5'>{selectedSeason.title}</Typography>
               <Typography variant='body1'>{selectedSeason.description}</Typography>
            </Paper>
         )}
      </ShowDetailWrapper>
   );
};

export default ShowDetail;
