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

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          position: 'relative',
        },
      }}
    >
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
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
