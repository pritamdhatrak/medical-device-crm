import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Devices = () => {
  const devices = useSelector(state => state.devices.devices);

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Device Inventory</Typography>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
        >
          Add Device
        </Button>
      </Box>

      <Grid container spacing={3}>
        {devices.map((device) => (
          <Grid item xs={12} sm={6} md={4} key={device.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{device.type}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {device.deviceId}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip label={device.status} size="small" />
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Facility: {device.facility}
                </Typography>
                <Typography variant="body2">
                  Battery: {device.batteryLevel}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Devices;
