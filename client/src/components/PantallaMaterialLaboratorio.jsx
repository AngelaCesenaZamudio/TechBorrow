/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './Prestamo.css';
//import PrestamoService from '../services/PrestamoService';

function PantallaMaterialLaboratorio(){ 
    const [id_Prestamo,setid_Prestamo] = useState(1);
    const [matricula_claveempleado_solicitante,setmatricula_claveempleado_solicitante] = useState("");
    const [nombre_material,setnombre_material] = useState("");
    const [categoria_material,setcategoria_material] = useState("");
    const [fecha_Prestamo,setfecha_Prestamo] = useState("");
    const [hora_Prestamo,sethora_Prestamo] = useState("");
    const [showSuccessMessage, setshowSuccessMessage] = useState(false);
    const [showErrorMessage, setshowErrorMessage] = useState(false);
    const [materiales, setMateriales] = useState([]);
    const [matriculaValida, setmatriculaValida] = useState(false);
    const [errorMatricula, seterrorMatricula] = useState('')
    const [isFieldDisabled, setisFieldDisabled] = useState(true);

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

    //Funcion para que no acepte simbolos
        const handleMatriculaChange = async (event) =>{
        const value = event.target.value;
        const regex = /^[0-9\b]+$/;

        if(value === "" || regex.test(value)){
            setmatricula_claveempleado_solicitante(value);
    
            //Para validar la matricula
            if(value !==""){
                try{
                const response = await PrestamoService.validarMatricula(value);
                    if(response.status ===200){
                        setmatriculaValida(true);
                        MensajeEx("Matricula vigente");
                        seterrorMatricula('');
                        setisFieldDisabled(false);
                    }
                }catch(error){
                    if(error.response&&error.response.status===400){
                        setmatriculaValida(false);
                        MensajeEr("Matricula no vigente");
                        setisFieldDisabled(true);
                    }else{
                        seterrorMatricula("Error al validar");
                        setisFieldDisabled(true);
                    }
                } 
            }else{
                setisFieldDisabled(true);
            }
        }else{
            MensajeAd("Solo se permite numeros");
        }
    }

    //Funcion para validar el material
    const handleMaterialChange = async (event) =>{
        const value = event.target.value;
            setnombre_material(value);
    
            //Para validar el material libre
            if(value !==""){
                try{
                const response = await PrestamoService.validarMaterial(value);
                    if(response.status ===200){
                        setmatriculaValida(true);
                        MensajeEx("Material habilitado");
                        seterrorMatricula('');
                        setisFieldDisabled(false);
                    }
                }catch(error){
                    if(error.response&&error.response.status===400){
                        setmatriculaValida(false);
                        MensajeEr("Material no valido");
                        setisFieldDisabled(true);
                    }else{
                        seterrorMatricula("Error al validar");
                        setisFieldDisabled(true);
                    }
                } 
        }
    }

    //Funcion para mandar los datos al services
    const agregar =(event)=>{
        event.preventDefault();
        if(!matricula_claveempleado_solicitante || !nombre_material) {
            MensajeAd("Hay campos vacios");
            return;
        }
        PrestamoService.RegistroPrestamo({
            id_Prestamo:id_Prestamo,
            matricula_claveempleado_solicitante:matricula_claveempleado_solicitante,
            nombre_material:nombre_material,
            categoria_material:categoria_material,
            fecha_Prestamo:fecha_Prestamo,
            hora_Prestamo:hora_Prestamo
        }).then(response=>{
            if(response.status === 200){
            MensajeEx("Registro guardado con exito!");
            setshowSuccessMessage(true);
            setshowErrorMessage(false);
            setid_Prestamo(prevId => prevId +1);
            }
        }).catch(error=>{
            if(error.response.status === 400){
                MensajeAd("Material prestado!");
            }else if(error.response.status === 401){
                MensajeEr("Error del servidor");
            }
            setshowErrorMessage(true);
            setshowSuccessMessage(false);
        });
    }

    //Funcion que genera la fecha
    useEffect(() => {
        const obtenerFecha = () =>{
            const now  = new Date();
            const year = now.getFullYear();
            let month = now.getMonth()+1;
            let day = now.getDate();

            if(month < 10){
                month = `0${month}`;
            }

            if(day < 10){
                day = `0${day}`;
            }

            return `${year}-${month}-${day}`;
        };

        const fecha_Prestamo = obtenerFecha();
        setfecha_Prestamo(fecha_Prestamo);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(fecha_Prestamo)
    }

    //Funcion que genera la hora
    useEffect(() => {
        const obtenerHora = () =>{
            const now = new Date();
            let hour = now.getHours();
            let minute = now.getMinutes();

            hour = hour < 10 ? `0${hour}` : hour;
            minute = minute < 10 ? `0${minute}` : minute;

            return `${hour}:${minute}`;
        };

        const hora_Prestamo = obtenerHora();
        sethora_Prestamo(hora_Prestamo);
    }, []);

    //Funcion para obtener material y mostrar
    useEffect(() =>{
        const fetchMateriales = async () => {
            try{
                const response = await PrestamoService.obtenerMaterial();
                setMateriales(response.data);
            }catch(error){
                MensajeEr("Error al obtener los materiales");
            }
        };
        fetchMateriales();
    }, []);

    return(
        <div className='bg-white text-xl font-bold max-w-7xl mx-auto p-4'>
        <div className='flex items-center justify-between mb-4'>
        <h1 className='flex-none mb-4'>Material</h1>

        <div className='flex items-center flex-grow justify-center mb-2'>
        <div className='relative flex-grow max-w-xl'> 
            <input type='text' placeholder='Ingrese nombre material...' className='border border-gray-300 rounded-md p-2 w-full text-sm h-10 pr-10'/>
            <button className='absolute right-2 top-0 flex items-center h-full'>
                <img src='./src/imagenes/lupa.png' alt='Buscar' className='w-4 h-4 text-gray-500' />
            </button>
        </div>
        </div>
        <button className='bg-blue-500 text-white font-bold py-1 px-3 rounded h-10 ml-4'>Registrar nuevo material</button>
        </div>
        <hr className='my-4 border-gray-900'/>

        <table className='min-w-full border-collapse'>
            <thead>
                <tr>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Fecha de registro</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Clave</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Ubicacion</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Nombre</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Numero de serie</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Categoria</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Marca</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Modelo</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Descripcion</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Estado</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Permiso de usuario</th>
                    
                    
                </tr>
            </thead>
            <tbody>
                

                <td className='border border-gray-100 p-2 text-center text-sm font-sans'>fecha</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-sans'>matricula</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-sans'>nombre</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-sans'>categoria</td>
                <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Numero de serie</th>
                <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Categoria</th>
                <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Marca</th>
                <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Modelo</th>
                <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Descripcion</th>
                <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Estado</th>
                <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Permiso de usuario</th>
                <td className='border border-gray-100 p-2 text-center text-sm font-sans'>
                    <button className='focus:outline-none'>
                        <img src='./src/imagenes/modificar.png' alt='Modificar' className='h-5 w-5 inline<'/>
                    </button>
                    <button className='focus:outline-none ml-6'>
                        <img src='./src/imagenes/eliminar.png' alt='Modificar' className='h-5 w-5 inline<'/>
                    </button>
                </td>
            </tbody>
        </table>

            {/*
            
            
            <div className='w-full h-full flex items-center justify-center mb-2'>   
            <div className='bg-stone-200 box-border w-50 p-1 border-1 overflow-auto'>
            <input id='fecha' type='date' value={fecha_Prestamo} readOnly className='w-1/2 p-1 border-gray-300 rounded-md text-center'/>
            <input id='hora' type='time' value={hora_Prestamo} readOnly className='w-1/2 p-1 border-gray-300 rounded-md text-center'/>
            </div>
            </div>

            <a href='../App.jsx'><button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded mr-10">Volver</button></a>
            <button className="bg-lime-500 text-black font-bold py-2 px-4 rounded mr-10" onClick={(event) => agregar(event)}>Guardar</button>
            <button className="bg-rose-600 text-black font-bold py-2 px-4 rounded">Cancelar</button>
            */}
        </div>
        
    );
}

export default PantallaMaterialLaboratorio;