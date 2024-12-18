import React, { useState, useEffect } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Stack,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import ApiRequest from "../../../helpers/axiosInstances";
import {
  AddOutlined,
  EditOutlined,
  DeleteOutline,
  ExitToApp,
  Close,
} from "@mui/icons-material";
import Page from "../../common/Page";
//import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from "../../common/CommonTable";

const Prestamos = () => {
  const initialState = {
    datosprestamo: "",
    horavenc: "",
    material: "",
    matricula: "",
    clave: "",
    //fecha_registro: new Date().toISOString().slice(0, 19).replace('T', ' ')
  };
  const [usuariosList, setUsuariosList] = useState([]);
  const [body, setBody] = useState(initialState);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [mensaje, setMensaje] = useState({
    ident: null,
    message: null,
    type: null,
  });

  const init = async () => {
    const { data } = await ApiRequest().get("/app");
    setUsuariosList(data);
  };

  const columns = [
    { field: "datosprestamo", headerName: "Datos de préstamo", width: 120 },
    { field: "horavenc", headerName: "Hora de vencimiento", width: 220 },
    { field: "material", headerName: "Material", width: 220 },
    {
      field: "matricula",
      headerName: "Matrícula/Clave de empleado",
      width: 220,
    },
    { field: "clave", headerName: "Clave", width: 220 },
    {
      field: "",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <Stack
          divider
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <IconButton
            size="small"
            onClick={() => {
              setIsEdit(true);
              setBody(params.row);
              handleDialog();
            }}
          >
            <EditOutlined />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(params.id)}>
            <DeleteOutline />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const onDelete = async (id) => {
    try {
      const { data } = await ApiRequest().post("/eliminar", { id: id });
      setMensaje({
        ident: new Date().getTime(),
        message: data.message,
        type: "success",
      });
      init();
    } catch ({ response }) {
      setMensaje({
        ident: new Date().getTime(),
        message: response.data.sqlMessage,
        type: "error",
      });
    }
  };

  const handleDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  const onChange = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    try {
      const { data } = await ApiRequest().post("/guardar", body);
      handleDialog();
      setBody(initialState);
      setMensaje({
        ident: new Date().getTime(),
        message: data.message,
        type: "success",
      });
      init();
      setIsEdit(false);
    } catch ({ response }) {
      setMensaje({
        ident: new Date().getTime(),
        message: response.data.sqlMessage,
        type: "error",
      });
    }
  };

  const onEdit = async () => {
    try {
      const { data } = await ApiRequest().post("/editar", body);
      handleDialog();
      setBody(initialState);
      setMensaje({
        ident: new Date().getTime(),
        message: data.message,
        type: "success",
      });
      init();
    } catch ({ response }) {
      setMensaje({
        ident: new Date().getTime(),
        message: response.data.sqlMessage,
        type: "error",
      });
    }
  };

  useEffect(init, []);

  const [id_prestamo, setid_prestamo] = useState(0);
  const [matricula_claveempleado, setmatricula_claveempleado] = useState("");
  const [nombre_material, setnombre_material] = useState("");
  //const [nombre_materialValido, setnombre_materialValido] = useState("");
  const [nombre_solicitante, setnombre_solicitante] = useState("");
  const [fecharegistro, setfecharegistro] = useState("");
  const [horaregistro, sethoraregistro] = useState("");
  const [fechavencimiento, setfechavencimiento] = useState("");
  const [horavencimiento, sethoravencimiento] = useState("");
  // const [showSuccessMessage, setshowSuccessMessage] = useState(false);
  // const [showErrorMessage, setshowErrorMessage] = useState(false);
  const [prestamos, setprestamos] = useState([]);
  const [matriculaValida, setmatriculaValida] = useState(false);
  //const [errorMatricula, seterrorMatricula] = useState('')
  const [isFieldDisabled, setisFieldDisabled] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [comentarios, setcomentarios] = useState("");
  //const toast = useRef(null);
  const hasDebt = true;
  const hasActiveLoan = false;

  const isDesabled = hasDebt || hasActiveLoan;

  //Mensaje de confirmacion de exito
  // const MensajeEx = (mensaje) =>{
  //     toast.current.show({severity: 'success', summary: 'Exito', detail: mensaje, life:3000});
  // }

  //Mensaje de advertencia sobre algun campo
  // const MensajeAd = (mensaje)=>{
  //     toast.current.show({severity:'warn', summary:'Advertencia', detail:mensaje, life:3000});
  // }

  //Mensaje de error para cualquier cosa
  // const MensajeEr = (mensaje)=>{
  //     toast.current.show({severity: 'error', summary: 'Error', detail: mensaje, life: 3000});
  // }

  //Funcion para que no acepte simbolos
  const handleMatriculaChange = (event) => {
    const value = event.target.value;
    const regex = /^[0-9\b]+$/;

    if (value === "" || regex.test(value)) {
      setmatricula_claveempleado(value);

      if (value !== "") {
        //debounceValidaMatricula(value);
      } else {
        setisFieldDisabled(true);
      }
    } else {
      MensajeAd("Solo se permite numeros");
    }
  };

  //Metodo que valida luego de comprobar que no hay letras ni simbolos
  // const debounceValidaMatricula = debounce(async(value) => {
  //     if(value.length>=7){
  //     try{
  //         const response = await PrestamoService.validarMatricula_Claveempleado(value);
  //         if(response.status===200){
  //             setmatriculaValida(true);
  //             setmatricula_claveempleado(value);
  //             setnombre_solicitante(response.data.nombre);
  //             seterrorMatricula('');
  //             setisFieldDisabled(false);
  //         }
  //     }catch(error){
  //         console.log("Error en el client: ",error);
  //         if(error.response){
  //             //Solicitante no registrado
  //             if(error.response.status===404){
  //             MensajeEr("Solicitante no registrado");
  //         }else if(error.response.status===400){
  //             if(error.response.data === "El solicitante tiene adeudos pendientes."){
  //                //Solicitante con adeudos
  //                 MensajeEr("El solicitante tiene adeudos pendientes.");
  //                 setisFieldDisabled(true);
  //             }else if(error.response.data==="El solicitante ya tiene un prestamo activo"){
  //                 //Solicitante con prestamos activo
  //                 MensajeEr("El solicitante ya tiene un prestamo activo");
  //                 setisFieldDisabled(true);
  //             }
  //             else{
  //                 MensajeEr("Solicitante no activo o problemas con adeudos");
  //                 setisFieldDisabled(true);
  //             }
  //         }else{
  //             MensajeEr("Error al validar");
  //         }
  //     }
  //     }
  // }
  // },500);

  //Funcion para que actualice la matricula
  useEffect(() => {
    if (matriculaValida) {
      console.log("Estado despues de actualizar: ", matriculaValida);
      console.log("solicitante: ", nombre_solicitante);
      MensajeEx("Solicitante valido");
    }
  }, [matriculaValida, nombre_solicitante]);

  const handleMaterialChange = (event) => {
    const value = event.target.value;
    setnombre_material(value);

    if (value.trim() !== "" && value.length >= 5) {
      //debounceMaterial(value);
    }
  };

  //Validar que el material este disponible
  // const debounceMaterial = async (value) =>{
  //     try{
  //         const response = await PrestamoService.estadoMaterial(value);
  //         console.log("Servidor: ",response);
  //         console.log("Recibido: ",response.data.estado);
  //         if(response.status===200 && response.data.mensaje ==="El material esta disponible"){
  //             setnombre_materialValido(true);
  //             MensajeEx("El material esta disponible");
  //             setnombre_material(value);

  //             calcularHoravencimiento(fecharegistro, horaregistro);
  //         }else{
  //             MensajeAd("El material no esta disponible");
  //         }
  //     }catch(error){
  //         if(error.response){
  //             //Material no registrado
  //             if(error.response.status===404){
  //             MensajeEr("Material no registrado");
  //         }else{
  //             MensajeEr("Error al validar");
  //         }
  //     }else{
  //         MensajeEr("Error de conexion");
  //     }
  //     }
  // };

  //Funcion para mandar los datos al services
  const agregar = (event) => {
    event.preventDefault();
    if (!matricula_claveempleado || !nombre_material) {
      MensajeAd("Hay campos vacios, por favor completa todos los campos");
      return;
    }

    calcularHoravencimiento(fecharegistro, horaregistro);

    console.log("fecha vencimiento en agregar: " + fechavencimiento);
    console.log("hora vencimiento en agregar:" + horavencimiento);

    const prestamoData = {
      id_prestamo: id_prestamo,
      matricula_claveempleado: matricula_claveempleado,
      nombre_material: nombre_material,
      estado: "Prestado",
      comentarios: comentarios,
      fecharegistro: fecharegistro,
      horaregistro: horaregistro,
      fechavencimiento: fechavencimiento,
      horavencimiento: horavencimiento,
    };

    PrestamoService.RegistroPrestamo(prestamoData)
      .then(async (response) => {
        if (response.status === 200) {
          MensajeEx("Registro guardado con exito!");
          limpiarCampos();
          setshowSuccessMessage(true);
          setshowErrorMessage(false);
          setid_prestamo((prevId) => prevId + 1);

          PrestamoService.actualizarEstadoMaterial(nombre_material)

            .then((response) => {
              MensajeEx("Estado de material actualizado");
            })
            .catch((error) => {
              console.error("Error al actualizar: ", error);
            });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          MensajeAd("Material prestado!");
        } else if (error.response.status === 401) {
          MensajeEr("Error del servidor");
        }
        setshowErrorMessage(true);
        setshowSuccessMessage(false);
      });
  };

  //Funcion que genera la fecha
  useEffect(() => {
    const obtenerFecha = () => {
      const now = new Date();
      const year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();

      if (month < 10) {
        month = `0${month}`;
      }

      if (day < 10) {
        day = `0${day}`;
      }

      return `${year}-${month}-${day}`;
    };

    const fecha_Prestamo = obtenerFecha();
    setfecharegistro(fecha_Prestamo);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fecha_Prestamo);
  };

  //Funcion que genera la hora
  useEffect(() => {
    const obtenerHora = () => {
      const now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();

      hour = hour < 10 ? `0${hour}` : hour;
      minute = minute < 10 ? `0${minute}` : minute;

      return `${hour}:${minute}`;
    };

    const hora_Prestamo = obtenerHora();
    sethoraregistro(hora_Prestamo);
  }, []);

  //Funcion para obtener los prestamos y mostrarlos
  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const response = await PrestamoService.obtenerPrestamos();
        setprestamos(response.data);
      } catch (error) {
        MensajeEr("Error al obtener los materiales");
      }
    };
    fetchPrestamos();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  //Funcion para escribir en tiempo real en los comentarisos
  const handleinputChange = (e) => {
    setcomentarios(e.target.value);
  };

  //Funcion para limpiar campos
  const limpiarCampos = () => {
    setmatricula_claveempleado("");
    setnombre_solicitante("");
    setnombre_material("");
    setcomentarios("");
    setmatriculaValida(false);
    setisFieldDisabled(true);
    sethoravencimiento("");
  };

  //Funcion para acomodar la fecha y hora en una sola variable y mostrarla
  const combinarFechaHora = (fecharegistro, horaregistro) => {
    const combinada = `${fecharegistro.split("T")[0]}T${horaregistro}`;
    const fechaHora = new Date(combinada);

    const opcionFecha = { year: "numeric", month: "2-digit", day: "2-digit" };
    const fechaFormateada = fechaHora.toLocaleDateString("es-MX", opcionFecha);

    const opcionHora = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const horaFormateada = fechaHora.toLocaleTimeString("es-MX", opcionHora);

    return `${fechaFormateada} ${horaFormateada}`;
  };

  useEffect(() => {
    console.log("fecha actualizada: " + fechavencimiento);
  }, [fechavencimiento]);

  useEffect(() => {
    console.log("hora actualizada: " + horavencimiento);
  }, [horavencimiento]);

  //Funcion que genera la fecha y hora de vencimiento
  const calcularHoravencimiento = (fecha, hora) => {
    console.log("fecha: " + fecha);
    console.log("hora: " + hora);

    const fechaCombinada = `${fecha.split("T")[0]}T${hora}`;
    const fechaHora = new Date(fechaCombinada);

    console.log("fecha combinada: " + fechaCombinada);

    fechaHora.setHours(fechaHora.getHours() + 1);

    const anio = fechaHora.getFullYear();
    const mes = (fechaHora.getMonth() + 1).toString().padStart(2, "0");
    const dia = fechaHora.getDate().toString().padStart(2, "0");
    const horas = fechaHora.getHours().toString().padStart(2, "0");
    const minutos = fechaHora.getMinutes().toString().padStart(2, "0");
    const segundos = fechaHora.getSeconds().toString().padStart(2, "0");

    const fechavencimiento = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

    console.log("fecha vencimiento en calcular: " + fechavencimiento);

    setfechavencimiento(fechavencimiento.split(" ")[0]);
    sethoravencimiento(fechavencimiento.split(" ")[1]);

    return fechavencimiento, horavencimiento;
  };

  return (
    <>
      <Page title="UABC | Préstamos">
        {/* <ToastAutoHide message={mensaje} /> */}
        <Container maxWidth="lg">
          <Box sx={{ pb: 5 }}>
            <div className="flex items-center flex-grow justify-center mb-2">
              <div className="relative flex-grow max-w-xl">
                <input
                  type="text"
                  placeholder="Ingrese nombre material..."
                  className="border border-gray-300 rounded-md p-2 w-full text-sm h-10 pr-10"
                />
                <button className="absolute right-2 top-0 flex items-center h-full">
                  <img
                    src="../src/assets/lupa.png"
                    alt="Buscar"
                    className="w-4 h-4 text-gray-500"
                  />
                </button>
              </div>
            </div>
          </Box>
          <Box sx={{ pb: 5 }}>
            <Typography variant="h5">Préstamo de material</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button
                 //onClick={() => setShowDialog(true)}
                onClick={() => handleClickOpen('paper')}
                startIcon={<AddOutlined />}
                variant="contained"
                color="primary"
              >
                Préstamo
              </Button>
            </Grid>
            <Grid item xs={12} sm={8} />
            <Grid item xs={12} sm={12}>
              <CommonTable data={usuariosList} columns={columns} />
            </Grid>
          </Grid>
        </Container>
      </Page>

      {/*Desplegable para realizar el prestamo */}
      <Dialog
        //open={true}
        onClose={handleClose}
        //scroll={setScroll(scrollbars)}
        //aria-labelledby="scroll-dialog-title"
        header={
          
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Préstamo
          </span>
        }
        visible={showDialog}
        style={{ width: "35vw" }}
        onHide={() => setShowDialog(false)}
      >
        <form onSubmit={(event) => agregar(event)}>
          <h1 className="flex justify-center font-bold text-xl mb-1">
            Datos del solicitante
          </h1>
          <div className="flex justify-between mb-3 border">
            <div className="w-1/2 mb-3 px-6">
              <label
                htmlFor="matricula_numeroempleado"
                className="text-l font-semibold mb-2 block whitespace-nowrap overflow-hidden text-ellipsis"
              >
                Matrícula/Clave de empleado{" "}
              </label>
              <input
                type="text"
                id="matricula_claveempleado"
                value={matricula_claveempleado}
                onChange={handleMatriculaChange}
                size={Math.max(matricula_claveempleado.length, 15)}
                className="border border-gray-300 rounded-md p-2 w-70"
                required
              />
            </div>

            <div className="w-1/2 mb-3 px-6">
              <label
                htmlFor="matricula_numeroempleado"
                className="text-l font-semibold mb-2 block"
              >
                Nombre del solicitante{" "}
              </label>
              <input
                type="text"
                id="nombre_solicitante"
                className="border border-gray-300 rounded-md p-2 w-70 text-center"
                value={nombre_solicitante}
                size={Math.max(nombre_solicitante.length, 5)}
                onChange={(e) => setnombre_solicitante(e.target.value)}
                disabled
              />
            </div>
          </div>

          <h1 className="flex justify-center font-bold text-xl mb-1">
            Datos del material
          </h1>
          <div className="flex justify-center mb-3 border ">
            <div className="mb-3 text-center">
              <label
                htmlFor="nombre_material"
                className="text-l font-semibold mb-1 block text-center"
              >
                Nombre del material:{" "}
              </label>
              <input
                type="text"
                id="nombre_material"
                value={nombre_material}
                onChange={handleMaterialChange}
                disabled={isFieldDisabled}
                className="border border-gray-300 rounded-md p-2 w-70 text-center"
                required
              />
            </div>
          </div>

          <h1 className="flex justify-center font-bold text-xl">
            Datos de préstamo
          </h1>
          <div className="flex flex-col items-center border">
            <div className="w-3/4 mb-3">
              <label
                htmlFor="comentarios"
                className="text-l font-semibold mb-2 block"
              >
                Comentarios
              </label>
              <input
                type="text"
                id="comentarios"
                value={comentarios}
                onChange={handleinputChange}
                rows="1"
                className="border border-gray-300 rounded-md p-2 w-full h-10e resize-y focus:h-32 transition-all duration-300"
                disabled={isFieldDisabled}
              />
            </div>

            <div className="w-full flex justify-between gap-2">
              <div className="flex flex-col items-center w-1/3">
                <label htmlFor="Fecha" className="text-l font-semibold mb-1">
                  Fecha
                </label>
                <input
                  id="fecharegistro"
                  type="date"
                  value={fecharegistro}
                  readOnly
                  className="p-1 border-gray-300 rounded-md text-center"
                />
              </div>

              <div className="flex flex-col items-center w-1/3">
                <label htmlFor="Hora" className="text-l font-semibold mb-1">
                  Hora
                </label>
                <input
                  id="horaregistro"
                  type="time"
                  value={horaregistro}
                  readOnly
                  className="w-full p-1 rounded-md text-center"
                />
              </div>

              <div className="flex flex-col items-center w-1/3">
                <label
                  htmlFor="Horavencimiento"
                  className="text-l font-semibold mb-1"
                >
                  Hora vencimiento
                </label>
                <input
                  id="horavencimiento"
                  type="time"
                  value={horavencimiento}
                  readOnly
                  className="w-full p-1 rounded-md text-center"
                />
              </div>
            </div>
          </div>

          {/*Botones del codigo con acciones, mandar a services y limpiar campos*/}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              className="bg-lime-600 text-black font-bold py-2 px-3 rounded"
              onClick={(event) => agregar(event)}
              disabled={isFieldDisabled}
            >
              Guardar
            </button>
            <button
              className="bg-rose-700 text-black font-bold py-2 px-4 rounded"
              onClick={limpiarCampos}
            >
              Borrar
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Prestamos;
