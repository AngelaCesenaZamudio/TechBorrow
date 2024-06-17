/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useRef, useState } from 'react'
import PrestamoService from '../services/PrestamoService';

function RegistroPrestamo(){ 
    const [id_Prestamo,setid_Prestamo] = useState(0);
    const [matricula_claveempleado_solicitante,setmatricula_claveempleado_solicitante] = useState("");
    const [nombre_material,setnombre_material] = useState("");
    const [categoria_material,setcategoria_material] = useState("");
    const [fecha_Prestamo,setfecha_Prestamo] = useState("");
    const [hora_Prestamo,sethora_Prestamo] = useState("");
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
            }
        }).catch(error=>{
            if(error.response.status === 400){
                MensajeAd("Material prestado!");
            }else if(error.response.status === 401){
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
                <input onChange={(event)=>{setmatricula_claveempleado_solicitante(event.target.value);}} type='text' name='matricula' /></label>
            <label>Material:
                <input onChange={(event)=>{setnombre_material(event.target.value);}} type='text' name='material'/></label>
            <label>Categoria:
                <input onChange={(event)=>{setcategoria_material(event.target.value);}} type='text' name='categoria'/></label>    
            <label>Fecha:
                <input onChange={(event)=>{setfecha_Prestamo(event.target.value);}} type='date' name='fecha'/></label>
            <label>hora:
                <input onChange={(event)=>{sethora_Prestamo(event.target.value);}} type='time' name='hora'/></label>

            <button className="border-black text-black" label="Guardar" onClick={(event) => agregar(event)}>Guardar</button>
            </form>
        </div>
    );
}

export default RegistroPrestamo;