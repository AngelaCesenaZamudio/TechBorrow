import Axios from 'axios';

const DevolucionService = {
    RegistroDevolucion: (datos) => { //Para realizar la devolucion del material
        return Axios.post("http://localhost:3001/DevolucionRoute/RegistroDevolucion", datos);
    },
    obtenerDevolucion: () =>{ //para obteber todas las devoluciones generadas
        return Axios.get("http://localhost:3001/DevolucionRoute/obtenerDevolucion");
    },
    validarMaterial: (nombre_material) =>{ //validar material ingresado
        return Axios.get('http://localhost:3001/DevolucionRoute/validarMaterial',{
            params : {
                nombre_material : nombre_material
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
    actualizarEstadoPrestamo:(nombre_material)=>{ //Se manda la instruccion de cambiar el estado del prestamo de "Prestado" a "Finalizado".
        try{
            return Axios.put(`http://localhost:3001/DevolucionRoute/actualizarEstadoPrestamo`, {nombre_material});
        }catch(error){
            console.error("Error al actualizar el estado del prestamo: ",error);
            throw error;
        }
    }
};

export default DevolucionService;