// LoginDialog.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Checkbox, FormControlLabel, Divider } from '@mui/material';
import InputBox from '../../components/InputBox/InputBox'; // Adjust the path as necessary
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function LoginDialog({ open, onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
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
                    <label style={{ display: 'block', marginBottom: '5px' }}>Username or Email</label>
                    <InputBox
                        value={username}
                        onChange={(e) => handleInputChange(e, setUsername)}
                        placeholder="Username or Email"
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
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '10px' }}
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
