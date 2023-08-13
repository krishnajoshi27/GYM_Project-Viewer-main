import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import env from '../env.json'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loader from '../Components/Loader';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let body = {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
      }
    try {
        setLoading(true)
        const url = 'http://localhost:8080/admin/signupad'
        const {data:res} = await axios.post(url,body)
        Swal.fire({
          icon: 'success',
          title: 'SignUp Successfull',
          text: res.message,
          footer: 'You will be Redirecting to Login Page.'
        }).then(()=>{
          navigate('/admin')
        })
        setLoading(false)
     } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
            Swal.fire({
              icon: 'warning',
              title: 'SignUp Failed',
              text: 'Something went wrong'
              //text: error.response.data.message,
            })
            setLoading(false)
        }
    }
  };

  return (
    <>
    {loading ? <Loader/> : (<ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor:'#d6a512' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Admin Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, }}>
            
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="name"
                  type="name"
                  id="name"
                  autoComplete="new-name"
                />
              </Grid>
            
                          <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            {/* {error && <div style={{color:'red',margin:'5px',padding:'5px'}}>{error}</div>} */}
            {/* {msg && <div style={{color:'green',margin:'5px',padding:'5px'}}>{msg}</div>} */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:'#d6a512'}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/admin" variant="body2" sx={{color:'black'}} >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, color:'black' }} />
      </Container>
    </ThemeProvider>)}
    </>
    
  );
}