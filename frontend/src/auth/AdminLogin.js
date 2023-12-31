import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//new
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import IconButton from '@mui/material/IconButton';
//over
// import env from '../env.json'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loader from '../Components/Loader';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Project-27
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLogin() {
const [loading,setLoading] = useState(false)
//new
const [showPassword, setShowPassword] = useState(false);
//over
const navigate = useNavigate()

const handleTogglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('email'), data.get( 'password'))
    const body = {
      email: data.get('email'),
      password: data.get('password'),
    
    };
    
    try {
        setLoading(true)
        const url = 'http://localhost:8080/admin' + '/loginad'
        const response = await axios.post(url,body)
        console.log('resp:',response);
        localStorage.setItem('userId',response.data.userId)
        localStorage.setItem('userName',response.data.userName)
        console.log("admin page h");
        Swal.fire({
          icon: 'success',
          title: 'Login Successfull',
          footer: 'You will be Redirecting to Home Page.',
         
        }).then(()=>{
            window.location.href = 'adminhome'
        })
        setLoading(false)
    } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
            Swal.fire({
              icon: 'info',
              title: 'Login Failed',
              text: error.response.data.message,
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor:'#d6a512' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
             Admin Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1,color:'#d6a512' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
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
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            {/* {error && <div style={{color:'red',margin:'5px',padding:'5px'}}>{error}</div>} */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,backgroundColor:'#d6a512' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgetpassword" variant="body2" sx={{color:'black'}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{color:'black'}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 ,color:'black'}} />
      </Container>
    </ThemeProvider>) }
    </>
    
  );
}