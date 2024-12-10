/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './Alertas.css';
import DevolucionService from '../services/DevolucionService';
import {Dialog} from 'primereact/dialog';
import debounce from 'lodash.debounce';

function PantallaDevolucionMaterial(){ 
    const [id_devolucion, setid_devolucion] = useState('');
    const [nombre_material,setnombre_material] = useState("");
    const [horavencimiento,sethoravencimiento] = useState("");
    const [fechadevolucion,setfechadevolucion] = useState("");
    const [horadevolucion,sethoradevolucion] = useState("");
    const [showSuccessMessage, setshowSuccessMessage] = useState(false);
    const [showErrorMessage, setshowErrorMessage] = useState(false);
    const [devoluciones, setdevoluciones] = useState([]);
    const [materialValido, setmaterialValido] = useState(false);
    const [errorMatricula, seterrorMatricula] = useState('')
    const [isFieldDisabled, setisFieldDisabled] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [comentarios, setcomentarios] = useState("");

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
        const handleMaterialChange = (event) =>{
        const value = event.target.value;
        const regex = /^[a-zA-Z0-9\s\b]+$/;

        if(value === "" || regex.test(value)){
            setnombre_material(value);

            if(value!==""){
                debounceMaterial(value);
            }else{
                setisFieldDisabled(true);
            }
        }else{
            console.log("Evaluado: ",value);
            MensajeAd("Simbolos no permitidos");
        }
    };

    //Validar que el material tiene prestamo
    const debounceMaterial = debounce(async(value) =>{
    if(value.length>=4){    
    try{
        const response = await DevolucionService.validarMaterial(value);
        console.log("Servidor: ",response);
        console.log("Recibido: ",response.data.message);
        if(response.status===200 && response.data.message ==="Material con prestamo activo"){
            setmaterialValido(true);
            MensajeEx("El material tiene un préstamo activo");
            setnombre_material(value);
            sethoravencimiento(response.data.horavencimiento); 
            setisFieldDisabled(false);
        }else{
            MensajeEr("El material no tiene prestamos");
            sethoravencimiento("");
            setisFieldDisabled(true);
        }
    }catch(error){
        if(error.response){
            //Material no registrado
            if(error.response.status===404){
            MensajeEr("Material no registrado");
            setisFieldDisabled(true);
        }else{
            MensajeEr("Error al validar");
        }
    }else{
        MensajeEr("Error de conexion");
    }
    }
    }
},500); 

    //Funcion para mandar los datos al services
    const agregar =(event)=>{
        event.preventDefault();
        if(!nombre_material) {
            MensajeAd("Hay campos vacios");
            return;
        }

        const devoluciondata = {
            id_devolucion:id_devolucion,
            nombre_material:nombre_material,
            estado:"Finalizado",
            comentarios:comentarios,
            horavencimiento:horavencimiento,
            fechadevolucion:fechadevolucion,
            horadevolucion:horadevolucion
        }

        DevolucionService.RegistroDevolucion(devoluciondata)
        .then(async (response)=>{
            if(response.status === 200 ){
            MensajeEx("Devolucion guardada con exito!");
            setshowSuccessMessage(true);
            setshowErrorMessage(false);
            setid_devolucion(prevId => prevId +1);
            limpiarCampos();

            DevolucionService.actualizarEstadoMaterial(nombre_material)
            .then(response =>{
                MensajeEx("Estado de material actualizado");
            })
            .catch(error =>{
                console.error("Error al actualizar: ",error);
            })

            DevolucionService.actualizarEstadoPrestamo(nombre_material)
            .then(response =>{
                MensajeEx("Estado de prestamo actualizado");
            })
            .catch(error =>{
                console.error("Error al actualizar: ",error);
            })
        }
            
        }).catch(error=>{
            if(error.response.status === 401){
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
        setfechadevolucion(fecha_Prestamo);
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
        sethoradevolucion(hora_Prestamo);
    }, []);

    //Funcion para obtener las devoluciones y mostrarlos
    useEffect(() =>{
        const fetchDevoluciones = async () => {
            console.log("Entro a la consulta");
            try{
                console.log("Dentro de la consulta");
                const response = await DevolucionService.obtenerDevolucion();
                setdevoluciones(response.data);
            }catch(error){
                MensajeEr("Error al obtener los materiales: ",error);
            }
        };
        fetchDevoluciones();
    }, []);

    //Funcion para escribir en tiempo real en los comentarisos
    const handleinputChange =(e) =>{
            setcomentarios(e.target.value);
    };

    //Funcion para limpiar campos
    const limpiarCampos=()=>{
        setnombre_material('');
        setcomentarios('');
        sethoravencimiento('');
        setmaterialValido(false);
        setisFieldDisabled(true);
    }

    //Funcion para acomodar la fecha y hora en una sola variable y mostrarla
    const combinarFechaHora = (fecha, hora) =>{
        const combinada = `${fecha.split('T')[0]}T${hora}`;
        const fechaHora = new Date(combinada);
        
        const opcionFecha = {year: 'numeric', month: '2-digit', day: '2-digit'};
        const fechaFormateada = fechaHora.toLocaleDateString('es-MX',opcionFecha);
                
        const opcionHora = {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12:false};
        const horaFormateada = fechaHora.toLocaleTimeString('es-MX',opcionHora);
        
        return `${fechaFormateada} ${horaFormateada}`;
    }

    return(
        <div>
        <Toast ref={toast} />
        <div className='bg-white text-xl font-bold max-w-7xl mx-auto p-4'>
        <div className='flex items-center justify-between mb-4'>
        <h1 className='flex-none mb-4'>Devoluciones</h1>

        <div className='flex items-center flex-grow justify-center mb-2'>
        <div className='relative flex-grow max-w-xl'> 
            <input type='text' placeholder='Ingrese nombre material...' className='border border-gray-300 rounded-md p-2 w-full text-sm h-10 pr-10'/>
            <button className='absolute right-2 top-0 flex items-center h-full'>
                <img src='./src/imagenes/lupa.png' alt='Buscar' className='w-4 h-4 text-gray-500' />
            </button>
        </div>
        </div>
        <button className='bg-blue-500 text-white font-bold py-1 px-3 rounded h-10 ml-4'
        onClick={()=> setShowDialog(true)}>Devolución</button>
        </div>
        <hr className='my-4 border-gray-900'/>

        <table className='min-w-full border-collapse'>
            <thead>
                <tr>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Hora de vencimiento</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Datos de devolución</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Material</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Matrícula/Número de empleado</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Clave</th>
                </tr>
            </thead>
            <tbody>
                {devoluciones.map((devoluciones,index) => (
                <tr key={index}>    
                <td className='border border-gray-100 p-2 text-center text-sm font-semibold'>{devoluciones.horavencimiento}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-semibold'>{combinarFechaHora(devoluciones.fechadevolucion, devoluciones.horadevolucion)}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-semibold'>{devoluciones.nombre_material}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-semibold'>{devoluciones.matricula_claveempleado}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-semibold'>{devoluciones.clave_devolucion}</td>
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
        <Dialog header={<span style={{fontFamily:'sans-serif', fontSize:'1.5rem', fontWeight:'bold', color:'#333'}}>Devolución</span>}visible={showDialog}
            style={{width:'35vw'}}  
            onHide={()=>setShowDialog(false)}>
                <form onSubmit={(event) => agregar(event)}>
                <h1 className='flex justify-center font-bold text-xl mb-1'>Datos del material</h1>      
                 <div className='flex justify-center mb-3 border '> 
                <div className='mb-3 text-center'>
                    <label htmlFor='nombre_material' className='text-l font-semibold mb-1 block text-center'>Nombre del material: </label>
                    <input type='text' id='nombre_material' value={nombre_material} onChange={handleMaterialChange}
                    className='border border-gray-300 rounded-md p-2 w-70 text-center'/> 
                 </div>
                </div>    
    
            <h1 className='flex justify-center font-bold text-xl mb-1'>Datos de devolución</h1>  
            <div className='flex flex-col items-center border'> 
                <div className='w-3/4 mb-2'>
                    <label htmlFor='comentarios' className='text-l font-semibold mb-2 block'>Comentarios</label>
                    <input type='text' id='comentarios' value={comentarios} onChange={handleinputChange} 
                    rows="1"
                    className='border border-gray-300 rounded-md p-2 w-full h-10e resize-y focus:h-32 transition-all duration-300' /> 
            </div>

            <div className='w-full flex justify-between gap-2'> 
             <div className='flex flex-col items-center w-1/3'>
               <label htmlFor='horavencimiento' className='text-l font-semibold mb-1'>Hora vencimiento</label>  
               <input id='horavencimiento' type='time' value={horavencimiento} readOnly className='w-full p-1 rounded-md text-center'/>
               </div>

             <div className='flex flex-col items-center w-1/3'>
                    <label htmlFor='Fecha' className='text-l font-semibold mb-1'>Fecha</label>      
                    <input id='fecharegistro' type='date' value={fechadevolucion} readOnly className='p-1 border-gray-300 rounded-md text-center'/>
             </div>

               <div className='flex flex-col items-center w-1/3'>
               <label htmlFor='Hora' className='text-l font-semibold mb-1'>Hora</label>  
               <input id='horadevolucion' type='time' value={horadevolucion} readOnly className='w-full p-1 rounded-md text-center'/>
               </div>

              </div>
             </div>

            {/*Botones del codigo con acciones, mandar a services y limpiar campos*/}
            <div className='flex justify-center mt-6 space-x-4'>  
            <button className="bg-lime-600 text-black font-bold py-2 px-3 rounded" onClick={(event) => agregar(event)}
            disabled={isFieldDisabled}>Guardar</button>
            <button className="bg-rose-700 text-black font-bold py-2 px-4 rounded" onClick={limpiarCampos}>Borrar</button>
            </div>        
        </form>
        </Dialog>
        </div>  
    </div>
    );
}

export default PantallaDevolucionMaterial;