import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  CssBaseline,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  LinearProgress,
  Box,
  Link,
} from "@mui/material";
import {
  LockOpen,
  Visibility,
  VisibilityOff,
  LockOutlined,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import ApiRequest from "../../../helpers/axiosInstances";
import {
  MainContext,
  APP_STATE,
  AUTH_TYPES,
} from "../../../Context/MainContext";
import ToastAutoHide from "../../common/ToastAutoHide";
import Page from "../../common/Page";

const Login = () => {
  const { globalDispatch } = useContext(MainContext);
  const [bodyLogin, setBodyLogin] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState({
    ident: null,
    message: null,
    type: null,
  });
  const { push } = useHistory();
  const [error, setError] = useState(false);
  const [errorCorreo, setErrorCorreo] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setBodyLogin({
      ...bodyLogin,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if ([bodyLogin.username, bodyLogin.password].includes("")) {
      setError(true);
      alert("Todos los campos son obligatorios");
    } else {
      if (
        !bodyLogin.username.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        setErrorCorreo(true);
        alert("El campo de Username debe contener un email válido");
      } else {
        setIsLoading(true);
        ApiRequest()
          .post("/login", bodyLogin)
          .then(({ data }) => {
            globalDispatch({
              type: AUTH_TYPES.LOGIN_OK,
              payload: data,
            });
            setIsLoading(false);
            push("/app");
          })
          .catch(({ response }) => {
            globalDispatch({ type: AUTH_TYPES.LOGIN_FAIL });
            setMensaje({
              ident: new Date().getTime(),
              message: response,
              type: "error",
            });
            setIsLoading(false);
          });
      }
    }
  };

  const init = () => {
    globalDispatch({
      type: APP_STATE.CLEAR_APP_STATE,
    });
    localStorage.clear();
  };

  useEffect(init, []);

  return (
    <Page title="UABC | Login">
      <ToastAutoHide message={mensaje} />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://pbs.twimg.com/profile_images/1852389089850306560/OOjAHgUf_400x400.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? "#27aae1" : "#27aae1",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={10}
          square
        >
          <Typography
            sx={{
              mt: 3,
              fontWeight: "bold",
              textAlign: "center",
              bgcolor: "green",
              color: "white",
            }}
            variant="h5"
          >
            Sistema de préstamo de material de laboratorio
          </Typography>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "green" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                required
                fullWidth
                autoFocus
                value={bodyLogin.username}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                label="Username"
                name="username"
              />
              <TextField
                required
                fullWidth
                variant="outlined"
                value={bodyLogin.password}
                onChange={onChange}
                margin="normal"
                name="password"
                label="Password"
                type={showPass ? "text" : "password"}
                autoComplete="password"
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    handleSubmit();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPass(!showPass)}
                        onMouseDown={(event) => {
                          event.preventDefault();
                        }}
                      >
                        {showPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {isLoading ? <LinearProgress color="secondary" /> : null}
              <Button
                startIcon={<LockOpen />}
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Login;
