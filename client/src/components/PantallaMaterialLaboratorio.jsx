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
    rows={10}
    responsiveLayout="scroll"
    emptyMessage="No se encontraron materiales."
>
    <Column field="fechaRegistro" header="Fecha de Registro" />
    <Column field="clave" header="Clave" />
    <Column field="id_ubicacion" header="Ubicación" />
    <Column field="nombre_material" header="Nombre" />
    <Column field="numserie" header="Número de Serie" />
    <Column field="id_categoria" header="Categoría" />
    <Column field="marca" header="Marca" />
    <Column field="modelo" header="Modelo" />
    <Column field="descripcion" header="Descripción" />
    <Column field="id_estado" header="Estado" />
    <Column field="permiso" header="Permiso" />
</DataTable>

            {/* Formulario para registrar un nuevo material */}
            <Dialog header="Registrar Material" visible={showDialog} onHide={() => setShowDialog(false)}>
    <form onSubmit={agregar}>
        <label>Clave:</label>
        <input type="text" value={clave} onChange={(e) => setClave(e.target.value)} required />

        <label>Ubicación:</label>
        <input type="text" value={id_ubicacion} onChange={(e) => setIdUbicacion(e.target.value)} required />

        <label>Nombre:</label>
        <input type="text" value={nombre_material} onChange={(e) => setNombreMaterial(e.target.value)} required />

        <label>Número de Serie:</label>
        <input type="text" value={numserie} onChange={(e) => setNumSerie(e.target.value)} required />

        <label>Categoría:</label>
        <input type="text" value={id_categoria} onChange={(e) => setIdCategoria(e.target.value)} required />

        <label>Marca:</label>
        <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />

        <label>Modelo:</label>
        <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} required />

        <label>Descripción:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />

        <label>Estado:</label>
        <input type="text" value={id_estado} onChange={(e) => setIdEstado(e.target.value)} required />

        <label>Permiso:</label>
        <input type="text" value={permiso} onChange={(e) => setPermiso(e.target.value)} required />

        <label>Fecha de Registro:</label>
        <input type="date" value={fechaRegistro} onChange={(e) => setFechaRegistro(e.target.value)} required />

        <button type="submit">Guardar</button>
    </form>
</Dialog>
        </div>
    );
}

export default PantallaMaterialLaboratorio;