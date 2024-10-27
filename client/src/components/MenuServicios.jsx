import { useNavigate } from "react-router-dom";

function MenuServicios() {

  const navigate = useNavigate();

  return (
    <div className='bg-white text-xl font-bold max-w-7xl mx-auto p-4'>
     <h1 className='mb-4'>Servicios</h1>

     <div className="flex items-right justify-center mb-1">
     <div className='flex w-full'>
     <div className='bg-green-700 w-2 h-full rounded-l-md'></div>
        <button className="border-4 border-slate-7000/50 text-black p-2 rounded-lg flex-grow flex items-center transition duration-200"
<<<<<<< Updated upstream
        onClick={() => navigate('/Prestamo')}>
=======
        onClick={() => navigate('/PantallaPrestamoMaterial')}>
>>>>>>> Stashed changes
          <div className='bg-zinc-100'>
          <img src='./src/imagenes/servicios.png' className="w-13 h-13 mr-3 transform-rotate-15" />
          </div>
          <span className="font-bold tranform -translate-y-6">Prestamos</span>
          <span className='ml-0 text-xs text-gray-600'>
            Registrar | Consultar 
          </span>
        </button>
      </div>
    </div>

    <div className="flex items-right justify-center mb-1">
     <div className='flex w-full'>
     <div className='bg-green-700 w-2 h-full rounded-l-md'></div>
        <button className="border-4 border-slate-7000/50 text-black p-2 rounded-lg flex-grow flex items-center transition duration-200"
         onClick={() => navigate('')}>
          <div className='bg-zinc-100'>
          <img src='./src/imagenes/devolucion.png' className="w-13 h-13 mr-3 transform-rotate-15" />
          </div>
          <span className="font-bold tranform -translate-y-6">Devolucion</span>
          <span className='ml-0 text-xs text-gray-600'>
            Registrar | Consultar 
          </span>
        </button>
      </div>
    </div>

    <div className="flex items-right justify-center mb-1">
     <div className='flex w-full'>
     <div className='bg-green-700 w-2 h-full rounded-l-md'></div>
        <button className="border-4 border-slate-7000/50 text-black p-1 rounded-lg flex-grow flex items-center transition duration-200"
         onClick={() => navigate('')}>
          <div className='bg-zinc-100'>
          <img src='./src/imagenes/reportes.png' className="w-13 h-13 mr-3 transform-rotate-15" />
          </div>
          <span className="font-bold tranform -translate-y-6">Reportes</span>
          <span className='ml-0 text-xs text-gray-600'>
            Registrar | Consultar 
          </span>
        </button>
      </div>
    </div>

    <div className="flex items-right justify-center mb-1">
     <div className='flex w-full'>
     <div className='bg-green-700 w-2 h-full rounded-l-md'></div>
        <button className="border-4 border-slate-7000/50 text-black p-2 rounded-lg flex-grow flex items-center transition duration-200"
         onClick={() => navigate('/MenuServicios')}>
          <div className='bg-zinc-100'>
          <img src='./src/imagenes/inventario.png' className="w-13 h-13 mr-3 transform-rotate-15" />
          </div>
          <span className="font-bold tranform -translate-y-6">Inventario</span>
          <span className='ml-0 text-xs text-gray-600'>
            Registrar | Consultar 
          </span>
        </button>
      </div>
    </div>
  </div>
  
  );
}

export default MenuServicios;
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
