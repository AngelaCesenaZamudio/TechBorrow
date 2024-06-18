import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header.jsx'
import Menu from './components/Menu';
import Prestamo from './components/Prestamo';
import Footer from './components/footer.jsx'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path='/Header' element={<Header />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/prestamo" element={<Prestamo />} />
                <Route path='/Footer' element={<Footer />} />
            </Routes>
        </Router>
    );
}

export default App;