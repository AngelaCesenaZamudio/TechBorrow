import Axios from 'axios';

const PrestamoService = {
    RegistroPrestamo: (datos) => {
        return Axios.post("http://localhost:3001/PrestamoRoute/RegistroPrestamo", datos);
    },
    obtenerPrestamos: () =>{
        return Axios.get("http://localhost:3001/PrestamoRoute/obtenerPrestamos");
    },
    validarMatricula: (matricula) =>{
        return Axios.get('http://localhost:3001/PrestamoRoute/validarMatricula',{
            params : {
                matricula : matricula
            }
    });
    },
    validarMaterial: (material) =>{
        return Axios.get('http://localhost:3001/PrestamoRoute/validarMaterial',{
            params : {
                material : material
            }
    });
    },
    estadoMaterial: (material) => {
        return Axios.get('http://localhost:3001/PrestamoRoute/EstadoMaterial',{
            params : {
                material : material
            }
        });
    },
    materialUbicacion: async (UbicacionId) =>{
        const response = await axios.get('https://localhost:3001/PrestamoRoute/materialUbicacion',{
            params:{id_ubicacion:UbicacionId}
        });
        return response.data;
    },
};

export default PrestamoService;