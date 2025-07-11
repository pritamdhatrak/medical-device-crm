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
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Alert,
} from '@mui/material';
import {
  SaveOutlined,
  CancelOutlined,
  AddOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  PersonAddOutlined,
} from '@mui/icons-material';
import FileUpload from '../common/FileUpload';

const InstallationForm = ({ installation, devices, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    deviceId: '',
    deviceType: '',
    facility: '',
    installationDate: '',
    engineer: '',
    status: 'Pending',
    trainingCompleted: false,
    checklist: [
      { id: '1', item: 'Device Unboxing', completed: false, notes: '' },
      { id: '2', item: 'Hardware Setup', completed: false, notes: '' },
      { id: '3', item: 'Software Installation', completed: false, notes: '' },
      { id: '4', item: 'Testing & Calibration', completed: false, notes: '' },
      { id: '5', item: 'Staff Training', completed: false, notes: '' },
      { id: '6', item: 'Documentation Review', completed: false, notes: '' },
    ],
    photos: [],
    notes: '',
    trainingAttendees: [],
    nextMaintenanceDate: ''
  });

  const [newAttendee, setNewAttendee] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (installation) {
      setFormData({
        ...installation,
        checklist: installation.checklist || formData.checklist,
        photos: installation.photos || [],
        trainingAttendees: installation.trainingAttendees || []
      });
    }
  }, [installation]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.deviceId) newErrors.deviceId = 'Device is required';
    if (!formData.facility) newErrors.facility = 'Facility is required';
    if (!formData.engineer) newErrors.engineer = 'Engineer is required';
    if (!formData.installationDate) newErrors.installationDate = 'Installation date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'deviceId') {
      const selectedDevice = devices.find(d => d.deviceId === value);
      if (selectedDevice) {
        setFormData(prev => ({
          ...prev,
          deviceType: selectedDevice.type,
          facility: selectedDevice.facility
        }));
      }
    }
  };

  const handleChecklistChange = (itemId, field, value) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }));
  };

  const addChecklistItem = () => {
    const newItem = {
      id: Date.now().toString(),
      item: '',
      completed: false,
      notes: ''
    };
    setFormData(prev => ({
      ...prev,
      checklist: [...prev.checklist, newItem]
    }));
  };

  const removeChecklistItem = (itemId) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.filter(item => item.id !== itemId)
    }));
  };

  const addTrainingAttendee = () => {
    if (newAttendee.trim()) {
      setFormData(prev => ({
        ...prev,
        trainingAttendees: [...prev.trainingAttendees, newAttendee.trim()]
      }));
      setNewAttendee('');
    }
  };

  const removeTrainingAttendee = (index) => {
    setFormData(prev => ({
      ...prev,
      trainingAttendees: prev.trainingAttendees.filter((_, i) => i !== index)
    }));
  };

  const handlePhotosChange = (newPhotos) => {
    setFormData(prev => ({
      ...prev,
      photos: newPhotos
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const completedItems = formData.checklist.filter(item => item.completed).length;
  const totalItems = formData.checklist.length;
  const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Installation Details
      </Typography>

      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Please fix the following errors:
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            Basic Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors.deviceId}>
            <InputLabel>Device *</InputLabel>
            <Select
              value={formData.deviceId}
              onChange={handleChange('deviceId')}
              label="Device *"
            >
              {devices.map((device) => (
                <MenuItem key={device.id} value={device.deviceId}>
                  {device.deviceId} - {device.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Device Type"
            value={formData.deviceType}
            disabled
            helperText="Auto-filled based on selected device"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Facility *"
            value={formData.facility}
            onChange={handleChange('facility')}
            error={!!errors.facility}
            helperText={errors.facility}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Installation Date *"
            type="date"
            value={formData.installationDate}
            onChange={handleChange('installationDate')}
            error={!!errors.installationDate}
            helperText={errors.installationDate}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Engineer *"
            value={formData.engineer}
            onChange={handleChange('engineer')}
            error={!!errors.engineer}
            helperText={errors.engineer}
            placeholder="Name of installation engineer"
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
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Next Maintenance Date"
            type="date"
            value={formData.nextMaintenanceDate}
            onChange={handleChange('nextMaintenanceDate')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Installation Checklist */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
            Installation Checklist
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Progress: {completedItems}/{totalItems} items completed ({completionPercentage.toFixed(0)}%)
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        <Grid item xs={12}>
          <List>
            {formData.checklist.map((item, index) => (
              <ListItem key={item.id} divider>
                <ListItemIcon>
                  <Checkbox
                    checked={item.completed}
                    onChange={(e) => handleChecklistChange(item.id, 'completed', e.target.checked)}
                    color="primary"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <TextField
                      fullWidth
                      value={item.item}
                      onChange={(e) => handleChecklistChange(item.id, 'item', e.target.value)}
                      placeholder="Checklist item"
                      variant="standard"
                    />
                  }
                  secondary={
                    <TextField
                      fullWidth
                      value={item.notes}
                      onChange={(e) => handleChecklistChange(item.id, 'notes', e.target.value)}
                      placeholder="Notes (optional)"
                      variant="standard"
                      multiline
                      maxRows={2}
                    />
                  }
                />
                <IconButton
                  edge="end"
                  onClick={() => removeChecklistItem(item.id)}
                  color="error"
                  disabled={formData.checklist.length <= 1}
                >
                  <DeleteOutlined />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button
            startIcon={<AddOutlined />}
            onClick={addChecklistItem}
            sx={{ mt: 1 }}
          >
            Add Checklist Item
          </Button>
        </Grid>

        {/* Training Information */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
            Training Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.trainingCompleted}
                onChange={handleChange('trainingCompleted')}
                color="primary"
              />
            }
            label="Training Completed"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Training Attendees
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label="Add attendee"
              value={newAttendee}
              onChange={(e) => setNewAttendee(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTrainingAttendee())}
              size="small"
              sx={{ flex: 1 }}
            />
            <Button
              variant="outlined"
              onClick={addTrainingAttendee}
              startIcon={<PersonAddOutlined />}
              disabled={!newAttendee.trim()}
            >
              Add
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.trainingAttendees.map((attendee, index) => (
              <Chip
                key={index}
                label={attendee}
                onDelete={() => removeTrainingAttendee(index)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Grid>

        {/* Photo Upload */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
            Installation Photos
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <FileUpload
            files={formData.photos}
            onFilesChange={handlePhotosChange}
            accept="image/*"
            title="Upload Installation Photos"
            description="Upload photos of unboxing, setup, and completed installation"
          />
        </Grid>

        {/* Notes */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Installation Notes"
            multiline
            rows={4}
            value={formData.notes}
            onChange={handleChange('notes')}
            placeholder="Add any additional notes about the installation process..."
          />
        </Grid>
      </Grid>

      {/* Form Actions */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button 
          onClick={onCancel}
          startIcon={<CancelOutlined />}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<SaveOutlined />}
        >
          {installation ? 'Update Installation' : 'Save Installation'}
        </Button>
      </Box>
    </Box>
  );
};

export default InstallationForm;