import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import api from '../../services/api';

const MilestonesList = () => {
  const [milestones, setMilestones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const res = await api.get('/api/milestones'); // ✅ Fixed API path
        setMilestones(res.data.milestones);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load milestones.');
      }
    };
    fetchMilestones();
  }, []);

  return (
    <Box>
      <Typography variant="h6">Milestones</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {milestones.map((m) => (
          <ListItem key={m.id}>{m.description} - {m.status}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MilestonesList;
