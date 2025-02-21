// src/components/ErrorBoundary.jsx
import React from 'react';
import { Typography, Button, Box } from '@mui/material';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  handleReload = () => window.location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="error">Something went wrong.</Typography>
          <Button variant="contained" onClick={this.handleReload} sx={{ mt: 2 }}>
            Reload Page
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
