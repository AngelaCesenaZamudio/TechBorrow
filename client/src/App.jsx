import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header.jsx'
import Menu from './components/Menu.jsx';
import Prestamo from './components/Prestamo';
import Footer from './components/footer.jsx'

function App() {
    return (
        <Router>

            <div className='flex flex-col min-h-screen'>
                <HeaderWrapper />
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

//Componente para que determinar donde si mostrar el header
function HeaderWrapper(){
    const location = useLocation();

    //Con entro mostrara el header en las pantallas que si queremos, excepto el login
    return location.pathname !=='/' ? <Header /> : null;
}

export default App;