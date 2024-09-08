// SignupDialog.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Divider } from '@mui/material';
import InputBox from '../../components/InputBox/InputBox'; // Adjust the path as necessary
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function SignupDialog({ open, onClose }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    return (
        <Dialog fullWidth open={open} onClose={onClose} sx={{
            '& .MuiDialog-paper': {
                backgroundColor: 'var(--background-1)',
                color: 'var(--text)',
            }
        }}>
            <DialogTitle>Sign Up</DialogTitle>
            <Divider />
            <DialogContent>
                <div style={{ marginBottom: '7px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                    <InputBox
                        value={name}
                        onChange={(e) => handleInputChange(e, setName)}
                        placeholder="Name"
                    />
                </div>
                <div style={{ marginBottom: '7px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                    <InputBox
                        value={username}
                        onChange={(e) => handleInputChange(e, setUsername)}
                        placeholder="Username"
                    />
                </div>
                <div style={{ marginBottom: '7px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <InputBox
                        value={email}
                        onChange={(e) => handleInputChange(e, setEmail)}
                        placeholder="Email"
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
                <div style={{ marginBottom: '7px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Confirm Password</label>
                    <InputBox
                        value={confirmPassword}
                        onChange={(e) => handleInputChange(e, setConfirmPassword)}
                        placeholder="Confirm Password"
                        type="password"
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '10px' }}
                >
                    Sign Up
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
