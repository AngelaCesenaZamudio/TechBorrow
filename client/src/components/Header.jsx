// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
import { Link } from 'react-router-dom';
//import RegistroPrestamo from './RegistroPrestamo'


function Header(){
      // Estado para controlar el menú desplegable del usuario
      const [userDropdown, setUserDropdown] = useState(false);
      const toggleUserDropdown = () => setUserDropdown(prevState => !prevState);
      const [dropdown2, setDropdown2]=useState(false);
      const [dropdown3, setDropdown3]=useState(false);
      const [dropdown4, setDropdown4]=useState(false);
      const [dropdown5, setDropdown5]=useState(false);
  
      const toggleDropdown2=()=>{
          setDropdown2(prevState=>!prevState);
      };
      const toggleDropdown3=()=>{
          setDropdown3(prevState=>!prevState);
      };
      const toggleDropdown4=()=>{
          setDropdown4(prevState=>!prevState);
      };
      const toggleDropdown5=()=>{
          setDropdown5(prevState=>!prevState);
      };

    return (
        <div className='bg-white'>
        <div className='md:px-10 py-0 px-7 md:flex justify-between items-center'>
            <div className='bg-green-700 p-1 rounded-md mb-2 mt-2 flex items-center'>
            <div className='flex text-2xl cursor-pointer items-center gap-2'>
            <img src='./src/imagenes/logo-cimarron.png' width={40} height={40}></img>
                <span className='font-bold text-lg text-white'>Laboratorio de Sistemas Computacionales</span>
            </div>
        </div>

        <div className='flex space-x-4 text-xl ml-auto'>
            <button className='border-black text-black'><a href='/Menu'>Menu</a></button>

            <Dropdown isOpen={dropdown2} toggle={toggleDropdown2}>
                <DropdownToggle className='border-transparent bg-white text-black'>Servicios</DropdownToggle>
            
            <DropdownMenu>
                 <DropdownItem><a href="./PantallaPrestamoMaterial">Prestamo</a></DropdownItem>
                 <DropdownItem><a href="">Devolucion</a></DropdownItem>
                 <DropdownItem>Reporte</DropdownItem>
                 <DropdownItem>Inventario</DropdownItem>
            </DropdownMenu>
            </Dropdown>

            <Dropdown isOpen={dropdown3} toggle={toggleDropdown3}>
                <DropdownToggle className='border-transparent bg-white text-black'>Material</DropdownToggle>
            <DropdownMenu>
                            <DropdownItem toggle={false} onClick={toggleDropdown4} className='text-black'>
                                Registrar
                            </DropdownItem>

                            {dropdown4 && (
                                <div className='border-transparent bg-white shadow-lg mt-2 ml-3 p-2'>
                                    <DropdownMenu>
                                        <DropdownItem><a href="./PantallaMaterialLaboratorio">Material</a></DropdownItem>
                                        <DropdownItem>Ubicacion</DropdownItem>
                                        <DropdownItem>Categoria</DropdownItem>
                                        <DropdownItem>Estado</DropdownItem>
                                    </DropdownMenu>
                                </div>
                            )}

                 <DropdownItem>Consultar</DropdownItem>
                 <DropdownItem>Modificar</DropdownItem>
                 <DropdownItem>Eliminar</DropdownItem>
            </DropdownMenu>
            </Dropdown>

            <Dropdown isOpen={dropdown5} toggle={toggleDropdown5}>
                <DropdownToggle className='border-transparent bg-white text-black'>Usuario</DropdownToggle>
            
            <DropdownMenu>
                 <DropdownItem><a href="./Prestamo">Registrar</a></DropdownItem>
                 <DropdownItem>Consultar</DropdownItem>
                 <DropdownItem>Modificar</DropdownItem>
                 <DropdownItem>Eliminar</DropdownItem>
            </DropdownMenu>
            </Dropdown>
        </div>

          {/* Ícono de Usuario con menú desplegable */}
          <div className='flex space-x-4 text-xl'>
                    <Dropdown isOpen={userDropdown} toggle={toggleUserDropdown}>
                        <DropdownToggle className='border-transparent bg-white text-black'>
                            <img src="./src/imagenes/usuario.png" width={25} height={25} alt="Usuario" />
                        </DropdownToggle>
                        <DropdownMenu className="p-3" style={{ minWidth: '250px', backgroundColor: '#d3d7d4' }}>
                            {/* Foto y sección de información del Usuario */}
                            <div className="d-flex align-items-center border border-dark p-2 rounded">
                                {/* Foto del usuario */}
                                <img 
                                    src="./src/imagenes/avatar.png" 
                                    width={60} 
                                    height={60} 
                                    alt="Foto del Usuario" 
                                    className="rounded-circle mr-3"
                                />
                                
                                {/* Información del usuario */}
                                <div>
                                    <div><strong>Meliza Diaz Nava</strong></div>
                                    <div><strong>Matrícula:</strong> 1173346</div>
                                    <div><strong>Permiso:</strong> Administrador</div>
                                </div>
                            </div>

                            {/* Otras opciones */}
                            <DropdownItem className="mt-2 bg-white text-dark">Otra opción?</DropdownItem>
                            <DropdownItem divider />
                            
                            {/* Cerrar sesión */}
                            <DropdownItem className="mt-2 bg-white text-dark"><Link to='./'>Cerrar Sesión</Link></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        <div className='bg-yellow-400 md:px-10 py-1 px-7 md:flex justify-between items-center'></div>
        </div>
    );
}

export default Header