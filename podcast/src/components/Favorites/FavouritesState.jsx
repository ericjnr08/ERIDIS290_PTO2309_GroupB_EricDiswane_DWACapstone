import React, {createContext, useState, useContext} from 'react'

export const FavouritesState = createContext();

export const FavouritesData = ({children}) =>{
    const [favourites, setFavourites] = useState([]);

    const addFavourites = (episode) => {
        setFavourites([...favourites, episode]);
    };

    const removeFavourites = (id) => {
        setFavourites(favourites.filter(ep => ep.id !== id));
    };

    return(
        <FavouritesState.Provider value={{favourites, addFavourites, removeFavourites}}>
            {children}
        </FavouritesState.Provider>
    );
};

export const useFavourites = () => {
    const data = useContext(FavouritesState);
    if(data === undefined){
        throw new Error('useFavourties must be within FavourtiesData');
    };

    return data;
};