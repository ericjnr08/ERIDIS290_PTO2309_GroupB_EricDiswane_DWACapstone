import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home'
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

const TitleContainer = styled.div`
  text-align: center;
  margin: 1rem 0
`;

const Title = styled.h1`
  font-size: 2.5rem;
  
`;

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [filterText, setFilterText] = useState('')
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { favourites } = useFavourites();
  const navigate = useNavigate();
  const { shows } = dataShows(filterText, sortOrder, selectedGenres);

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

  const handleSearchResults = (results) => {
    setSearchResults(results)
  };

  const handleSearch = (showId) => {
    navigate(`/show/${showId}`)
    setFilter(false)
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
        <IconButton edge="start" color="info" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <TitleContainer>
        <Title>Podcast</Title>
      </TitleContainer>
        <IconButton edge="end" color="info" aria-label="search" onClick={handleOpenFilter}>
          <SearchIcon />
        </IconButton>
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
        onSearchResults={handleSearchResults}
        selectedGenres={selectedGenres}
        onNavigate={handleSearch}
      />
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={() => navigate('/shows')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
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
