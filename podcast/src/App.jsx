import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ShowList from './components/ShowList/ShowList'
import ShowDetail from './components/ShowDetail/ShowDetail'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<ShowList/>}/>
          <Route path='/show/:id' element={<ShowDetail/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
