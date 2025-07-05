import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import Installations from './pages/Installations';
import Services from './pages/Services';
import Contracts from './pages/Contracts';
import Alerts from './pages/Alerts';
import './App.scss';

const App = () => {
  return (
    <Box className="app">
      <Header />
      <Box className="app-body">
        <Sidebar />
        <Box className="main-content">
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
};

export default App;
