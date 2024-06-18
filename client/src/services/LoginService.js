import axios from 'axios';

const LoginService = {
    // Función para enviar las credenciales de inicio de sesión al servidor
    login: (credentials) => {
        return axios.post('http://localhost:5173/login', credentials);
    }
};

export default LoginService;