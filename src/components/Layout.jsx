// src/components/Layout.js
import React from 'react';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

const drawerWidth = 240;

const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navigation Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Milestones', 'Events', 'Profile'].map((text) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      
      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              LDR Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {/* Dashboard content */}
        <Typography paragraph>
          Welcome to the LDR Dashboard! This is your main content area.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
