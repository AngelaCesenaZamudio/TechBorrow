import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header.jsx';
import Menu from './components/Menu.jsx';
import PantallaPrestamoMaterial from './components/PantallaPrestamoMaterial.jsx';
import Footer from './components/footer.jsx';
import MenuServicios from './components/MenuServicios.jsx';
import PantallaMaterialLaboratorio from './components/PantallaMaterialLaboratorio.jsx';
import PantallaRegistroMaterial from './components/PantallaRegistroMaterial.jsx';


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
                <Route path="/PantallaPrestamoMaterial" element={<PantallaPrestamoMaterial />} />
                <Route path="/PantallaMaterialLaboratorio" element={<PantallaMaterialLaboratorio />} />
                <Route path="/PantallaRegistroMaterial" element={<PantallaRegistroMaterial/>}/>
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