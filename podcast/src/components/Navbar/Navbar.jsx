import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useFavourites } from '../Favorites/FavouritesState';
import { NavbarWrapper } from './Navbar.styled';
import styled from 'styled-components';
import Filter from '../ShowList/ShowListFiltering'
import dataShows from '../API/ApiData';



const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
`;

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [filterText, setFilterText] = useState('')
   const [sortOrder, setSortOrder] = useState('asc');
   const [selectedGenres, setSelectedGenres] = useState([]);
  const { favourites } = useFavourites();
  const navigate = useNavigate();
  const {shows, loading, filteredShows} = dataShows(filterText, sortOrder, selectedGenres);

  const handleOpenFilter = () => {
    setFilter(true);
 };
 const handleCloseFilter = () => {
    setFilter(false);
 };
 const handleSortChange = (order) => {
  setSortOrder(order)
};
const handleGenreToggle = (genreId) => {
  setSelectedGenres(prev =>
     prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
  );
};

const handleSearch = (showId) => {
  navigate(`/show/${showId}`)
};

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <NavbarWrapper>
      <IconContainer>
            <IconButton edge="start" color="info" aria-label="menu">
               <MenuIcon />
            </IconButton>
            <SearchIcon onClick={handleOpenFilter} />
         </IconContainer>
         <Filter open={filter}
            shows={shows}
            onClose={handleCloseFilter}
            filterText={filterText}
            onFilterChange={setFilterText}
            onSearch={handleSearch}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            onGenreToggle={handleGenreToggle}
            selectedGenres={selectedGenres}
            />
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={() => navigate('/favourites')}>
            <ListItemText primary="Favourites" />
          </ListItem>
          <ListItem button onClick={() => navigate('/settings')}>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    </NavbarWrapper>
  );
};

export default Navbar;
