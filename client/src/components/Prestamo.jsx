/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useState } from 'react'
//import Header from './Header';

function RegistroPrestamo(){

    const [matricula,setmatricula] = useState("");
    const [material,setmaterial] = useState("");
    const [fecha,setfecha] = useState("");
    const [hora,sethora] = useState("");

    return(
        <div className='w-70 h-80 max-w-screen-lg mx-auto bg-white text-center'>
            <p className='font-bold text-3xl'>Registro de Prestamo</p>
            <p></p>
            <form className='align-text-top'>
            <label>Matricula/No.Empleado:
                <input onChange={(event)=>{setmatricula(event.target.value);}} type='text' name='matricula' /></label>
            <label>Equipos disponible
                <input onChange={(event)=>{setmaterial(event.target.value);}} type='text' name='material'/></label>
            
            
            <label>Fecha:<input onChange={(event)=>{setfecha(event.target.value);}} type='date' name='fecha'/></label>
            <label>Hora:<input onChange={(event)=>{sethora(event.target.value);}} type='time' name='hora'/></label>

            
            </form>
        </div>
    );
}

export default RegistroPrestamo;