import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
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
import { AddOutlined, EditOutlined, DeleteOutline } from "@mui/icons-material";
import Page from "../../common/Page";
import ToastAutoHide from "../../common/ToastAutoHide";
import CommonTable from "../../common/CommonTable";
import { useHistory } from "react-router";
import { MainContext, APP_STATE } from "../../../Context/MainContext";

const Usuarios = () => {
  const initialState = {
    // avatar: 'https://i.imgur.com/gh3fPj5.png',
    matricula: "",
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    correo: "",
    password: "",
    fecha_registro: new Date().toISOString().slice(0, 19).replace("T", " "),
    tipo: "usuario",
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
  const [error, setError] = useState(false);
  const [errorMatricula, setErrorMatricula] = useState(false);
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorApellidoP, setErrorApellidoP] = useState(false);
  const [errorApellidoM, setErrorApellidoM] = useState(false);
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [user, setUser] = useState({ tipo: "" });
  const { globalState, globalDispatch } = useContext(MainContext);
  const { push } = useHistory();
  const [idDelete, setIdDelete] = useState(null)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)


  const init = async () => {
    const { data } = await ApiRequest().get("/usuarios");
    setUsuariosList(data);
  };

  const initAuth = () => {
    if (typeof globalState.auth.id === "undefined") {
      localStorage.clear();
    } else {
      setUser(globalState.auth);
    }
  };

  useEffect(initAuth, []);

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "matricula", headerName: "Matrícula", width: 220 },
    { field: "nombre", headerName: "Nombre", width: 220 },
    { field: "apellidoP", headerName: "Apellido Paterno", width: 220 },
    { field: "apellidoM", headerName: "Apellido Materno", width: 220 },
    { field: "correo", headerName: "Email", width: 220 },
    { field: "fecha_registro", headerName: "Fecha de registro", width: 220 },
    user.tipo === "administrador" ? (
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
            <IconButton size="small" onClick={() => {
              handleDialogDelete()
              setIdDelete(params.id)
            }}>
              <DeleteOutline />
            </IconButton>
          </Stack>
        ),
      }
    ) : {}
    
  ];

  const onDelete = async () => {
    try {
      const { data } = await ApiRequest().post("/eliminar", { id: idDelete });
      setMensaje({
        ident: new Date().getTime(),
        message: data.message,
        type: "success",
      });
      handleDialogDelete()
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

  const handleDialogDelete = () => {
    setOpenDialogDelete((prev) => !prev);
  };

  const onChange = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    //Validación del formulario:
    //Para validar que no tenga campos vacíos
    if (
      [
        body.matricula,
        body.correo,
        body.password,
        body.nombre,
        body.apellidoP,
        body.apellidoM,
      ].includes("")
    ) {
      setError(true);
      alert("Todos los campos son obligatorios");
    } else {
      //Para validar que matrícula contenga solamente números
      if (isNaN(body.matricula)) {
        setErrorMatricula(true);
        alert("El campo matrícula debe de contener únicamente números");
        setError(false);
        setErrorMatricula(false);
        setErrorNombre(false);
        setErrorApellidoP(false);
        setErrorApellidoM(false);
        setErrorCorreo(false);
      } else {
        //Para validar que nombre, apellido paterno y materno no utilizen números.

        if (

          !body.nombre.match(/^[a-zA-Z ]*$/) 
        ) {
          setErrorNombre(true);
          
          alert(
            "El campo de nombre, apellido paterno y apellido materno no deben de contener números"
          );
          setError(false);
          setErrorMatricula(false);
          setErrorNombre(false);
          setErrorApellidoP(false);
          setErrorApellidoM(false);
          setErrorCorreo(false);
        } else {
          //Para validar emails válidos.
          if (
            !body.correo.match(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ) {
            setErrorCorreo(true);
            alert("El campo de Email debe contener un email válido");
            setError(false);
            setErrorMatricula(false);
            setErrorNombre(false);
            setErrorApellidoP(false);
            setErrorApellidoM(false);
            setErrorCorreo(false);
          } else {
            setError(false);
            setErrorMatricula(false);
            setErrorNombre(false);
            setErrorApellidoP(false);
            setErrorApellidoM(false);
            setErrorCorreo(false);
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
          }
        }
      }
    }
  };

  const onEdit = async () => {
    //Validación del formulario:
    //Para validar que no tenga campos vacíos
    if (
      [
        body.matricula,
        body.correo,
        body.password,
        body.nombre,
        body.apellidoP,
        body.apellidoM,
      ].includes("")
    ) {
      setError(true);
      alert("Todos los campos son obligatorios");
    } else {
      //Para validar que matrícula contenga solamente números
      if (isNaN(body.matricula)) {
        setErrorMatricula(true);
        alert("El campo matrícula debe de contener únicamente números");
        setError(false);
        setErrorMatricula(false);
        setErrorNombre(false);
        setErrorApellidoP(false);
        setErrorApellidoM(false);
        setErrorCorreo(false);
      } else {
        //Para validar que nombre, apellido paterno y materno no utilizen números.

        if (
          !body.nombre.match(/^[a-zA-Z ]*$/) ||
          !body.apellidoP.match(/^[a-zA-Z ]*$/) ||
          !body.apellidoM.match(/^[a-zA-Z ]*$/)
        ) {
          setErrorNombre(true);
          
          alert(
            "El campo de nombre, apellido paterno y apellido materno no deben de contener números"
          );
          setError(false);
          setErrorMatricula(false);
          setErrorNombre(false);
          setErrorApellidoP(false);
          setErrorApellidoM(false);
          setErrorCorreo(false);
        } else {
          //Para validar emails válidos.
          if (
            !body.correo.match(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ) {
            setErrorCorreo(true);
            alert("El campo de Email contener un email válido");
            setError(false);
            setErrorMatricula(false);
            setErrorNombre(false);
            setErrorApellidoP(false);
            setErrorApellidoM(false);
            setErrorCorreo(false);
          } else {
            setError(false);
            setErrorMatricula(false);
            setErrorNombre(false);
            setErrorApellidoP(false);
            setErrorApellidoM(false);
            setErrorCorreo(false);
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
          }
        }
      }
    }
  };

  useEffect(init, []);

  return (
    <>
      <Dialog maxWidth="xs" open={openDialogDelete} onClose={handleDialogDelete}>
        <DialogTitle>Desea realmente eliminar a este usuario?</DialogTitle>
        <DialogContent>
          <Typography variant="h5">Recuerda que esta acción es irreversible !!!</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="primary" onClick={handleDialogDelete}>
            cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onDelete}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>



      <Dialog maxWidth="xs" open={openDialog} onClose={handleDialog}>
        <DialogTitle>{isEdit ? "Editar Usuario" : "Crear Usuario"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Avatar src={body.avatar} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                margin="normal"
                name="matricula"
                value={body.matricula}
                onChange={onChange}
                variant="outlined"
                size="small"
                color="primary"
                fullWidth
                label="Matrícula"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                margin="normal"
                name="correo"
                value={body.correo}
                onChange={onChange}
                variant="outlined"
                size="small"
                color="primary"
                fullWidth
                label="Email"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                margin="normal"
                name="password"
                value={body.password}
                onChange={onChange}
                variant="outlined"
                size="small"
                color="primary"
                fullWidth
                label="Password"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                margin="normal"
                name="nombre"
                value={body.nombre}
                onChange={onChange}
                variant="outlined"
                size="small"
                color="primary"
                fullWidth
                label="Nombre"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                margin="normal"
                name="apellidoP"
                value={body.apellidoP}
                onChange={onChange}
                variant="outlined"
                size="small"
                color="primary"
                fullWidth
                label="Apellido P."
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                margin="normal"
                name="apellidoM"
                value={body.apellidoM}
                onChange={onChange}
                variant="outlined"
                size="small"
                color="primary"
                fullWidth
                label="Apellido M."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="primary" onClick={handleDialog}>
            cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={isEdit ? () => onEdit() : () => onSubmit()}
          >
            guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Page title="UABC | Usuarios">
        <ToastAutoHide message={mensaje} />
        <Container maxWidth="lg">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h5">Lista de usuarios</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              {user.tipo === "administrador" ? (
                <Button
                  onClick={handleDialog}
                  startIcon={<AddOutlined />}
                  variant="contained"
                  color="primary"
                >
                  Crear Usuario
                </Button>
              ) : (
                <h1>Consulta</h1>
              )}
            </Grid>
            <Grid item xs={12} sm={8} />
            <Grid item xs={12} sm={12}>
              <CommonTable data={usuariosList} columns={columns} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};

export default Usuarios;
