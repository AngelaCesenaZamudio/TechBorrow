import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header.jsx'
<<<<<<< Updated upstream
import Menu from './components/Menu.jsx';
import Prestamo from './components/Prestamo.jsx';
=======
import Menu from './components/Menu';
import Prestamo from './components/Prestamo';
import Menu from './components/Menu.jsx';
import PantallaPrestamoMaterial from './components/PantallaPrestamoMaterial.jsx';
>>>>>>> Stashed changes
import Footer from './components/footer.jsx'
import MenuServicios from './components/MenuServicios.jsx';

function App() {
    return (
        <Router>

            <div className='flex flex-col min-h-screen'>
                <HeaderWrapper />
                <main className='flex-grow'> 
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Menu" element={<Menu />} />
                <Route path='/MenuServicios' element={<MenuServicios />} />
<<<<<<< Updated upstream
                <Route path="/Prestamo" element={<Prestamo />} />
=======
                <Route path="/PantallaPrestamoMaterial" element={<PantallaPrestamoMaterial />} />
                <Route path='/Header' element={<Header />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/prestamo" element={<Prestamo />} />
                <Route path='/Footer' element={<Footer />} />
>>>>>>> Stashed changes
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