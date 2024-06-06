import React, { useState } from 'react';
import './LoginView.css'; // Importa los estilos CSS

const LoginView = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la autenticación, por ahora simplemente mostramos un mensaje de error si el nombre de usuario o la contraseña están vacíos
    if (!username || !password) {
    setError('Por favor, introduce un nombre de usuario y contraseña.');
    } else {
      // Lógica de autenticación
    setError('Autenticación fallida. Por favor, revisa tus credenciales.');
    }
};

return (
    <div className="login-container">
    <h1 className="text-2xl mb-4">Login</h1>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <form className="login-form" onSubmit={handleSubmit}>
        <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 mb-1">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 mb-1">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md">Login</button>
    </form>
    <div className="mt-4">
        <a href="#" className="text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
    </div>
    <div className="mt-2">
        <a href="#" className="text-blue-500 hover:underline">¿No tienes una cuenta? Crea una aquí.</a>
    </div>
    </div>
);
};

export default LoginView;