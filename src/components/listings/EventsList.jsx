import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import api from '../../services/api';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/api/events'); // <-- Ensures proper API path
        setEvents(res.data.events);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load events.');
      }
    };
    fetchEvents();
  }, []);

  return (
    <Box>
      <Typography variant="h6">Upcoming Events</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {events.map((e) => (
          <ListItem key={e.id}>{e.name} - {new Date(e.date).toLocaleDateString()}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EventsList;
