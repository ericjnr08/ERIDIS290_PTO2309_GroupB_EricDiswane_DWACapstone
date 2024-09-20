import React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { Paper } from '@mui/material';
import { genreMap } from './ShowList';

const StyledPaper = styled(Paper)`
   width: 100%;
   max-width: 200px;
   cursor: pointer;
   transition: transform 0.2s;
   &:hover {
      transform: scale(1.05);
      background-color: rgba(0, 0, 0, 0.1)
   }
      background-color: rgba(255, 255, 255, 0.9);
      display: flexbox;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border-radius: 8px;
      border: 3px solid #ddd;

    @media (max-width: 768px){
      width: 100%;
    }
`;

export const List = styled.ul`
   padding: 0.5rem;
   list-style: none;
   display: flex;
   flex-wrap: wrap;
   gap: 1rem;
`;

const StyledImg = styled.img`
   width: 100px;
   display: flex;
`;

const formatDate = (dateStr) => {
   const date = new Date(dateStr);
   return (
      date.toLocaleDateString()
   )
}

const ListItem = ({ show, onClick }) => {
   const { id, image, title, seasons, updated, genres } = show;


   return (
      <>
         <StyledPaper component="li" onClick={() => onClick(id)}>
            <StyledImg src={show.image} alt={show.title || 'No image is found'} />
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2">{seasons} Seasons</Typography>
            <Typography variant="body2">
               Genres: {genres.map(genreId => genreMap[genreId] || 'Error').join(', ')}
            </Typography>
            <Typography variant='body2'>Last Updated: {formatDate(updated)}</Typography>
         </StyledPaper>
      </>
   );
};

export default ListItem;