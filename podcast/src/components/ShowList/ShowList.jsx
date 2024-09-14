import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowListWrapper } from './ShowList.styled';
import { Paper } from '@mui/material'
import styled from "@emotion/styled"


const StyledPaper = styled(Paper)`
   margin: 1rem;
   background: #eee;
   display: flex;
   justify-content: space-between;
`;

const List = styled.ul`
   padding: 0.5rem;
   list-styled: none;
`;

const ShowList = () => {
   const [shows, setShows] = React.useState([]);
   const navigate = useNavigate();


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


   const ListItem = (show) => {
      console.log(show)
      return(
         <div onClick={()=>navigate('/show/'.concat(show.show.id))}>
         <StyledPaper component="li">
            <span>{show.show.title}</span>
         </StyledPaper>
         </div>
      )
   }

   return (
      
      <ShowListWrapper>
         <List>
         {shows.map(show=> <ListItem key={show.id} show={show}/>)}
         </List>
      </ShowListWrapper>
   )
};

export default ShowList;
