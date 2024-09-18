import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowListWrapper } from './ShowList.styled';
import { Paper, Typography, CircularProgress, Button, IconButton } from '@mui/material'
import { FavouritesState } from '../Favorites/FavouritesState';
import styled from 'styled-components';
import Filter from './ShowListFiltering';
import SearchIcon from '@mui/icons-material/Search';


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
   const [filteredShows, setFilteredShows] = useState([]);
   const [filterText, setFilterText] = useState('');
   const [sortOrder, setSortOrder] = useState('asc');
   const [selectedGenres, setSelectedGenres] = useState([]);
   const [filter, setFilter] = useState(false);
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

   useEffect(() => {
      const results = filterText ? shows.filter(show => 
         show.title.toLowerCase().includes(filterText.toLowerCase())): shows;
   }, [filterText, shows])

   if (loading) {
      return (
         <ShowListWrapper>
            <CircularProgress align="center" >Loading please wait...</CircularProgress>
         </ShowListWrapper>
      );
   }
   const handleCardClick = (id) => {
      navigate(`/show/${id}`);
   }
   const handleSortChange = (order) => {
      setSortOrder(order)
   };
   const handleGenreToggle = (genreId) => {
      setSelectedGenres(prev =>
         prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
      );
   };
   const handleOpenFilter = () => {
      setFilter('');
      setFilter(true);
   };
   const handleCloseFilter = () => {
      setFilter(false);
   };

   const ListItem = ({ show, onClick }) => {
      const { id, image, title, seasons, updated, genres } = show;
      const { addFavourites, removeFavourites, favourites } = useContext(FavouritesState)

      const handleFavouriteToggle = (episode) => {
         const isFavourite = favourites.some(ep => ep.id === episode.id);
         if (isFavourite) {
            removeFavourites(episode.id);
         } else {
            addFavourites({ id, image, title, seasons, updated, genres });
         }

         if (!show) {
            console.error('Show is undefind', show)
         }
      };

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
            <Button variant='outlined' onClick={handleFavouriteToggle}>
               {favourites.some(ep => ep.id === id) ? 'Remove from Favourites' : 'Add to Favourites'}
            </Button>
         </StyledPaper>
         </>
      );
   };

   return (
      <ShowListWrapper>
         <div style={{display: 'flex', alignItems: 'flex-end', width: '100%'}}>
         <SearchIcon onClick={handleOpenFilter}  />
         </div>
         {shows.map(show =>
            <ListItem key={show.id} show={show} onClick={handleCardClick} />)}
            <Filter open={filter}
            onClose={handleCloseFilter}
            filterText={filterText}
            onFilterChange={setFilterText}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            onGenreToggle={handleGenreToggle}
            selectedGenres={selectedGenres}
            />
            
      </ShowListWrapper>
   );
};

export default ShowList;
