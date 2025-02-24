import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import api from '../../services/api';
import { useGlobalState } from '../../context/GlobalStateContext';

const LoginForm = () => {
  const { login } = useGlobalState();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/api/auth/login', formData);
      login(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
