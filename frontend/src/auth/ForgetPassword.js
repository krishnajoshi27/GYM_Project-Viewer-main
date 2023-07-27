import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
const [loading,setLoading] = useState(false)
const [flag1,setFlag1] = useState(true)
const [flag2,setFlag2] = useState(false)
const navigate = useNavigate()

  const handleSubmit1 = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get('email'),
    };
    try {
        setLoading(true)
        const url = 'http://localhost:8080/auth' + '/otpToEmail'
        const {data} = await axios.post(url,body)
        console.log('resp:',data);
        Swal.fire({
          icon: 'success',
          title: data.message,
        }).then(()=>{
            setFlag1(false)
            setFlag2(true)
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
              title: 'Failed',
              text: error.response.data.message,
            })
            setLoading(false)
        }
    }
  };
  const handleSubmit2 = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      otpCode: data.get('otpCode'),
      password : data.get('password'),
      cpassword : data.get('cpassword')
    };
    try {
        setLoading(true)
        const url = 'http://localhost:8080/auth' + '/changePassword'
        const {data} = await axios.post(url,body)
        console.log('resp:',data);
        Swal.fire({
          icon: 'success',
          title: data.message,
        }).then(()=>{
            window.location.href = '/login'
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
              title: 'Reset Failed',
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
            Reset Your Password
          </Typography>
          {flag1 && (<Box component="form" onSubmit={handleSubmit1} noValidate sx={{ mt: 1 ,color:'#d6a512'}}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:'#d6a512'}}
            >
              Get Otp
            </Button>
          </Box>)}
          {flag2 && (<Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 1,color:'#d6a512' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otpCode"
              label="Enter OTP"
              name="otpCode"
              autoComplete="otpCode"
              autoFocus
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="New Password"
              name="password"
              type="password"
              autoComplete="password"
              autoFocus
            />
              <TextField
              margin="normal"
              required
              fullWidth
              id="cpassword"
              label="Confirm New Password"
              name="cpassword"
              type="password"
              autoComplete="cpassword"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,backgroundColor:'#d6a512' }}
            >
              Reset
            </Button>
          </Box>)}
          
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>) }
    </>
    
  );
}