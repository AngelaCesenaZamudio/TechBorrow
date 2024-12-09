import Axios from 'axios';

const API_URL = "http://localhost:3001/MaterialRoute";

const MaterialService = {
    registroMaterial: async (datos) => {
        try {
            const response = await Axios.post(`${API_URL}/materiales`, datos);
            return response.data;
        } catch (error) {
            console.error("Error al registrar material:", error);
            throw error;
        }
    },
    obtenerMateriales: async () => {
        try {
            const response = await Axios.get(`${API_URL}/obtenerMateriales`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener materiales:", error);
            throw error;
        }
    },
    modificarMaterial: async (id, datos) => {
        try {
            const response = await Axios.put(`${API_URL}/materiales/${id}`, datos);
            return response.data;
        } catch (error) {
            console.error("Error al modificar material:", error);
            throw error;
        }
    },
    eliminarMaterial: async (id) => {
        try {
            const response = await Axios.delete(`${API_URL}/materiales/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al eliminar material:", error);
            throw error;
        }
    }
};

export default MaterialService;
