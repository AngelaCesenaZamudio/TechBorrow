import { useState } from 'react'
import Header from './components/Header.jsx'
import Prestamo from './components/Prestamo.jsx'

function App() {
  // eslint-disable-next-line no-empty-pattern
  const [] = useState(0)

  return (
    <div className="App">
      <Header />
      <Prestamo />
    </div>
    
  )
}

export default App
