import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ShowList from './components/ShowList/ShowList'
import ShowDetail from './components/ShowDetail/ShowDetail'
import SeasonList from './components/SeasonList/SeasonList'
import FavouritesData from './components/Favorites/Favourites'
import Episode from './components/Favorites/FavouritesPreview'
import Navbar from './components/Navbar/Navbar'
// import Authenticate from './components/SuperBase/Authenticate'
// import RequireAuth from './components/SuperBase/RequireAuth'
// import { AuthData } from './components/SuperBase/AuthenticationData'


const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<ShowList />} />
          <Route path='/show/:id' element={<ShowDetail />} />
          <Route path='/show/:id/seasons' element={<SeasonList />} />
          <Route path='/favourites' element={<FavouritesData />} />
          <Route path='/episode/:id' element={<Episode />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
