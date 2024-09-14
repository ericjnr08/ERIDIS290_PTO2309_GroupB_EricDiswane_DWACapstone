import React, { useEffect } from 'react';
import { ShowListWrapper } from './ShowList.styled';


const ShowList = () => {
   const [shows, setShows] = React.useState([]);

   const fetchShows =  () => {
      fetch('https://podcast-api.netlify.app/shows')
         .then((response) => {
            if (!response.ok) {
               throw new Error('Faild to retrieve data')
            }
           return response.json()
         }).then(data => {
            console.log(data)
            setShows(data)
         })


   }

   useEffect(() => {
      fetchShows();
   },[])

   return (

      <ShowListWrapper>
         {shows.map(show=> <div>{show.title}</div>)}
      </ShowListWrapper>
   )
};

export default ShowList;
