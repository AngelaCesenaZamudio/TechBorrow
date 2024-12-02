import Axios from 'axios';

const DevolucionService = {
    RegistroPrestamo: (datos) => {
        return Axios.post("http://localhost:3001/PrestamoRoute/RegistroPrestamo", datos);
    },
    obtenerPrestamos: () =>{
        return Axios.get("http://localhost:3001/PrestamoRoute/obtenerPrestamos");
    },
    validarMatricula_Claveempleado: (matricula_claveempleado) =>{
        return Axios.get('http://localhost:3001/PrestamoRoute/validarMatricula_Claveempleado',{
            params : {
                matricula_claveempleado : matricula_claveempleado
            }
    });
    },
    estadoMaterial: (material) => {
        return Axios.get('http://localhost:3001/PrestamoRoute/estadoMaterial',{
            params : {
                material : material
            }
        });
    },
    actualizarEstadoMaterial: (nombre_material)=>{
        try{
            return Axios.put(`http://localhost:3001/PrestamoRoute/actualizarEstadoMaterial`, {nombre_material}); 
        }catch(error){
            console.error("Error al actualizar el estado del material: ",error);
            throw error;
        }
    }
};

export default DevolucionService;