// Importar Axios
import Axios from "axios";

// Método para obtener la lista de materiales
const MaterialService = {
    obtenerMaterial: async () => {
        try {
            const response = await Axios.get("http://localhost:3001/MaterialRoute/obtenerMaterial");
            return response.data;
        } catch (error) {
            console.error("Error al obtener materiales:", error);
            throw error;
        }
    },
};

export default MaterialService;
