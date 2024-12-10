/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './Prestamo.css';
import PrestamoService from '../services/PrestamoService';
import {Dialog} from 'primereact/dialog';

function PantallaPrestamoMaterial(){ 
    const [id_prestamo,setid_prestamo] = useState(1);
    const [matricula_numeroempleado,setmatricula_numeroempleado] = useState("");
    const [nombre_material,setnombre_material] = useState("");
    const [categoria,setcategoria] = useState("");
    const [fecha,setfecha] = useState("");
    const [hora,sethora] = useState("");
    const [showSuccessMessage, setshowSuccessMessage] = useState(false);
    const [showErrorMessage, setshowErrorMessage] = useState(false);
    const [prestamos, setprestamos] = useState([]);
    const [matriculaValida, setmatriculaValida] = useState(false);
    const [errorMatricula, seterrorMatricula] = useState('')
    const [isFieldDisabled, setisFieldDisabled] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
   
    const toast = useRef(null);

    //Ubicaciones por mostrar
    const [ubicaciones] = useState ([
        {id: 1, nombre:"Laboratorio"},
        {id: 2, nombre: "Aula"},
        {id: 3, nombre: "Cubiculos"},
        {id: 4, nombre: "Almacen"},
    ])

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

    //Funcion para mandar material disponible
    const handleUbicacionChange = async(event) =>{
        const ubicacionId = event.target.value;
        setIdUbicacion(ubicacionId);

        if(ubicacionId){
        const materiales = await obtenerMaterialesPorUbicacion(ubicacionId);

        const materialesDisponibles = materiales.filter(material =>material.disponible);

        setmaterialesDisponibles(materialesDisponibles);
        }else{
            setmaterialesDisponibles([]);
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
        setfecha(fecha_Prestamo);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
<<<<<<< Updated upstream

=======
        // eslint-disable-next-line no-undef
>>>>>>> Stashed changes
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
        sethora(hora_Prestamo);
    }, []);

    //Funcion para obtener los prestamos y mostrarlos
    useEffect(() =>{
        const fetchPrestamos = async () => {
            try{
                const response = await PrestamoService.obtenerPrestamos();
                setprestamos(response.data);
            }catch(error){
                MensajeEr("Error al obtener los materiales");
            }
        };
        fetchPrestamos();
    }, []);


    return(
        <div className='bg-white text-xl font-bold max-w-7xl mx-auto p-4'>
        <div className='flex items-center justify-between mb-4'>
        <h1 className='flex-none mb-4'>Prestamos</h1>

        <div className='flex items-center flex-grow justify-center mb-2'>
        <div className='relative flex-grow max-w-xl'> 
            <input type='text' placeholder='Ingrese nombre material...' className='border border-gray-300 rounded-md p-2 w-full text-sm h-10 pr-10'/>
            <button className='absolute right-2 top-0 flex items-center h-full'>
                <img src='./src/imagenes/lupa.png' alt='Buscar' className='w-4 h-4 text-gray-500' />
            </button>
        </div>
        </div>
        <button className='bg-blue-500 text-white font-bold py-1 px-3 rounded h-10 ml-4'
        onClick={()=> setShowDialog(true)}>Registrar Prestamo</button>
        </div>
        <hr className='my-4 border-gray-900'/>

        <table className='min-w-full border-collapse'>
            <thead>
                <tr>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Fecha de registro</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Matricula/NumeroEmpleado</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Nombre</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Categoria</th> 
                </tr>
            </thead>
            <tbody>
                {prestamos.map((prestamos,index) => (
                <tr key={index}>    
                <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{prestamos.fecha}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{prestamos.matricula_numeroempleado}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{prestamos.nombre_material}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{prestamos.categoria}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-sans'>
                    <button className='focus:outline-none'>
                        <img src='./src/imagenes/modificar.png' alt='Modificar' className='h-5 w-5 inline<'/>
                    </button>
                    <button className='focus:outline-none ml-6'>
                        <img src='./src/imagenes/eliminar.png' alt='Modificar' className='h-5 w-5 inline<'/>
                    </button>
                </td>
                </tr>
                ))}
            </tbody>
        </table> 
        {/*Desplegable para realizar el prestamo */}
        <Dialog header={<span style={{fontFamily:'sans-serif', fontSize:'1.5rem', fontWeight:'bold', color:'#333'}}>Prestamo</span>}visible={showDialog}
            style={{width:'50vw'}}
            onHide={()=>setShowDialog(false)}>
                <form onSubmit={(event) => agregar(event)}>
                    <div className='flex items-start justify-between mb-4'>
                        <div className='w-1/2'>
                    <label htmlFor='matricula_numeroempleado' className='text-lg font-semibold mb-2 block'>Matricula / Numero de empleado </label>
                    <input type='text' id='matricula_numeroempleado' value={matricula_numeroempleado} onChange={handleMatriculaChange} className='border border-gray-300 rounded-md p-2 w-full' required/>
                    </div>

                    <div className='w-1/2 ml-4'>
                    <label htmlFor='ubicacion' className='text-lg font-semibold mb-2 block'>Ubicacion</label>
                        <select onChange={handleUbicacionChange} className="border border-gray-300 rounded-md p-2 w-full" required>
                            <option value="">Seleccione una ubicacion</option>
                            {ubicaciones.map((ubicacion) => (
                                <option key={ubicacion.id} value={ubicacion.id}>
                                {ubicacion.nombre}</option>
                            ))}
                        </select>
                     </div>
                    </div>


                     
            <div className='w-full mb-2 flex justify-center'> 
                <div className='w-1/4'>
                    <label htmlFor='nombreMaterial' className='text-lg font-semibold mb-2 block text-center'>Nombre del material: </label>
                    <input type='text' id='nombreMaterial' value={nombre_material} onChange={handleMaterialChange} 
                    className='border border-gray-300 flex justify-center rounded-md p-2 w-29' />
                </div> 
            </div>

            <div className='w-full h-full flex items-center justify-center mb-2'>   
             <div className='p-4 overflow-auto rounded-md'>
                <div className='flex justify-between'>
                    <div className='flex flex-col items-center mb-2 w-1/2'>
                    <label htmlFor='Fecha' className='text-lg font-semibold mb-1'>Fecha</label>      
                    <input id='fecha' type='date' value={fecha} readOnly className='p-1 border-gray-300 rounded-md text-center'/>
               </div>

               <div className='flex flex-col items-center mb-2 w-1/2'>
               <label htmlFor='Hora' className='text-lg font-semibold mb-1'>Hora</label>  
               <input id='hora' type='time' value={hora} readOnly className='w-full p-1 border border-gray-300 rounded-md text-center'/>

               </div>
              </div>
             </div>
            </div>

            {/*Botones del codigo con acciones, mandar a services y reestablecer la pagina*/}
            <div className='mb-2 flex justify-center space-x-4'>  
            <button className="bg-lime-600 text-black font-bold py-2 px-3 rounded mr-10" onClick={(event) => agregar(event)}>Guardar</button>
            <button className="bg-rose-700 text-black font-bold py-2 px-4 rounded mr-10">Borrar</button>
            </div>
            
            </form>
            </Dialog>
        </div>  
    );
}

export default PantallaPrestamoMaterial;