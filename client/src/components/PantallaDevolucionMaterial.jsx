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
    const [id_prestamo,setid_prestamo] = useState(0);
    const [id_material, setid_material] = useState("");
    const [matricula_claveempleado,setmatricula_claveempleado] = useState("");
    const [nombre_material,setnombre_material] = useState("");
    const [nombre_solicitante, setnombre_solicitante] = useState("");
    const [fechavencimiento,setfechavencimiento] = useState("");
    const [horavencimiento,sethoravencimiento] = useState("");
    const [fechadevolucion,setfechadevolucion] = useState("");
    const [horadevolucion,sethoradevolucion] = useState("");
    const [showSuccessMessage, setshowSuccessMessage] = useState(false);
    const [showErrorMessage, setshowErrorMessage] = useState(false);
    const [devoluciones, setdevoluciones] = useState([]);
    const [matriculaValida, setmatriculaValida] = useState(false);
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
        const handleMatriculaChange = (event) =>{
        const value = event.target.value;
        const regex = /^[0-9\b]+$/;

        if(value === "" || regex.test(value)){
            setmatricula_claveempleado(value);

            if(value!==""){
                debounceValidaMatricula(value);
            }else{
                setisFieldDisabled(true);
            }
        }else{
            MensajeAd("Solo se permite numeros");
        }
    };

    //Metodo que valida la matricula y devuelve prestamo si tiene activo
    const debounceValidaMatricula = debounce(async(value) => {
        if(value.length>=7){
        try{
            const response = await DevolucionService.obtenerDevolucionPorMatricula_Claveempleado(value);
            console.log("Despues de la consulta: ",response);
            if(response.status===200){
                setmatriculaValida(true);
                setmatricula_claveempleado(value);
                setnombre_solicitante(response.data.nombre);
                setnombre_material(response.data.nombre_material);
                seterrorMatricula('');
                setisFieldDisabled(false);
            }
        }catch(error){
            console.log("Error en el client: ",error);
            if(error.response){
                //Solicitante no registrado
                if(error.response.status===404){
                MensajeEr("No cuenta con un prestamo activo");
            }else{
                MensajeEr("Error al validar");
            }
        }
        }
    }
    },500);

    //Funcion para que actualice la matricula
    useEffect(()=>{
        if(matriculaValida){
            MensajeEx("Solicitante con prestamo activo");    
        }
    }, [matriculaValida, nombre_solicitante]);
    
    const handleMaterialChange = (event) =>{
        const value = event.target.value;
        setnombre_material(value);

        if(value.trim() !== "" && value.length>=5){
            debounceMaterial(value);
        }
    };

    //Funcion para mandar los datos al services
    const agregar =(event)=>{
        event.preventDefault();
        if(!matricula_claveempleado || !nombre_material) {
            MensajeAd("Hay campos vacios");
            return;
        }

        console.log("Fecha en int: ",fechadevolucion);
        console.log("hora en int: ",horadevolucion);

        DevolucionService.RegistroDevolucion({
            id_prestamo:id_prestamo,
            matricula_claveempleado:matricula_claveempleado,
            nombre_material:nombre_material,
            estado:"Finalizado",
            comentarios:comentarios,
            fechavencimiento:fechavencimiento,
            horavencimiento:horavencimiento,
            fechadevolucion:fechadevolucion,
            horadevolucion:horadevolucion
        }).then(async (response)=>{
            if(response.status === 200){
            MensajeEx("Devolucion guardada con exito!");
            limpiarCampos();
            setshowSuccessMessage(true);
            setshowErrorMessage(false);
            setid_prestamo(prevId => prevId +1);

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
        setmatricula_claveempleado('');
        setnombre_solicitante('');
        setnombre_material('');
        setcomentarios('');
        setmatriculaValida(false);
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
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans' colSpan="2">Datos de devolución</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Matrícula/Número de empleado</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Nombre</th>
                    <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Categoría</th> 
                </tr>
            </thead>
            <tbody>
                {devoluciones.map((devoluciones,index) => (
                <tr key={index}>    
                <td className='border border-gray-100 p-2 text-center text-sm font-semibold'>{devoluciones.horavencimiento}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-semibold'>{combinarFechaHora(devoluciones.fechadevolucion, devoluciones.horadevolucion)}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-semibold'>{devoluciones.estado}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-semibold'>{devoluciones.matricula_claveempleado}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-semibold'>{devoluciones.nombre_material}</td>
                <td className='border border-gray-100 p-2 text-center text-sm font-semibold'>{devoluciones.categoria}</td>
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
            style={{width:'40vw'}}  
            onHide={()=>setShowDialog(false)}>
                <form onSubmit={(event) => agregar(event)}>
                <h1 className='flex justify-center font-bold text-xl mb-1'>Datos del solicitante</h1>  
                    <div className='flex justify-between mb-3 border'>
                    <div className='w-1/2 mb-3 px-6'>
                    <label htmlFor='matricula_numeroempleado' className='text-l font-semibold mb-2 block whitespace-nowrap overflow-hidden text-ellipsis'>
                    Matrícula/Número de empleado </label>
                    <input type='text' id='matricula_claveempleado' value={matricula_claveempleado} onChange={handleMatriculaChange} 
                    className='border border-gray-300 rounded-md p-2 w-70' required/>
                    </div>

                    <div className='w-1/2 mb-3 px-6'>
                    <label htmlFor='matricula_numeroempleado' className='text-l font-semibold mb-2 block'>Nombre del solicitante </label>
                    <input type='text' id='nombre_solicitante' className='border border-gray-300 rounded-md p-2 w-70 text-center' value={nombre_solicitante} 
                    onChange={(e) => setnombre_solicitante(e.target.value)} disabled/>
                     </div>
                    </div>

            <h1 className='flex justify-center font-bold text-xl mb-1'>Datos del material</h1>      
            <div className='flex justify-center mb-3 border '> 
                <div className='mb-3 text-center'>
                    <label htmlFor='nombre_material' className='text-l font-semibold mb-1 block text-center'>Nombre del material: </label>
                    <input type='text' id='nombre_material' value={nombre_material} onChange={(e)=> setnombre_material(e.target.value)}
                    className='border border-gray-300 rounded-md p-2 w-70 text-center' disabled/> 
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

            <div className='w-full h-full flex justify-center gap-8'>   
             <div className='flex flex-col items-center'>
                    <label htmlFor='Fecha' className='text-l font-semibold mb-1'>Fecha</label>      
                    <input id='fechadevolucion' type='date' value={fechadevolucion} readOnly className='p-1 border-gray-300 rounded-md text-center'/>
             </div>

               <div className='flex flex-col items-center'>
               <label htmlFor='Hora' className='text-l font-semibold mb-1'>Hora</label>  
               <input id='horadevolucion' type='time' value={horadevolucion} readOnly className='w-full p-1 border border-gray-300 rounded-md text-center'/>

               </div>
              </div>
             </div>

            {/*Botones del codigo con acciones, mandar a services y limpiar campos*/}
            <div className='flex justify-center mt-6 space-x-4'>  
            <button className="bg-lime-600 text-black font-bold py-2 px-3 rounded" onClick={(event) => agregar(event)}>Guardar</button>
            <button className="bg-rose-700 text-black font-bold py-2 px-4 rounded" onClick={limpiarCampos}>Borrar</button>
    
                </div>        
            </form>
            </Dialog>
        </div>  
        </div>
    );
}

export default PantallaDevolucionMaterial;