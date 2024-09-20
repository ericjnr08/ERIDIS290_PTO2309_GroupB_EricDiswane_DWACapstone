import React, {useState} from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, ButtonGroup, List, ListItem, ListItemText } from '@mui/material';
import Fuse from 'fuse.js';

const Filter = ({ open, onClose, shows, onNavigate, onSearchResults, filterText, onFilterChange, sortOrder, onSortChange, onGenreToggle, selectedGenres }) => {
    const [searchResults, setSearchResults] = useState([])
    
    const genres = [
        { id: 1, name: 'Personal Growth' },
        { id: 2, name: 'True Crime' },
        { id: 3, name: 'History' },
        { id: 4, name: 'Comedy' },
        { id: 5, name: 'Entertainment' },
        { id: 6, name: 'Business' },
        { id: 7, name: 'Fiction' },
        { id: 8, name: 'News' },
        { id: 9, name: 'Kids and Family' },
    ];

    const handleSearch = () => {
        const fuse = new Fuse(shows, {
            keys: ['title'],
            threshold: 0.3,
        });

        const results = fuse.search(filterText).map(result => result.item);

        const sortedResults = results.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });

        onSearchResults(sortedResults);
        if(sortedResults.length === 1){
            onNavigate(sortedResults[0].id)
        }else{
            setSearchResults(sortedResults)
        }
        
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Search</DialogTitle>
            <DialogContent>
                <TextField label='Search Shows'
                    variant='outlined'
                    value={filterText}
                    onChange={(e) => onFilterChange(e.target.value)}
                    fullWidth
                />
                <ButtonGroup variant='outlined' fullWidth style={{ marginTop: '1rem' }}>
                    <Button variant={sortOrder === 'asc' ? 'contained' : 'outlined'}
                        onClick={() => onSortChange('asc')}>
                        Sort A-Z
                    </Button>
                    <Button variant={sortOrder === 'desc' ? 'contained' : 'outlined'}
                        onClick={() => onSortChange('desc')}>
                        Sort Z-A
                    </Button>
                </ButtonGroup>
                <div>
                    {genres.map(genre => (
                        <Button
                            key={genre.id}
                            variant={selectedGenres.includes(genre.id) ? 'contained' : 'outlined'}
                            onClick={() => onGenreToggle(genre.id)}>
                            {genre.name}
                        </Button>
                    ))}
                </div>
                <Button variant='contained'
                    color='primary'
                    onClick={handleSearch}>Search</Button>
                    {searchResults.length > 1 && (
                    <List>
                        {searchResults.map((result) => (
                            <ListItem button key={result.id} onClick={() => onNavigate(result.id)}>
                                <ListItemText primary={result.title} />
                            </ListItem>
                        ))};
                    </List>
                    )}
            </DialogContent>
        </Dialog>
    );
};


export default Filter;