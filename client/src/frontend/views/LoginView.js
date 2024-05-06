import React, { useState } from 'react';

const LoginView = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos de inicio de sesión al backend para la autenticación
    console.log('Username:', username);
    console.log('Password:', password);
};

return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded">
    <h1 className="text-2xl mb-4">Login</h1>
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mt-2 px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-2 px-4 py-2 border rounded-md" />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md">Login</button>
    </form>
    </div>
);
};


export default LoginView;