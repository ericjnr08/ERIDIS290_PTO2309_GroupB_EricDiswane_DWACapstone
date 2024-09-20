import { useState, useEffect } from 'react';

const dataShows = (filterText, sortOrder, selectedGenres) => {
   const [shows, setShows] = useState([]);
   const [loading, setLoading] = useState(true);
   const [filteredShows, setFilteredShows] = useState([]);

   useEffect(() => {
      const fetchShows = async () => {
         try {
            const response = await fetch('https://podcast-api.netlify.app/shows');
            const data = await response.json();
            setShows(data);
         } catch (error) {
            console.error('Error fetching data:', error);
         } finally {
            setLoading(false);
         }
      };
      fetchShows();
   }, []);

   useEffect(() => {
      let results = shows;

      if (typeof filterText === 'string' && filterText) {
         results = results.filter(show =>
            show.title.toLowerCase().includes(filterText.toLowerCase())
         );
      }

      if (selectedGenres.length > 0) {
         results = results.filter(show =>
            show.genres.some(genreId => selectedGenres.includes(genreId))
         );
      }

      results.sort((a, b) =>
         sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      );

      setFilteredShows(results);
   }, [filterText, shows, sortOrder, selectedGenres]);

   return { shows, loading, filteredShows };
};

export default dataShows;
