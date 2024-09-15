import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowListWrapper } from './ShowList.styled';
import { Paper, Typography, CircularProgress, Button } from '@mui/material'
import styled from 'styled-components';
// import styled from "@emotion/styled"


const StyledPaper = styled(Paper)`
   margin: 1rem;
   background: #eee;
   display: flex;
   justify-content: space-between;
   flex-direction: column;
   cursor: pointer;
   transition: background-color 0.3s;
`;

const List = styled.ul`
   padding: 0.5rem;
   list-style: none;
`;

const StyledImg = styled.img`
   width: 100px;
   display: flex;
   
`;

const genreMap = {
   1: 'Personal Growth',
   2: 'True Crime and Investigations Journalism',
   3: 'History',
   4: 'Comedy',
   5: 'Entertainment',
   6: 'Buisness',
   7: 'Fiction',
   8: 'News',
   9: 'Kids and Family',
};

const ShowList = () => {
   const [shows, setShows] = useState([]);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();


   const fetchShows = () => {
      setLoading(true);
      fetch('https://podcast-api.netlify.app/shows')
         .then((response) => {
            if (!response.ok) {
               throw new Error('Faild to retrieve data')
            }
            return response.json()
         }).then(data => {
            setShows(data)
            setLoading(false);
         })
         .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
         })
   }
   useEffect(() => {
      fetchShows();
   }, []);

   if(loading){
      return(
         <ShowListWrapper>
            <CircularProgress />
         </ShowListWrapper>
      );
   }

   const ListItem = ({ show }) => {
      const { id, image, title, seasons, updated, genres } = show;
      if (!show) {
         console.error('Show is undefind', show)
      }

      const handleClick = () =>{
         navigate(`/show/${id}`);
      }
      return (
         <div onClick={() => navigate(`/show/${id}`)}>
            <StyledPaper component="li" onClick={handleClick}>
               <StyledImg src={show.image} alt={show.title || 'No image is found'} />
               <Typography variant="h6">{title}</Typography>
               <Typography variant="body2">{seasons} Seasons</Typography>
               <Typography variant="body2">
                  Genres: {genres.map(genreId => genreMap[genreId] || 'Unknown').join(', ')}
               </Typography>
               <Button onClick={handleClick} variant='contained' color='primary'>View Details</Button>
            </StyledPaper>
         </div>
      )
   }

   return (
      <ShowListWrapper>
         <List>
            {shows.map(show =>
               <ListItem key={show.id} show={show} />)}
         </List>
      </ShowListWrapper>
   )
};

export default ShowList;
