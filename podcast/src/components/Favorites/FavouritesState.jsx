import React, {createContext, useState, useContext} from 'react'

export const FavouritesState = createContext();

export const FavouritesData = ({children}) =>{
    const [favourites, setFavourites] = useState([]);

    return(
        <FavouritesState.Provider value={{favourites, setFavourites}}>
            {children}
        </FavouritesState.Provider>
    );
};

export const useFavourites = () => {
    const data = useContext(FavouritesData)
    
    if(data === undefined){
        throw new Error('useFavourties must be within FavourtiesData');
    };

    return data;
};