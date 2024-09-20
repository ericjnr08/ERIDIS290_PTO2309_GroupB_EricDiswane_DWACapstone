import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowListWrapper, ShowListStyle} from './ShowList.styled';
import { CircularProgress} from '@mui/material';
import dataShows  from '../API/ApiData';
import ListItem from './ListItems';
import Filter from './ShowListFiltering';


export const genreMap = {
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

const ShowList = () => {
   const [filterText, setFilterText] = useState('')
   const [sortOrder, setSortOrder] = useState('asc');
   const [selectedGenres, setSelectedGenres] = useState([]);
   const [filterOpen, setFilterOpen] = useState(false);
   const navigate = useNavigate();
   const {shows, loading, filteredShows} = dataShows(filterText, sortOrder, selectedGenres);

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
   const handleCloseFilter = () => {
      setFilterOpen(false);
   };

   const handleOpenFilter = () => {
      setFilterOpen(true)
   }

   return (
      <ShowListWrapper>
         <ShowListStyle >
            {filteredShows.map(show => (
               <ListItem key={show.id} show={show} onClick={() => handleCardClick(show.id)}/>
            ))}
         </ShowListStyle>
            <Filter open={filterOpen}
            shows={shows}
            onClose={handleCloseFilter}
            filterText={filterText}
            onFilterChange={setFilterText}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            onGenreToggle={handleGenreToggle}
            selectedGenres={selectedGenres}
            />
            
      </ShowListWrapper>
   )};


export default ShowList;
