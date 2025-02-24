import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import api from '../../services/api';
import MilestonesList from '../listings/MilestonesList';
import EventsList from '../listings/EventsList';
import Leaderboard from '../listings/Leaderboard';

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/api/notifications'); // <-- Ensures proper API path
        setNotifications(res.data.notifications);
      } catch (error) {
        console.error('Failed to load notifications:', error.response?.data?.message || error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Leadership Progress</Typography>
            {/* Include a progress chart or details here */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Notifications</Typography>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : notifications.length ? (
              notifications.map((note) => (
                <Typography key={note.id} variant="body2">
                  {note.message}
                </Typography>
              ))
            ) : (
              <Typography>No notifications</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <MilestonesList />
      </Box>
      <Box sx={{ mt: 3 }}>
        <EventsList />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Leaderboard />
      </Box>
    </Box>
  );
};

export default Dashboard;
