import Axios from 'axios';

const PrestamoService = {
    RegistroPrestamo: (datos) => {
        return Axios.post("http://localhost:3001/PrestamoRoute/RegistroPrestamo", datos);
    },
}

export default PrestamoService;