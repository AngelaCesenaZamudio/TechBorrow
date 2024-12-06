//importamos axios
import Axios from 'axios';


//Creamos una ruta para manejar la informacion del resgitro material
const API_URL = "http://localhost:3001/MaterialRoute";

const MaterialService = {
    registroMaterial: async (datos) => {
        try {
          const response = await Axios.post(`${API_URL}/materiales`,datos);
            return response.data;
        }catch (error){
            console.error("Error al resgistrar el material:",error);
            throw error;
        }
},
obtenerMateriales: async () => {
    try{
        const response =  await Axios.get(`${API_URL}/obtenerMateriales`);
        return response.data;
    }catch(error){
        console.error("Error al obtener el material:", error);
        throw error;
    }
}
};

export default MaterialService;
