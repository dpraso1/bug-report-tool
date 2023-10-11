import React, { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Button, TextField, Box } from '@mui/material'
import axios from 'axios'
import { useNavigate }  from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log({ email });
    }, [email]);

    useEffect(() => {
        console.log('hello');
    }, []);

    const loginUser = async () => {
        try {
            const result = await axios.post('http://localhost:4000/auth/login', {
                email: email,
                password: password
            });

            if (result?.data && result?.status) {
                const { token } = result.data;
            

                localStorage.setItem('token', token);

                setTimeout(() => {
                    navigate('/bugs-overview');
                }, 1000);
            }

            console.log(result)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ minWidth: '500px', margin: 'auto', border: '2px solid grey', marginTop: '20px' }}>
                <CardContent>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ marginBottom: '20px', width: '100%' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        sx={{
                            marginLeft: '6px',
                            fontWeight: 'bold',
                            backgroundColor: 'green',
                            color: 'white',
                            border: '2px solid lightgreen',
                            minWidth: '470px',
                        }}
                        variant="outlined"
                        size="small"
                        onClick={loginUser}
                    >
                        Login
                    </Button>

                </CardActions>
            </Card>
            
        </Box>
    )
};

export default Login;
