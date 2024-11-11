{/*Importar Axios*/}

import Axios from "axios";

{/*Metodo Para mandar la informacion a la carpeta route*/}
const RegistroMaterialServices = {
    RegistroMaterial: (datos) => {
        return Axios.post("http://localhost:3001/RegistroMaterialRoute/RegistroMaterial", datos);
    },
}

export default RegistroMaterialServices;