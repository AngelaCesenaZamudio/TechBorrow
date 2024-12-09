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
    const [isEdit, setIsEdit] = useState(false); // Diferenciar entre agregar y editar.

    const toast = useRef(null);

    const MensajeEx = (mensaje) => {
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: mensaje, life: 3000 });
    };

    const MensajeEr = (mensaje) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: mensaje, life: 3000 });
    };

    const fetchMateriales = async () => {
        try {
            const response = await MaterialService.obtenerMateriales();
            setMateriales(response);
        } catch (error) {
            MensajeEr("Error al obtener los materiales.");
        }
    };

    const agregarOModificar = async (event) => {
        event.preventDefault();
        try {
            if (isEdit) {
                await MaterialService.modificarMaterial(id_material, {
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
                MensajeEx("Material modificado con éxito!");
            } else {
                await MaterialService.registroMaterial({
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
                MensajeEx("Material registrado con éxito!");
            }
            setShowDialog(false);
            fetchMateriales();
        } catch (error) {
            MensajeEr("Error al guardar el material.");
        }
    };

    const eliminarMaterial = async (id) => {
        try {
            if (window.confirm("¿Estás seguro de eliminar este material?")) {
                await MaterialService.eliminarMaterial(id);
                MensajeEx("Material eliminado con éxito!");
                fetchMateriales();
            }
        } catch (error) {
            MensajeEr("Error al eliminar el material.");
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
            <>
                <button
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
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
            </>
        );
    };

    return (
        <div className="bg-white text-xl font-bold max-w-7xl mx-auto p-4">
            <Toast ref={toast} />
            <div className="flex items-center justify-between mb-4">
                <h1>Material</h1>
                <button
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                    onClick={() => {
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
                <Column field="id_estado" header="Estado" />
                <Column field="descripcion" header="Descripción" />
                <Column field="permiso" header="Permiso" />
                <Column header="Acciones" body={actionBodyTemplate} />
            </DataTable>

            <Dialog header={isEdit ? "Editar Material" : "Registrar Material"} visible={showDialog} onHide={() => setShowDialog(false)}>
                <form onSubmit={agregarOModificar}>
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
                    <button type="submit" className="bg-green-500 text-white py-1 px-3 rounded">
                        {isEdit ? "Guardar cambios" : "Guardar"}
                    </button>
                </form>
            </Dialog>
        </div>
    );
}

export default PantallaMaterialLaboratorio;