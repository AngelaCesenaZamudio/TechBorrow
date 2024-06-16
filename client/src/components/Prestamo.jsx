/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useRef, useState } from 'react'
import PrestamoService from '../services/PrestamoService';

function RegistroPrestamo(){
    const [idPrestamo,setidPrestamo] = useState(0);
    const [matricula,setmatricula] = useState("");
    const [material,setmaterial] = useState("");
    const [fechah,setfechah] = useState("");
    const toast = useRef(null);

    //Mensaje de confirmacion de exito
    const MensajeEx =(mensaje)=>{
        toast.current.show({severity:'sucess', summary:'Exito', detail:mensaje, life:3000});
    }

    //Mensaje de advertencia sobre algun campo
    const MensajeAd = (mensaje)=>{
        toast.current.show({severity:'warn', summary:'Advertencia', detail:mensaje, life:3000});
    }

    //Mensaje de error para cualquier cosa
    const MensajeEr = (mensaje)=>{
        toast.severity.show({severity:'error', summary:'Error', detail:mensaje, life:3000});
    }


    //Funcion para mandar los datos al services
    const agregar =()=>{
        if(!matricula || !material) {
            MensajeAd("Hay campos vacios");
            return;
        }
        PrestamoService.registroPrestamo({
            idPrestamo:idPrestamo,
            matricula:matricula,
            material:material,
            fechah:fechah
        }).then(Response=>{
            MensajeEx("Registro guardado con exito!");
        }).catch(error=>{
            if(error.response.status===400){
                MensajeAd("Material prestado!");
            }else if(error.response.status===401){
                MensajeEr("Error del servidor");
            }
        });
    }

    return(
        <div className='w-70 h-80 max-w-screen-lg mx-auto bg-white text-center'>
            <p className='font-bold text-3xl'>Registro de Prestamo</p>
            <p></p>
            <form className='align-text-top'>
            <label>Matricula/No.Empleado:
                <input onChange={(event)=>{setmatricula(event.target.value);}} type='text' name='matricula' /></label>
            <label>Equipos disponible
                <input onChange={(event)=>{setmaterial(event.target.value);}} type='text' name='material'/></label>
            
            
            <label>Fecha:<input onChange={(event)=>{setfechah(event.target.value);}} type='date' name='fecha'/></label>

            <button className='border-black text-black' label="Guardar" onClick={agregar}>Guardar</button>
            </form>
        </div>
    );
}

export default RegistroPrestamo;