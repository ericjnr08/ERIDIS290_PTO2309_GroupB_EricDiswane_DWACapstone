import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ShowList from './components/ShowList/ShowList'
import ShowDetail from './components/ShowDetail/ShowDetail'
import SeasonList from './components/SeasonList/SeasonList'


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<ShowList/>}/>
          <Route path='/show/:id' element={<ShowDetail/>}/>
          <Route path='/show/:id/seasons' element={<SeasonList/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
