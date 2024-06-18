import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa hook para navegación
import LoginService from '../services/LoginService'; // Importa el servicio de inicio de sesión
import logo from '../imagenes/escudo.png'; // Importa tu logo (asegúrate de ajustar la ruta según la ubicación correcta)

function Login() {
    const [username, setUsername] = useState(''); // Estado para el nombre de usuario
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const navigate = useNavigate(); // Hook para navegación entre rutas

    // Función para manejar el envío del formulario de inicio de sesión
    const handleSubmit = (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto de enviar el formulario

        // Verifica que ambos campos estén completos
        if (!username || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Llama al método de servicio para iniciar sesión con los datos ingresados
        LoginService.login({ username, password })
            .then(() => {
                alert('Inicio de sesión exitoso!'); // Muestra mensaje de éxito
                navigate('/menu'); // Redirige a la página del menú después del inicio de sesión exitoso
            })
            .catch(error => {
                alert('Error al iniciar sesión: ' + (error.response?.data || error.message)); // Muestra mensaje de error si ocurre un problema
            });
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
            {/* Encabezado con título y logo */}
            <div className='md:px-30 py-4 px-7 md:flex justify-between bg-green-800 items-center rounded-t-lg rounded-b-lg mb-12'>
                <img src={logo} alt='Logo' className='h-12 mr-4' /> {/* Ajusta el tamaño del logo según tus necesidades */}
                <h1 className='text-2xl font-bold text-white'>
                    Sistema para laboratorio de sistemas computacionales
                </h1>
            </div>
            
            {/* Formulario de inicio de sesión */}
            <div className='w-96 p-12 bg-green-800 rounded-lg shadow-md'>
                <h2 className='text-2xl font-bold mb-6 text-center text-white'>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className='h-full'>
                    <div className='mb-4'>
                        <label htmlFor='username' className='block text-left mb-1 text-white'>
                            Ingresar Usuario:
                        </label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Actualiza el estado de username al escribir
                            className='w-full px-3 py-2 border rounded-md'
                            required // Campo requerido
                            autoComplete='username'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='block text-left mb-1 text-white'>
                            Contraseña:
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de password al escribir
                            className='w-full px-3 py-2 border rounded-md'
                            required // Campo requerido
                            autoComplete='current-password'

                        />
                    </div>
                    <button type='submit' className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'>
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;