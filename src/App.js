import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import Installations from './pages/Installations';
import Services from './pages/Services';
import Contracts from './pages/Contracts';
import Alerts from './pages/Alerts';
import './App.scss';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box className="app">
      <Header onMenuClick={handleMenuClick} />
      <Box className="app-body">
        <Sidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
        />
        <Box className="main-content" sx={{ 
          marginLeft: sidebarOpen && !isMobile ? '240px' : '0',
          transition: 'margin-left 0.3s ease'
        }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/installations" element={<Installations />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;