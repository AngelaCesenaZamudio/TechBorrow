import Axios from 'axios';

const DevolucionService = {
    RegistroDevolucion: (datos) => { //Para realizar la devolucion del material
        return Axios.post("http://localhost:3001/DevolucionRoute/RegistroDevolucion", datos);
    },
    obtenerDevolucion: () =>{ //para obteber todos los prestamos generados
        return Axios.get("http://localhost:3001/DevolucionRoute/obtenerDevolucion");
    },
    obtenerDevolucionPorMatricula_Claveempleado: (matricula_claveempleado) =>{ //Obtener la informacion del prestamo para realizar la devolucion por medio de la matricula
        return Axios.get('http://localhost:3001/DevolucionRoute/obtenerDevolucionPorMatricula_Claveempleado',{
            params : {
                matricula_claveempleado : matricula_claveempleado
            }
    });
    },
    actualizarEstadoMaterial: (nombre_material)=>{ //Cambiar el estado del material luego de la devolucion de "Prestado" a "Disponible".
        try{
            return Axios.put(`http://localhost:3001/DevolucionRoute/actualizarEstadoMaterial`, {nombre_material}); 
        }catch(error){
            console.error("Error al actualizar el estado del material: ",error);
            throw error;
        }
    },
    actualizarEstadoPrestamo:(nombre_material)=>{
        try{
            return Axios.put(`http://localhost:3001/DevolucionRoute/actualizarEstadoMaterial`, {nombre_material});
        }catch(error){
            console.error("Error al actualizar el estado del prestamo: ",error);
            throw error;
        }
    }
};

export default DevolucionService;