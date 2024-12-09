import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Menu from "./components/Menu";
import PantallaPrestamoMaterial from "./components/PantallaPrestamoMaterial";
import Footer from "./components/footer";
import MenuServicios from "./components/MenuServicios";
import PantallaMaterialLaboratorio from "./components/PantallaMaterialLaboratorio";

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <HeaderWrapper />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/Menu" element={<Menu />} />
                        <Route path="/MenuServicios" element={<MenuServicios />} />
                        <Route path="/PantallaPrestamoMaterial" element={<PantallaPrestamoMaterial />} />
                        <Route path="/PantallaMaterialLaboratorio" element={<PantallaMaterialLaboratorio />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

function HeaderWrapper() {
    const location = useLocation();
    return location.pathname !== "/" ? <Header /> : null;
}

export default App;