/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
<<<<<<< Updated upstream
import './Prestamo.css';
import { Dialog } from 'primereact/dialog';
import PrestamoService from '../services/PrestamoService';



function PantallaMaterialLaboratorio() {
=======
import './Alertas.css';
import {Dialog} from 'primereact/dialog';
import RegistroMaterialServices from '../services/RegistroMaterialServices';
import PrestamoService from '../services/PrestamoService';

function PantallaMaterialLaboratorio(){ 
>>>>>>> Stashed changes
    const [id_material,setid_material] = useState(1);
    const [clave,setclave] = useState("");
    const [id_ubicacion,setid_ubicacion] = useState("");
    const [nombre_material,setnombre_material] = useState("");
    const [numserie,setnumserie] = useState("");
    const [id_categoria,setid_categoria] = useState("");
    const [marca,setmarca] = useState("");
    const [modelo,setmodelo] = useState("");
    const [id_estado,setid_estado] = useState("");
    const [descripcion,setdescripcion] = useState("");
    const [permiso,setpermiso] = useState("");
    const [fechaRegistro,setfechaRegistro] = useState("");
    const [showSuccessMessage, setshowSuccessMessage] = useState(false);
    const [showErrorMessage, setshowErrorMessage] = useState(false);
    const [materiales, setMateriales] = useState([]);
    const [matriculaValida, setmatriculaValida] = useState(false);
<<<<<<< Updated upstream
    const [isFieldDisabled, setisFieldDisabled] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
=======
    const [errorMatricula, seterrorMatricula] = useState('')
    const [isFieldDisabled, setisFieldDisabled] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [material, setMaterial] = useState("");
>>>>>>> Stashed changes

    const toast = useRef(null);

    //Mensaje de confirmacion de exito
    const MensajeEx = (mensaje) =>{
        toast.current.show({severity: 'success', summary: 'Exito', detail: mensaje, life:3000});
    }
<<<<<<< Updated upstream

    //Mensaje de advertencia sobre algun campo
    const MensajeAd = (mensaje)=>{
        toast.current.show({severity:'warn', summary:'Advertencia', detail:mensaje, life:3000});
    }

    //Mensaje de error para cualquier cosa
    const MensajeEr = (mensaje)=>{
        toast.current.show({severity: 'error', summary: 'Error', detail: mensaje, life: 3000});
    }
    //Funcion para obtener los materiales y mostrar
    useEffect(() => {
        const fetchMateriales = async () => {
            try {
                const response = await MaterialService.obtenerMaterial();
                setMateriales(response.data); // Muestra los materiales en la interfaz
            } catch (error) {
                MensajeEr("Error al obtener los materiales:");
=======

    //Mensaje de advertencia sobre algun campo
    const MensajeAd = (mensaje)=>{
        toast.current.show({severity:'warn', summary:'Advertencia', detail:mensaje, life:3000});
    }

    //Mensaje de error para cualquier cosa
    const MensajeEr = (mensaje)=>{
        toast.current.show({severity: 'error', summary: 'Error', detail: mensaje, life: 3000});
    }

    // Estado para el material buscado
    const PantallaMaterialLaboratorio = () => {
        const [material, setMaterial] = useState("");
    };

    const handleSearch = () => {
        // Lógica para buscar el material
        console.log("Buscando material:", material);
      };

    {/*
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
*/}
    //Funcion para mandar los datos al services
    const agregar =(event)=>{
        event.preventDefault();
       
        RegistroMaterialServices.RegistroMaterial({
            id_material:id_material,
            clave:clave,
            id_ubicacion:id_ubicacion,
            nombre_material:nombre_material,
            numserie:numserie,
            id_categoria:id_categoria,
            marca:marca,
            modelo:modelo,
            id_estado:id_estado,
            descripcion:descripcion,
            permiso:permiso,
            fechaRegistro: fechaRegistro
            
        }).then(response=>{
            if(response.status === 200){
            MensajeEx("Registro guardado con exito!");
            setshowSuccessMessage(true);
            setshowErrorMessage(false);
            setid_material(prevId => prevId +1);
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

        const fechaRegistro = obtenerFecha();
        setfechaRegistro(fechaRegistro);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(fechaRegistro)
    }

   

    //Funcion para obtener material y mostrar
    useEffect(() =>{
        const fetchMateriales = async () => {
            try{
                const response = await PrestamoService.obtenerMaterial();
                setMateriales(response.data);
            }catch(error){
                MensajeEr("Error al obtener los materiales");
>>>>>>> Stashed changes
            }
        };
        fetchMateriales();
    }, []);

<<<<<<< Updated upstream
    return (
        <div className='bg-white text-xl font-bold max-w-7xl mx-auto p-4'>
            <Toast ref={toast} />
            <div className='flex items-center justify-between mb-4'>
                <h1 className='flex-none mb-4'>Material</h1>

                <div className='flex items-center flex-grow justify-center mb-2'>
                    <div className='relative flex-grow max-w-xl'>
                        <input type='text' placeholder='Ingrese nombre material...' className='border border-gray-300 rounded-md p-2 w-full text-sm h-10 pr-10' />
                        <button className='absolute right-2 top-0 flex items-center h-full'>
                            <img src='./src/imagenes/lupa.png' alt='Buscar' className='w-4 h-4 text-gray-500' />
                        </button>
                    </div>
                </div>
                <button className='bg-blue-500 text-white font-bold py-1 px-3 rounded h-10 ml-4' onClick={() => setShowDialog(true)}>Registrar nuevo material</button>
            </div>
            <hr className='my-4 border-gray-900' />

            <table className='min-w-full border-collapse'>
                <thead>
                    <tr>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>ID Material</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Clave</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Ubicación</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Nombre</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Número de serie</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Categoría</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Marca</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Modelo</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Estado</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Descripción</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Permiso de usuario</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Fecha de registro</th>
                        <th className='border border-gray-100 p-2 text-center text-sm font-sans'>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    {materiales.map((material) => (
                        <tr key={material.id_material}>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.clave}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.id_ubicacion}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.nombre_material}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.numserie}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.id_categoria}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.marca}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.modelo}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.id_estado}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.descripcion}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.permiso}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>{material.fechaRegistro}</td>
                            <td className='border border-gray-100 p-2 text-center text-sm font-sans'>
                                <button className='focus:outline-none'>
                                    <img src='./src/imagenes/modificar.png' alt='Modificar' className='h-5 w-5 inline' />
                                </button>
                                <button className='focus:outline-none ml-6'>
                                    <img src='./src/imagenes/eliminar.png' alt='Eliminar' className='h-5 w-5 inline' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Dialog header="Registrar Nuevo Material" visible={showDialog} style={{ width: '50vw' }} onHide={() => setShowDialog(false)}>
                {/* Aquí puedes agregar el formulario para registrar un nuevo material */}
                <p>Formulario para agregar material</p>
            </Dialog>
=======
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
>>>>>>> Stashed changes
        </div>
        </div>
        <button className='bg-blue-500 text-white font-bold py-1 px-3 rounded h-10 ml-4' onClick={()=> setShowDialog(true)}>Registrar nuevo material</button>
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

        <Dialog header={<span style={{fontFamily:'sans-serif', fontSize:'1.5rem', fontWeight:'bold', color:'#333'}}>Registro Prestamo</span>}visible={showDialog}
            style={{width:'50vw'}}
            onHide={()=>setShowDialog(false)}>
                 <form action="">
                <div className=" inline-block  w-1/2 p-4">
                    <label htmlFor="clave" className="block ">Clave</label>
                    <input type="text" name="" id="clave" className="no-spin mt-1 border-gray-400 border-1 focus:border-green-400 w-full"  />

                    <label htmlFor="numserie" className="block">Numero de Serie</label>
                    <input type="text" name="" id="numserie" className="no-spin mt-1 border-gray-400 border-1 focus:border-green-400" />

                    <label htmlFor="modelo" className="block">Modelo</label>
                    <input type="text" name="" id="modelo" className="mt-1 border-gray-400 border-1 focus-ring-2 focus:border-green-400" />

                    <label htmlFor="id_estado" className="block">Estado</label>
                    <select id="id_estado" name="" class=" mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Seleccione una opción</option>
                        <option value="1">Disponible</option>
                        <option value="2">Prestado</option>
                        <option value="3">Reparacion</option>
                        <option value="4">Guardado</option>
                        <option value="5">Reserva</option>
                    </select>

                    <label htmlFor="id_categoria" className="block">Categoria</label>
                    <select id="id_categoria" name="" class=" mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Seleccione una opción</option>
                        <option value="1">Laptop</option>
                        <option value="2">Mouse</option>
                        <option value="3">Teclado</option>
                        <option value="4">Pantalla</option>
                        <option value="5">Adaptador</option>
                        <option value="6">libro</option>
                        <option value="7">herramienta</option>
                    </select>
                </div>

                <div className="inline-block  w-1/2 p-4 mt-0">
                    <label htmlFor="nombre_material" className="block mt-0">Nombre</label>
                    <input type="text" name="" id="nombre_material" className="mt-1 border-gray-400 border-1 focus-ring-2 focus:border-green-400" />
                    
                    <label htmlFor="marca" className="block">Marca</label>
                    <input type="text" name="" id="marca" className="mt-1 border-gray-400 border-1 focus-ring-2 focus:border-green-400" />

                   

                    <label htmlFor="permiso" className="block">Permisos</label>
                    <select id="permiso" name="" class=" mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Seleccione una opción</option>
                        <option value="1">Maestros</option>
                        <option value="2">Alumnos</option>
                        <option value="3">Ambos</option>
                    </select>

                    <label htmlFor="id_ubicacion" className="block">Ubicacion</label>
                    <select id="id_ubicacion" name="" class=" mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Seleccione una opción</option>
                        <option value="1">Aula</option>
                        <option value="2">Laboratorio</option>
                        <option value="3">Cubiculo</option>
                        <option value="4">Almacen</option>
                    </select>
                    <label htmlFor="descripcion" className="block">Descripcion</label>
                    <input type="text" name="" id="descripcion" className=" w-full p-2 border border-gray-300  resize-none h-6 transition-all duration-300 ease-in-out focus:h-40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

                    
                </div>

                <div className="block  p-3">
                   
                    <label  htmlFor="fechaRegistro" class="inline-block text-gray-700 font-semibold p-4">Fecha</label>
                    <input type="date" id="fechaRegistro" name="date" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required/>

                    </div> 

                <div class="flex justify-center">

                {/*Boton del formulario*/}
                <button
                type="submit"
                class="w-1/3  mx-auto block bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={(event) => agregar(event)}
                >
                Guardar
                </button>
                
                <button
                type="submit"
                class="w-1/3   mx-auto block bg-rose-500 text-white font-semibold py-2 rounded hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                Borrar
                </button>   
                </div>
    
    const handleSearch = () {
    console.log("Buscando material:", material)
  };

  return (
    <div className="pantalla-material">
      <h1 className="titulo">Consulta de Material en el Laboratorio</h1>
      <div className="formulario">
        <input
          type="text"
          placeholder="Nombre del material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="input-material"
        />
        <button className="boton_buscar" onClick={handleSearch}>
          Buscar
        </button>
      </div>
      <div className="resultado">
        {/* Aquí se mostrarán los resultados */}
        <p>No hay resultados aún</p>
      </div>
    </div>
  )
            </form>
            </Dialog>
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

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
export default PantallaMaterialLaboratorio;