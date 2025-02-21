// src/components/auth/RegistrationForm.jsx
import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import api from '../../services/api';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    try {
      await api.post('/auth/register', {
        username: formData.username,
        password: formData.password,
      });
      setSuccess('Registration successful. You can now log in.');
    } catch (err) {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5">Register</Typography>
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
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default RegistrationForm;
