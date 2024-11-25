import Axios from 'axios';

const PrestamoService = {
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
    materialUbicacion: async (UbicacionId) =>{
        const response = await Axios.get('http://localhost:3001/PrestamoRoute/materialUbicacion',{
            params:{id_ubicacion:UbicacionId}
        });
        return response.data;
    },
    actualizarEstadoMaterial: async(id_material,estado)=>{
        try{
            const response = await Axios.put(`http://localhost:3000/material/${id_material}`, { estado });
            return response;  
        }catch(error){
            console.error("Error al actualizar el estado del material: ",error);
            throw error;
        }
    }
};

export default PrestamoService;