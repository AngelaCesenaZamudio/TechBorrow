// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
import { Link } from 'react-router-dom';


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
            <button className='border-black text-black'><a href='/Menu'>Menú</a></button>

            <button className='border-black text-black'><a href='/PantallaPrestamoMaterial'>Préstamo</a></button>

            <button className='border-black text-black'><a href='/'>Devolución</a></button>

            <button className='border-black text-black'><a href='/PantallaMaterialLaboratorio'>Material</a></button>

            <button className='border-black text-black'><a href='/'>Usuarios</a></button>
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