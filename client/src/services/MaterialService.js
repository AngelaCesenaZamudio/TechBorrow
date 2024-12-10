import Axios from "axios";

// URL base del servicio, se obtiene de las variables de entorno o usa una URL por defecto
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/MaterialService";

const MaterialService = {
    /**
     * Registra un nuevo material en el servidor
     * @param {Object} datos - Datos del material a registrar
     * @returns {Object} - Respuesta del servidor
     */
    registroMaterial: async (datos) => {
        try {
            const response = await Axios.post(`${API_URL}/materiales`, datos);
            return response.data;
        } catch (error) {
            console.error("Error al registrar material:", error);
            throw error;
        }
    },

    /**
     * Obtiene la lista de materiales del servidor
     * @returns {Array} - Lista de materiales
     */
    obtenerMateriales: async () => {
        try {
            const response = await Axios.get(`${API_URL}/obtenerMateriales`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener materiales:", error);
            throw error;
        }
    },

    /**
     * Modifica un material existente
     * @param {number} id - ID del material a modificar
     * @param {Object} datos - Nuevos datos del material
     * @returns {Object} - Respuesta del servidor
     */
    modificarMaterial: async (id, datos) => {
        try {
            const response = await Axios.put(`${API_URL}/materiales/${id}`, datos);
            return response.data;
        } catch (error) {
            console.error("Error al modificar material:", error);
            throw error;
        }
    },

    /**
     * Elimina un material por su ID
     * @param {number} id - ID del material a eliminar
     * @returns {Object} - Respuesta del servidor
     */
    eliminarMaterial: async (id) => {
        try {
            const response = await Axios.delete(`${API_URL}/materiales/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al eliminar material:", error);
            throw error;
        }
    },
};

export default MaterialService;