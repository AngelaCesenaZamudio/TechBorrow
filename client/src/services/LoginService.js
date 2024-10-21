import axios from 'axios';

const LoginService = {
    // Función para enviar las credenciales de inicio de sesión al servidor
    autentificacion_usuario: async ({ numeroempleado, contraseña }) => {
        try {
            const response = await axios.get('http://localhost:5173/LoginRoute/autentificacion_usuario', {
                numeroempleado,
                contraseña,
            });
            return response.data; // Retorna los datos de respuesta si la autenticación es exitosa
        } catch (error) {
            throw error; // Lanza el error para ser manejado en el componente
        }
    },
};
export default LoginService;