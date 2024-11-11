// Importa las librerías necesarias de React y los estilos
import React from 'react';
import './PantallaConsultaMaterial.css'; // Opcional si decides usar un archivo CSS

// Define la clase PantallaConsultaMaterial
class PantallaConsultaMaterial extends React.Component {
  // Constructor de la clase, inicializa el estado si es necesario
  constructor(props) {
    super(props);
    this.state = {
      // Agrega propiedades de estado si se necesitan para la consulta de material
    };
  }

  // Método para manejar la consulta del material
  handleConsultaMaterial = () => {
    // Lógica de consulta aquí
    console.log("Consulta de material realizada");
  };

  // Renderiza la interfaz de usuario
  render() {
    return (
      <div className="pantalla-consulta-material" style={{ backgroundColor: '#D7D1D1', color: '#348a2d' }}>
        <h1>Pantalla de Consulta de Material</h1>
        
        {/* Ejemplo de un botón con el prefijo 'btn_' */}
        <button className="btn_consulta" style={{ backgroundColor: '#DCC819', color: '#FFFFFF' }} onClick={this.handleConsultaMaterial}>
          Consultar Material
        </button>
        
        {/* Más contenido puede ir aquí */}
      </div>
    );
  }
}

export default PantallaConsultaMaterial;
