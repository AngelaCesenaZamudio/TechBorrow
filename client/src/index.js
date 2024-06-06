import React from 'react';
import { createRoot } from 'react-dom';
import LoginView from './frontend/views/LoginView';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginView />
  </React.StrictMode>
);