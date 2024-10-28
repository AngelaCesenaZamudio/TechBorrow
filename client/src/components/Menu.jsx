import { useNavigate } from "react-router-dom";

function Menu() {

  const navigate =useNavigate();

  return (
    <div className='bg-white text-xl font-bold max-w-7xl mx-auto p-4'>
     <h1 className='mb-4'>Sistema para el material de laboratorio</h1>

     <div className="flex items-right justify-center mb-4">
     <div className='flex w-full'>
     <div className='bg-green-700 w-2 h-full rounded-l-md'></div>
        <button className="border-4 border-slate-7000/50 text-black p-2.5 rounded-lg flex-grow flex items-center transition duration-200"
         onClick={() => navigate('/PantallaMaterialLaboratorio')}>
          <div className='bg-zinc-100'>
          <img src='./src/imagenes/material.png' className="w-15 h-15 mr-4 transform-rotate-15" />
          </div>
          <span className="font-bold tranform -translate-y-6">Material de laboratorio</span>
          <span className='ml-0 text-xs text-gray-600'>
            Registrar | Consultar | Modificar | Eliminar 
          </span>
        </button>
      </div>
    </div>

    <div className="flex items-right justify-center mb-4">
     <div className='flex w-full'>
     <div className='bg-green-700 w-2 h-full rounded-l-md'></div>
        <button className="border-4 border-slate-7000/50 text-black p-2.5 rounded-lg flex-grow flex items-center transition duration-200"
         onClick={() => navigate('/MenuServicios')}>
          <div className='bg-zinc-100'>
          <img src='./src/imagenes/servicios.png' className="w-15 h-15 mr-4 transform-rotate-15" />
          </div>
          <span className="font-bold tranform -translate-y-6">Servicios</span>
          <span className='ml-0 text-xs text-gray-600'>
            Prestamo | Devolucion | Reportes | Inventarios 
          </span>
        </button>
      </div>
    </div>
    
    <div className="flex items-right justify-center mb-4">
     <div className='flex w-full'>
     <div className='bg-green-700 w-2 h-full rounded-l-md'></div>
        <button className="border-4 border-slate-7000/50 text-black p-2.5 rounded-lg flex-grow flex items-center transition duration-200"
         onClick={() => navigate('')}>
          <div className='bg-zinc-100'>
          <img src='./src/imagenes/usuario.png' className="w-15 h-15 mr-4 transform-rotate-15" />
          </div>
          <span className="font-bold tranform -translate-y-6">Usuarios</span>
          <span className='ml-0 text-xs text-gray-600'>
            Registrar | Consultar | Modificar | Eliminar 
          </span>
        </button>
      </div>
    </div>

    
  </div>
  );
}

export default Menu;