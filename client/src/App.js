import React, { Component } from 'react';
import './App.css';
import Category from './Category.js';

class App extends Component {
  render() {
  return (
    <div className="App">
    <ul>
      <Category name="Menu" items={['Servicios','Material','Usuarios']}/>
      <Category name="Servicios" items={['Registro Prestamo','Consultar Material','Registro Devolucion']}/>
      <Category name="Material" items={['Registro Material','Consulta Material']}/>
      <Category name="Usuarios" items={['Registro Usuario','Consulta Usuario']}/>
    </ul>
    </div>
  );
}
}

export default App;
