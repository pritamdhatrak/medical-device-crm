import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const DeviceForm = ({ device, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    deviceId: '',
    facility: '',
    status: 'Online',
    batteryLevel: 100,
    lastServiceDate: '',
    installationDate: '',
    amcStatus: 'Active',
    location: '',
    model: '',
    serialNumber: '',
  });

  useEffect(() => {
    if (device) {
      setFormData(device);
    }
  }, [device]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Device Type"
            value={formData.type}
            onChange={handleChange('type')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Device ID"
            value={formData.deviceId}
            onChange={handleChange('deviceId')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Facility"
            value={formData.facility}
            onChange={handleChange('facility')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={handleChange('status')}
              label="Status"
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Battery Level (%)"
            type="number"
            value={formData.batteryLevel}
            onChange={handleChange('batteryLevel')}
            inputProps={{ min: 0, max: 100 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Location"
            value={formData.location}
            onChange={handleChange('location')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Model"
            value={formData.model}
            onChange={handleChange('model')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Serial Number"
            value={formData.serialNumber}
            onChange={handleChange('serialNumber')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Last Service Date"
            type="date"
            value={formData.lastServiceDate}
            onChange={handleChange('lastServiceDate')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Installation Date"
            type="date"
            value={formData.installationDate}
            onChange={handleChange('installationDate')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {device ? 'Update' : 'Add'} Device
        </Button>
      </Box>
    </Box>
  );
};

export default DeviceForm;