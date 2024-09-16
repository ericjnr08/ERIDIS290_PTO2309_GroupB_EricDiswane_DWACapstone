import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowListWrapper } from './ShowList.styled';
import { Paper, Typography, CircularProgress, } from '@mui/material'
import styled from 'styled-components';
// import styled from "@emotion/styled"


const StyledPaper = styled(Paper)`
   width: 100%;
   max-width: 300px;
   cursor: pointer;
   transition: transform 0.2s;
   &:hover {
      transform: scale(1.05);
   }
    display: flexbox;
    flex-direction: column;
    align-items: center;
    padding: 1rem;

    @media (max-width: 768px){
      width: 100%;
    }
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
   6: 'Business',
   7: 'Fiction',
   8: 'News',
   9: 'Kids and Family',
};

const formatDate = (dateStr) => {
   const date = new Date(dateStr);
   return (
      date.toLocaleDateString()
   )
}

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

   if (loading) {
      return (
         <ShowListWrapper>
            <CircularProgress align="center" />
         </ShowListWrapper>
      );
   }
   const handleCardClick = (id) => {
      navigate(`/show/${id}`);
   }

   const ListItem = ({ show, onClick }) => {
      const { id, image, title, seasons, updated, genres } = show;
      if (!show) {
         console.error('Show is undefind', show)
      }

      return (
         <StyledPaper component="li" onClick={() => onClick(id)}>
            <StyledImg src={show.image} alt={show.title || 'No image is found'} />
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2">{seasons} Seasons</Typography>
            <Typography variant="body2">
               Genres: {genres.map(genreId => genreMap[genreId] || 'Error').join(', ')}
            </Typography>
            <Typography variant='body2'>Last Updated: {formatDate(updated)}</Typography>
         </StyledPaper>
      )
   }

   return (
      <ShowListWrapper>
         
            {shows.map(show =>
               <ListItem key={show.id} show={show} onClick={handleCardClick} />)}
         
      </ShowListWrapper>
   )
};

export default ShowList;
