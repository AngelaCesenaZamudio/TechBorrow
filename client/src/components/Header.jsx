// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
//import RegistroPrestamo from './RegistroPrestamo'


function Header(){

    const [dropdown2, setDropdown2]=useState(false);
    const [dropdown3, setDropdown3]=useState(false);
    const [dropdown4, setDropdown4]=useState(false);

    const toggleDropdown2=()=>{
        setDropdown2(prevState=>!prevState);
    };
    const toggleDropdown3=()=>{
        setDropdown3(prevState=>!prevState);
    };
    const toggleDropdown4=()=>{
        setDropdown4(prevState=>!prevState);
    };

    return (
        <div className='bg-white'>
          <div className='md:px-10 py-0 px-7 md:flex justify-between items-center'>
            <div className='flex text-2xl cursor-pointer items-center gap-2'>
            <img src='./src/imagenes/escudo.png' width={40} height={40}></img>
                <span className='font-bold text-lg'>Laboratorio de Sistemas Computacionales.</span>
            </div>

            <div className='flex space-x-16 text-xl'>
            <button className='border-black text-black'><a href='/'>Menu</a></button>

            <Dropdown isOpen={dropdown2} toggle={toggleDropdown2}>
                <DropdownToggle className='border-transparent bg-white text-black'>Servicios</DropdownToggle>
            
            <DropdownMenu>
                 <DropdownItem><a href="./Prestamo.jsx">Registro Prestamo</a></DropdownItem>
                 <DropdownItem><a href="">Registro Devolucion</a></DropdownItem>
                 <DropdownItem>Consulta Prestamos</DropdownItem>
            </DropdownMenu>
            </Dropdown>

            <Dropdown isOpen={dropdown3} toggle={toggleDropdown3}>
                <DropdownToggle className='border-transparent bg-white text-black'>Material</DropdownToggle>
            
            <DropdownMenu>
            <Dropdown isOpen={dropdown4} toggle={toggleDropdown4}>
                <DropdownToggle className='border-transparent bg-white text-black'>Registrar</DropdownToggle>
                   <DropdownMenu>
                   <DropdownItem>Material</DropdownItem>
                   <DropdownItem>Marca</DropdownItem>
                   <DropdownItem>Modelo</DropdownItem>
                   <DropdownItem>Categoria</DropdownItem>
                   <DropdownItem>Estado</DropdownItem>
                   </DropdownMenu>
                   </Dropdown>

                 <DropdownItem>Consulta Material</DropdownItem>
                 <DropdownItem>Modificacion Material</DropdownItem>
                 <DropdownItem>Eliminar Material</DropdownItem>
            </DropdownMenu>
            </Dropdown>
            
            <button className='border-black text-black '>Salir</button>
            </div>
          </div>
          <div className='bg-yellow-400 md:px-10 py-1 px-7 md:flex justify-between items-center'></div>
        </div>
    );
}

export default Header