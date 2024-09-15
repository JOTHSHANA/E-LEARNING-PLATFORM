import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, Button, Checkbox, FormControlLabel, Divider } from '@mui/material';
import InputBox from '../../components/InputBox/InputBox'; 
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import requestApi from '../../components/utils/axios';
import { setEncryptedCookie } from '../../components/utils/encrypt'; // Import your custom cookie functions

export default function LoginDialog({ open, onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate()

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await requestApi("POST",'/login', {
                username,
                password,
            });

            const { message, user, token } = response.data;

            if (message === 'Login successful') {
                setEncryptedCookie('token', token);
                setEncryptedCookie('name', user.name);
                setEncryptedCookie('email', user.email);

                console.log('Login successful');
                navigate('/dashboard')
                onClose();
            } else {
                console.error('Login failed:', message);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    return (
        <Dialog fullWidth open={open} onClose={onClose} sx={{
            '& .MuiDialog-paper': {
                backgroundColor: 'var(--background-1)',
                color: 'var(--text) ',
            }
        }}>
            <DialogTitle>Login</DialogTitle>
            <Divider />

            <DialogContent>
                <div style={{ marginBottom: '7px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                    <InputBox
                        value={username}
                        onChange={(e) => handleInputChange(e, setUsername)}
                        placeholder="Username"
                    />
                </div>
                <div style={{ marginBottom: '7px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <InputBox
                        value={password}
                        onChange={(e) => handleInputChange(e, setPassword)}
                        placeholder="Password"
                        type="password"
                    />
                </div>
                <FormControlLabel
                    control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                    label="Remember me"
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '10px' }}
                    onClick={handleLogin} 
                >
                    Login
                </Button>
                <Divider style={{ margin: '20px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <Button
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        style={{ flex: 1, marginRight: '5px' }}
                    >
                        Sign in with Google
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FacebookIcon />}
                        style={{ flex: 1, marginLeft: '5px' }}
                    >
                        Sign in with Facebook
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
