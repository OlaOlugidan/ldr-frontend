// src/components/listings/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import api from '../../services/api';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('/leaderboard');
        setLeaders(res.data.leaders);
      } catch (err) {
        setError('Failed to load leaderboard.');
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <Box>
      <Typography variant="h6">Leaderboard</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaders.map((leader) => (
            <TableRow key={leader.id}>
              <TableCell>{leader.username}</TableCell>
              <TableCell align="right">{leader.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Leaderboard;
