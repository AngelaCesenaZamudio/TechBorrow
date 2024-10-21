import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header.jsx'
import Menu from './components/Menu.jsx';
import Prestamo from './components/Prestamo';
import Footer from './components/footer.jsx'

function App() {
    return (
        <Router>
            <div className='flex flex-col min-h-screen'>
                <Header />
                <main className='flex-grow'> 
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Menu" element={<Menu />} />
                <Route path="/prestamo" element={<Prestamo />} />
            </Routes>
            </main>
            <Footer />
            </div>
        </Router>
    );
}

export default App;