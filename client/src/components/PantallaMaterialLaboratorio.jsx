import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './Prestamo.css';
import { Dialog } from 'primereact/dialog';
import PrestamoService from '../services/PrestamoService';



function PantallaMaterialLaboratorio() {
    const [id_material,setid_material] = useState(1);
    const [clave,setclave] = useState("");
    const [id_ubicacion,setid_ubicacion] = useState("");
    const [nombre_material,setnombre_material] = useState("");
    const [numserie,setnumserie] = useState("");
    const [id_categoria,setid_categoria] = useState("");
    const [marca,setmarca] = useState("");
    const [modelo,setmodelo] = useState("");
    const [id_estado,setid_estado] = useState("");
    const [descripcion,setdescripcion] = useState("");
    const [permiso,setpermiso] = useState("");
    const [fechaRegistro,setfechaRegistro] = useState("");
    const [showSuccessMessage, setshowSuccessMessage] = useState(false);
    const [showErrorMessage, setshowErrorMessage] = useState(false);
    const [materiales, setMateriales] = useState([]);
    const [matriculaValida, setmatriculaValida] = useState(false);
    const [isFieldDisabled, setisFieldDisabled] = useState(true);
    const [showDialog, setShowDialog] = useState(false);

    const toast = useRef(null);

    //Mensaje de confirmacion de exito
    const MensajeEx = (mensaje) =>{
        toast.current.show({severity: 'success', summary: 'Exito', detail: mensaje, life:3000});
    }

    //Mensaje de advertencia sobre algun campo
    const MensajeAd = (mensaje)=>{
        toast.current.show({severity:'warn', summary:'Advertencia', detail:mensaje, life:3000});
    }

    //Mensaje de error para cualquier cosa
    const MensajeEr = (mensaje)=>{
        toast.current.show({severity: 'error', summary: 'Error', detail: mensaje, life: 3000});
    }
    //Funcion para obtener los materiales y mostrar
    useEffect(() => {
        const fetchMateriales = async () => {
            try {
                const response = await MaterialService.obtenerMaterial();
                setMateriales(response.data); // Muestra los materiales en la interfaz
            } catch (error) {
                MensajeEr("Error al obtener los materiales:");
            }
        };
        fetchMateriales();
    }, []);

    return (
        <div className='bg-white text-xl font-bold max-w-7xl mx-auto p-4'>
            <Toast ref={toast} />
            <div className='flex items-center justify-between mb-4'>
                <h1 className='flex-none mb-4'>Material</h1>

                <div className='flex items-center flex-grow justify-center mb-2'>
                    <div className='relative flex-grow max-w-xl'>
                        <input type='text' placeholder='Ingrese nombre material...' className='border border-gray-300 rounded-md p-2 w-full text-sm h-10 pr-10' />
                        <button className='absolute right-2 top-0 flex items-center h-full'>
                            <img src='./src/imagenes/lupa.png' alt='Buscar' className='w-4 h-4 text-gray-500' />
                        </button>
                    </div>
                </div>
                <button className='bg-blue-500 text-white font-bold py-1 px-3 rounded h-10 ml-4' onClick={() => setShowDialog(true)}>Registrar nuevo material</button>
            </div>
            <hr className='my-4 border-gray-900' />

            <table className='min-w-full border-collapse'>
                <thead>
                    <tr>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>ID Material</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Clave</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Ubicación</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Nombre</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Número de serie</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Categoría</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Marca</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Modelo</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Estado</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Descripción</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Permiso de usuario</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Fecha de registro</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    {materiales.map((material) => (
                        <tr key={material.id_material}>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.clave}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.id_ubicacion}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.nombre_material}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.numserie}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.id_categoria}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.marca}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.modelo}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.id_estado}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.descripcion}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.permiso}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.fechaRegistro}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>
                                <button className='focus:outline-none'>
                                    <img src='./src/imagenes/modificar.png' alt='Modificar' className='h-5 w-5 inline' />
                                </button>
                                <button className='focus:outline-none ml-6'>
                                    <img src='./src/imagenes/eliminar.png' alt='Eliminar' className='h-5 w-5 inline' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Dialog header="Registrar Nuevo Material" visible={showDialog} style={{ width: '50vw' }} onHide={() => setShowDialog(false)}>
                {/* Aquí puedes agregar el formulario para registrar un nuevo material */}
                <p>Formulario para agregar material</p>
            </Dialog>
        </div>
    );
}


export default PantallaMaterialLaboratorio;