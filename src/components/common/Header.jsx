import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
} from '@mui/material';
import {
  NotificationsOutlined,
  AccountCircle,
  MenuOutlined,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Header = ({ onMenuClick }) => {
  const alerts = useSelector(state => state.alerts.alerts);
  const activeAlerts = alerts.filter(alert => alert.status === 'active').length;

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton 
          edge="start" 
          color="inherit"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuOutlined />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Medical Device CRM
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <Badge badgeContent={activeAlerts} color="error">
              <NotificationsOutlined />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;