import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {  useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SignUp.css'
import axios from 'axios';
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const userData = {
            full_name: form.get('full_name'),
            phone_number: form.get('phone_number'),
            email: form.get('email'),
            password: form.get('password'),
        };

        try {
            const response = await axios.post("http://localhost:8080/users/register", userData);

            if (response.status === 201) {
                console.log('Registration successful');
                // toast.success("Registration Successfully!");
                navigate('/login');
            } else {
                setLoginError('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                const errors = error.response.data.errors;
                console.log(errors);
                setLoginError('Đăng kí thất bại. Vui lòng kiểm tra email và mật khẩu.');
            }
        }
    };



    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container container2  component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
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
                            Đăng Kí
                        </Typography>
                        {loginError && (
                            <div className="error-message">
                                <p>{loginError}</p>
                            </div>
                        )}
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container container2 spacing={2}>
                                <Grid item xs={12}>
                                    <TextField

                                        fullWidth
                                        id="full_name"
                                        label="Họ và Tên"
                                        name="full_name"
                                        autoComplete="full_name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField

                                        fullWidth
                                        id="phone_number"
                                        label="Số điện thoại"
                                        name="phone_number"
                                        autoComplete="phone_number"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Mật khẩu"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Đăng Kí
                            </Button>
                            <Grid container container2 justifyContent="space-between">
                                <Grid item>
                                    <Link to="/" variant="body2">
                                        Trở về Home
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/login" variant="body2">
                                        Bạn đã có tài khoản? Đăng nhập
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
