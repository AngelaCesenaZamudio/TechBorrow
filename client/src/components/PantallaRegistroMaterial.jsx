import { useNavigate } from "react-router-dom";

function PantallaRegistroMaterial() {

  const navigate = useNavigate();

  return (
    //Clase padre
    <div className='bg-white text-xl font-bold max-w-7xl mx-auto p-4'>
     <h1 className='mb-4'>Registro de Material</h1>
    <form action="">
        
        <div className="inline-block  m-4">
       <label htmlFor="" className="block">Clave</label>
       <input type="number" name="" id="" className="no-spin mt-1 border-gray-400 border-1 focus:border-green-400"/> 

       <label htmlFor="" className="block">Numero de Serie</label>
       <input type="number" name="" id="" className="no-spin mt-1 border-gray-400 border-1 focus:border-green-400" />

       <label htmlFor="" className="block">Modelo</label>
       <input type="text" name="" id="" className="mt-1 border-gray-400 border-1 focus-ring-2 focus:border-green-400" />

       <label htmlFor="" className="block">Estado</label>
        <select id="" name="" class=" mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Seleccione una opción</option>
            <option value="">Disponible</option>
            <option value="">Prestado</option>
            <option value="">Guardado</option>
            <option value="">Reservado</option>
        </select>

        <label htmlFor="" className="block">Categoria</label>
        <select id="" name="" class=" mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Seleccione una opción</option>
            <option value="">Laptop</option>
            <option value="">Teclado</option>
            <option value="">Tv</option>
        </select>   
        </div>

        <div className="inline-block m-4">
        <label htmlFor="" className="block">Nombre</label>
       <input type="text" name="" id="" className="mt-1 border-gray-400 border-1 focus-ring-2 focus:border-green-400" />

        <label htmlFor="" className="block">Marca</label>
        <input type="text" name="" id="" className="mt-1 border-gray-400 border-1 focus-ring-2 focus:border-green-400" />

        <label htmlFor="" className="block">Permisos</label>
        <select id="" name="" class=" mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Seleccione una opción</option>
            <option value="">Maestros</option>
            <option value="">Alumnos</option>
            <option value="">Ambos</option>
        </select>

        <label htmlFor="" className="block">Ubicacion</label>
        <select id="" name="" class=" mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Seleccione una opción</option>
            <option value="">Laboratorio</option>
            <option value="">Cubiculos</option>
            <option value="">Aula</option>
            <option value="">Almacen</option>
        </select> 
        </div>
        <label htmlFor="" className="block">Descripcion</label>
       <input type="text" name="" id="" className="w-full mt-1 border-gray-400 border-1 focus-ring-2 focus:border-green-400" />

       <label for="date" class="block text-gray-700 font-semibold">Fecha</label>
    <input
      type="date"
      id="date"
      name="date"
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />

 
    <label for="time" class="block text-gray-700 font-semibold">Hora</label>
    <input type="time" id="time" name="time" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required
    />

    
    <button type="submit" class="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
      Enviar
    </button>
       
    </form>

    </div>
  );
}

export default PantallaRegistroMaterial;