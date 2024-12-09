import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import MaterialService from '../services/MaterialService';
//import Swal from 'sweetalert2';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './Alertas.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/MaterialRoute";

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
    const [isEdit, setIsEdit] = useState(false); // Diferenciar entre agregar y editar.

    const toast = useRef(null);

    const MensajeEx = (mensaje) => {
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: mensaje, life: 3000 });
    };

    const MensajeEr = (mensaje) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: mensaje, life: 3000 });
    };

const resetForm = () => {
    setIdMaterial(0);
    setClave("");
    setIdUbicacion("");
    setNombreMaterial("");
    setNumSerie("");
    setIdCategoria("");
    setMarca("");
    setModelo("");
    setIdEstado("");
    setDescripcion("");
    setPermiso("");
    setFechaRegistro("");
};
    const fetchMateriales = async () => {
        try {
            const response = await fetch(`${API_URL}/obtenerMateriales`);
            const data = await response.json();
            setMateriales(data);
        } catch (error) {
            MensajeEr("Error al obtener los materiales.");
        }
    };

    const agregarOModificar = async (event) => {
        event.preventDefault();
        try {
            const method = isEdit ? 'PUT' : 'POST';
            const url = isEdit ? `${API_URL}/materiales/${id_material}` : `${API_URL}/materiales`;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
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
                }),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            MensajeEx(isEdit ? "Material modificado con éxito!" : "Material registrado con éxito!");
            setShowDialog(false);
            fetchMateriales();
        } catch (error) {
            MensajeEr("Error al guardar el material.");
        }
    };

    const eliminarMaterial = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'No podrás revertir esta acción',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });
    
            if (result.isConfirmed) {
                const response = await fetch(`${API_URL}/materiales/${id}`, {
                    method: 'DELETE',
                });
    
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
    
                MensajeEx('Material eliminado con éxito!');
                fetchMateriales();
                Swal.fire('Eliminado!', 'El material ha sido eliminado.', 'success');
            }
        } catch (error) {
            MensajeEr('Error al eliminar el material.');
        }
    };

    const abrirFormularioEdicion = (material) => {
        setIdMaterial(material.id_material);
        setClave(material.clave);
        setIdUbicacion(material.id_ubicacion);
        setNombreMaterial(material.nombre_material);
        setNumSerie(material.numserie);
        setIdCategoria(material.id_categoria);
        setMarca(material.marca);
        setModelo(material.modelo);
        setIdEstado(material.id_estado);
        setDescripcion(material.descripcion);
        setPermiso(material.permiso);
        setFechaRegistro(material.fechaRegistro);
        setIsEdit(true);
        setShowDialog(true);
    };

    useEffect(() => {
        fetchMateriales();
    }, []);

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <button
                    className="bg-yellow-500 text-white py-1 px-2 rounded"
                    onClick={() => abrirFormularioEdicion(rowData)}
                >
                    Editar
                </button>
                <button
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => eliminarMaterial(rowData.id_material)}
                >
                    Eliminar
                </button>
            </div>
        );
    };

    return (
        <div className="bg-white text-lg max-w-full mx-auto p-4">
            <Toast ref={toast} />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Material</h1>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={() => {
                        resetForm();
                        setIsEdit(false);
                        setShowDialog(true);
                    }}
                >
                    Registrar nuevo material
                </button>
            </div>

            <DataTable
                value={materiales}
                paginator
                rows={10}
                responsiveLayout="scroll"
                className="text-sm"
                emptyMessage="No se encontraron materiales."
            >
                <Column field="fechaRegistro" header="Fecha" style={{ width: '10%' }} />
                <Column field="clave" header="Clave" style={{ width: '10%' }} />
                <Column field="id_ubicacion" header="Ubicación" style={{ width: '10%' }} />
                <Column field="nombre_material" header="Nombre" style={{ width: '15%' }} />
                <Column field="numserie" header="No. Serie" style={{ width: '10%' }} />
                <Column field="id_categoria" header="Categoría" style={{ width: '10%' }} />
                <Column field="marca" header="Marca" style={{ width: '10%' }} />
                <Column field="modelo" header="Modelo" style={{ width: '10%' }} />
                <Column field="id_estado" header="Estado" style={{ width: '10%' }} />
                <Column field="descripcion" header="Descripción" style={{ width: '15%' }} />
                <Column field="permiso" header="Permiso" style={{ width: '10%' }} />
                <Column header="Acciones" body={actionBodyTemplate} style={{ width: '10%' }} />
            </DataTable>

            <Dialog header={isEdit ? "Editar Material" : "Registrar Material"} visible={showDialog} onHide={() => setShowDialog(false)}>
                <form onSubmit={agregarOModificar} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Clave:</label>
                            <input type="text" value={clave} onChange={(e) => setClave(e.target.value)} required className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <label>Ubicación:</label>
                            <input type="text" value={id_ubicacion} onChange={(e) => setIdUbicacion(e.target.value)} required className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <label>Nombre:</label>
                            <input type="text" value={nombre_material} onChange={(e) => setNombreMaterial(e.target.value)} required className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <label>Número de Serie:</label>
                            <input type="text" value={numserie} onChange={(e) => setNumSerie(e.target.value)} required className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <label>Categoría:</label>
                            <input type="text" value={id_categoria} onChange={(e) => setIdCategoria(e.target.value)} required className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <label>Marca:</label>
                            <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <label>Modelo:</label>
                            <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} required className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <label>Estado:</label>
                            <input type="text" value={id_estado} onChange={(e) => setIdEstado(e.target.value)} required className="w-full border rounded p-2" />
                        </div>
                        <div className="col-span-2">
                            <label>Descripción:</label>
                            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <label>Permiso:</label>
                            <input type="text" value={permiso} onChange={(e) => setPermiso(e.target.value)} required className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <label>Fecha de Registro:</label>
                            <input type="date" value={fechaRegistro} onChange={(e) => setFechaRegistro(e.target.value)} required className="w-full border rounded p-2" />
                        </div>
                    </div>
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                        {isEdit ? "Guardar cambios" : "Guardar"}
                    </button>
                </form>
            </Dialog>
        </div>
    );
}

export default PantallaMaterialLaboratorio;
