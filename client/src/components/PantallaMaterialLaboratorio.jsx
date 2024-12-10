import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import MaterialService from '../services/MaterialService';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './Alertas.css';

function PantallaMaterialLaboratorio() {
    const [id_material, setIdMaterial] = useState(0);
    const [clave, setClave] = useState("");
    const [id_ubicacion, setIdUbicacion] = useState("");
    const [nombre_material, setNombreMaterial] = useState("");
    const [numserie, setNumSerie] = useState("");
    const [id_categoria, setIdCategoria] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [id_estado, setIdEstado] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [permiso, setPermiso] = useState("");
    const [fechaRegistro, setFechaRegistro] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [materiales, setMateriales] = useState([]);

    const toast = useRef(null);

    const MensajeEx = (mensaje) => {
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: mensaje, life: 3000 });
    };

    const MensajeAd = (mensaje) => {
        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: mensaje, life: 3000 });
    };

    const MensajeEr = (mensaje) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: mensaje, life: 3000 });
    };

    const agregar = async (event) => {
      event.preventDefault();
      try {
          const response = await MaterialService.registroMaterial({
              id_material,
              clave,
              id_ubicacion,
              nombre_material,
              numserie,
              id_categoria,
              marca,
              modelo,
              id_estado,
              descripcion,
              permiso,
              fechaRegistro,
          });
          MensajeEx("Registro guardado con éxito!");
          setShowDialog(false);
  
          // Actualiza la lista de materiales
          fetchMateriales();
      } catch (error) {
          if (error.response?.status === 400) {
              MensajeAd("Material con información incorrecta.");
          } else {
              MensajeEr("Error al guardar el material.");
          }
      }
  };

    useEffect(() => {
        const fechaActual = new Date().toISOString().split('T')[0];
        setFechaRegistro(fechaActual);
    }, []);

    const fetchMateriales = async () => {
      try {
          const response = await MaterialService.obtenerMateriales();
          setMateriales(response); 
      } catch (error) {
          MensajeEr("Error al obtener los materiales.");
          console.error("Error al cargar los materiales:", error);
      }
  };
  
  // Llamar a fetchMateriales para inicializar los materiales
  useEffect(() => {
      fetchMateriales();
  }, []);

  // Mapeos de valores
const ubicaciones = { 1: 'Aula', 2: 'Laboratorio', 3: 'Cubículos', 4: 'Almacén' };

// Plantillas para DataTable
const ubicacionTemplate = (rowData) => ubicaciones[rowData.id_ubicacion] || 'Desconocido';



 

    return (
        <div className="bg-white text-xl font-bold max-w-7xl mx-auto p-4">
            <Toast ref={toast} />
            <div className="flex items-center justify-between mb-4">
                <h1>Material</h1>
                <button className="bg-blue-500 text-white py-1 px-3 rounded" onClick={() => setShowDialog(true)}>
                    Registrar nuevo material
                </button>
            </div>

            {/* DataTable en lugar de la tabla HTML */}
            <DataTable
    value={materiales}
    paginator
    rows={5}
    responsiveLayout="scroll"
    emptyMessage="No se encontraron materiales."
>
    <Column field="clave" header="Clave" />
    <Column field="nombre_material" header="Nombre" />
    <Column field={ubicacionTemplate} header="Ubicación" />
    <Column field="numserie" header="Número de Serie" />
    <Column field="id_categoria" header="Categoría" />
    <Column field="marca" header="Marca" />
    <Column field="modelo" header="Modelo" />
    <Column field="descripcion" header="Descripción" />
    <Column field="id_estado" header="Estado" />
    <Column field="permiso" header="Permiso" />
    <Column field="fechaRegistro" header="Fecha de Registro" />
</DataTable>


            {/* Formulario para registrar un nuevo material */}
            <Dialog header="Registrar Material" visible={showDialog} onHide={() => setShowDialog(false)}>
            <form onSubmit={agregar} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>Clave:</label>
                        <input type="text" value={clave} onChange={(e) => setClave(e.target.value)} className="w-full border rounded p-2" required />
                    </div>
                    <div>
                        <label>Ubicación:</label>
                        <select value={id_ubicacion} onChange={(e) => setIdUbicacion(e.target.value)} className="w-full border rounded p-2" required>
                            <option value="">Seleccione una opción</option>
                            <option value="1">Aula</option>
                            <option value="2">Laboratorio</option>
                            <option value="3">Cubículos</option>
                            <option value="4">Almacén</option>
                        </select>
                    </div>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={nombre_material} onChange={(e) => setNombreMaterial(e.target.value)} className="w-full border rounded p-2" required />
                    </div>
                    <div>
                        <label>Número de Serie:</label>
                        <input type="text" value={numserie} onChange={(e) => setNumSerie(e.target.value)} className="w-full border rounded p-2" required />
                    </div>
                    <div>
                        <label>Categoría:</label>
                        <select value={id_categoria} onChange={(e) => setIdCategoria(e.target.value)} className="w-full border rounded p-2" required>
                            <option value="">Seleccione una opción</option>
                            <option value="1">Laptop</option>
                            <option value="2">Mouse</option>
                            <option value="3">Teclado</option>
                            <option value="4">Pantalla</option>
                            <option value="5">Adaptador</option>
                            <option value="6">Libro</option>
                            <option value="7">Herramienta</option>
                        </select>
                    </div>
                    <div>
                        <label>Marca:</label>
                        <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} className="w-full border rounded p-2" required />
                    </div>
                    <div>
                        <label>Modelo:</label>
                        <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} className="w-full border rounded p-2" required />
                    </div>
                    <div className="md:col-span-2">
                        <label>Descripción:</label>
                        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full border rounded p-2" required />
                    </div>
                    <div>
                        <label>Estado:</label>
                        <select value={id_estado} onChange={(e) => setIdEstado(e.target.value)} className="w-full border rounded p-2" required >
                            <option value="">Selecciones una opcion</option>
                            <option value="1">Disponible</option>
                        </select>
                    </div>
                    <div>
                        <label>Permiso:</label>
                        <select value={permiso} onChange={(e) => setPermiso(e.target.value)} className="w-full border rounded p-2" required>
                            <option value="">Seleccione una opción</option>
                            <option value="Maestros">Maestros</option>
                            <option value="Alumnos">Alumnos</option>
                            <option value="Ambos">Ambos</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label>Fecha de Registro:</label>
                        <input type="date" value={fechaRegistro} onChange={(e) => setFechaRegistro(e.target.value)} className="w-full border rounded p-2" required />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">Guardar</button>
                    </div>
                </form>
</Dialog>
        </div>
    );
}

export default PantallaMaterialLaboratorio;