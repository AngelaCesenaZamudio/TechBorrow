import { useState } from 'react'
import Header from './components/Header.jsx'
import Prestamo from './components/Prestamo.jsx'
import Footer from './components/footer.jsx'

function App() {
  // eslint-disable-next-line no-empty-pattern
  const [] = useState(0)

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Prestamo />
      </div>
      <Footer></Footer>
    </div>
    
  )
}

export default App
