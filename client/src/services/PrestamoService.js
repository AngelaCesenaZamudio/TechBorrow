import Axios from 'axios';

const PrestamoService = {
    RegistroPrestamo: (datos) => {
        return Axios.post("http://localhost:3001/PrestamoRoute/RegistroPrestamo", datos);
    },
    obtenerMaterial: () =>{
        return Axios.get("http://localhost:3001/PrestamoRoute/obtenerMaterial");
    },
    validarMatricula: (matricula) =>{
        return Axios.get('http://localhost:3001/PrestamoRoute/validarMatricula',{
            params : {
                matricula : matricula
            }
    });
    }
}

export default PrestamoService;