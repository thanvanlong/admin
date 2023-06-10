import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Backdrop, Dialog } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme();

export default function SignIn() {
  const [open, setOpen] = useState(false);
  const [rsApi, setRsApi] = useState({});
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      phone: data.get("email"),
      password: data.get("password"),
    };
    axios.post("http://14.225.205.30:8081/api/v1/auth/login", user).then((res) => {
      console.log(res);
      if (res.data.errorCode == "200") {
        localStorage.setItem("USER", res.data.data.accessToken);
        navigate("/");
        return;
      }
      setRsApi(res.data);
      setOpen(false);
      setDialog(true);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate={false}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Phone number"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={dialog}
        onClose={() => {
          setDialog(false);
        }}
      >
        <Box
          sx={{
            width: 500,

            backgroundColor: "white",
            padding: 5,
          }}
        >
          <Typography
            fontFamily={"Roboto Slab"}
            fontSize={20}
            textAlign={"center"}
            textTransform={"uppercase"}
            paddingBottom={5}
            paragraph
          >
            {rsApi?.data}
          </Typography>
          <Typography textAlign={"center"}>
            {rsApi?.errorCode == "200" ? (
              <CheckCircleOutlineIcon
                sx={{
                  color: "green",
                  fontSize: 200,
                }}
              />
            ) : (
              <ErrorOutlineIcon
                sx={{
                  color: "red",
                  fontSize: 200,
                }}
              />
            )}
          </Typography>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}
