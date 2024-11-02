import Axios from 'axios';

const ModificacionMaterialServices = {
    // Método para registrar un nuevo material
    registrarMaterial: (datos) => {
        return Axios.post("http://localhost:3001/ModificarMaterialRoute/registrarMaterial", datos);
    },
    
    // Método para obtener la lista de materiales
    obtenerMaterial: () => {
        return Axios.get("http://localhost:3001/ModificarMaterialRoute/obtenerMaterial");
    },
    
    // Método para validar la existencia de un material específico
    validarMaterial: (material) => {
        return Axios.get('http://localhost:3001/ModificarMaterialRoute/validarMaterial', {
            params: {
                material: material
            }
        });
    },
    
    // Método para obtener el estado de un material específico
    estadoMaterial: (material) => {
        return Axios.get('http://localhost:3001/ModificarMaterialRoute/estadoMaterial', {
            params: {
                material: material
            }
        });
    },
    
    // Método para modificar los datos de un material existente
    modificarMaterial: (datos) => {
        return Axios.put("http://localhost:3001/ModificarMaterialRoute/modificarMaterial", datos);
    }
};

export default ModificacionMaterialServices;