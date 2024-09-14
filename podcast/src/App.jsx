import { useState } from 'react'
import ShowList from './components/ShowList/ShowList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <ShowList>
          
        </ShowList>
      </div>
    </>
  )
}

export default App
