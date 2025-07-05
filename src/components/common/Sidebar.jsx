import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  DashboardOutlined,
  DevicesOutlined,
  BuildOutlined,
  HandymanOutlined,
  DescriptionOutlined,
  NotificationsOutlined,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardOutlined />, path: '/' },
  { text: 'Devices', icon: <DevicesOutlined />, path: '/devices' },
  { text: 'Installations', icon: <BuildOutlined />, path: '/installations' },
  { text: 'Services', icon: <HandymanOutlined />, path: '/services' },
  { text: 'Contracts', icon: <DescriptionOutlined />, path: '/contracts' },
  { text: 'Alerts', icon: <NotificationsOutlined />, path: '/alerts' },
];

const Sidebar = ({ open, onClose, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={open}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          position: isMobile ? 'fixed' : 'relative',
        },
      }}
    >
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;