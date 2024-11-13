import Axios from 'axios';

const EliminarMaterialService = {
    // Método para registrar un nuevo material
    registrarMaterial: (datos) => {
        return Axios.post("http://localhost:3001/MaterialRoute/registrarMaterial", datos);
    },
    
    // Método para obtener la lista de materiales
    obtenerMaterial: () => {
        return Axios.get("http://localhost:3001/MaterialRoute/obtenerMaterial");
    },
    
    // Método para validar la existencia de un material específico
    validarMaterial: (material) => {
        return Axios.get('http://localhost:3001/MaterialRoute/validarMaterial', {
            params: {
                material: material
            }
        });
    },
    
    // Método para obtener el estado de un material específico
    estadoMaterial: (material) => {
        return Axios.get('http://localhost:3001/MaterialRoute/estadoMaterial', {
            params: {
                material: material
            }
        });
    },
    
    // Método para modificar los datos de un material existente
    modificarMaterial: (datos) => {
        return Axios.put("http://localhost:3001/MaterialRoute/modificarMaterial", datos);
    },
    
    // Método para eliminar un material existente
    eliminarMaterial: (id_material) => {
        return Axios.delete("http://localhost:3001/MaterialRoute/eliminarMaterial", {
            params: {
                id_material: id_material
            }
        });
    }
};

export default EliminarMaterialService;