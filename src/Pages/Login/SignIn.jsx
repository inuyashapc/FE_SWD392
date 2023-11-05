import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SignIn.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";


const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const accesstoken = (localStorage.getItem("accessToken"));
  const [loginError, setLoginError] = useState('');


  // useEffect(() => {
  //   if (accesstoken) {
  //     navigate('/')
  //   }
  // }, [accesstoken, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const userData = {
      email: form.get('email'),
      password: form.get('password'),
    };

    if (!userData) {
      setLoginError('Vui lòng nhập email và mật khẩu.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users/login', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const token = data.data.token;
        const role = data.data.role_id;
        const name = data.data.full_name;
        const id = data.data._id;

        localStorage.setItem('accessToken', token);
        localStorage.setItem('Role', role);
        localStorage.setItem('name', name);
        localStorage.setItem("userID", id);
        console.log("sdf", role);
        setUserRole(role);
        
        toast.success("Login Successfully!");
        navigate('/');
      } else {
        setLoginError('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        const errors = error.response.data.errors;
        console.log(errors);
        setLoginError('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
      }
    }
  };



  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {userRole && (
          <Typography variant="body2">
            Your role: {userRole}
          </Typography>
        )}

        <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', textDecoration: 'none' }}>
          <i className="bi-arrow-left" style={{ fontSize: '1.5rem' }}></i>
        </Link>

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://samivietnam.com/wp-content/uploads/2019/12/nguyen-tac-sd-hinh-anh3.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng Nhập
            </Typography>
            {/* {errors.length > 0 && (
              <div className="error-message">
                {errors.map((errorObj, index) => (
                  <div key={index} className="error-item">
                    <p>{errorObj.msg}</p>
                  </div>
                ))}
              </div>
            )} */}
            {loginError && (
              <div className="error-message">
                <p>{loginError}</p>
              </div>
            )}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                className='remember-me-checkbox'
                control={<Checkbox value="remember" color="primary" />}
                label="Nhớ mật khẩu"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng Nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot" variant="body2" className='forgot'>
                    Quên mật khẩu?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    Bạn chưa có tài khoản? Đăng ký
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}