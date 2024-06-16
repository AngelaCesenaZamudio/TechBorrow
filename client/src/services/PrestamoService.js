import Axios from 'axios';

const PrestamoService = {
    RegistroPrestamo:(datos) => {
        return Axios.post("https://localhost:3001/Prestamo/registroprestamo", datos);
    }
}

export default PrestamoService;