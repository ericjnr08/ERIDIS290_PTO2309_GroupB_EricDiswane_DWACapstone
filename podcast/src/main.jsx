
import { createRoot } from 'react-dom/client'
import { FavouritesData } from './components/Favorites/FavouritesState'
import App from './App'

createRoot(document.getElementById('root')).render(
    <FavouritesData>
    <App />
    </FavouritesData>
  
)
