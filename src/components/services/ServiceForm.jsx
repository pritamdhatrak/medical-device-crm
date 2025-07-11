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
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
} from '@mui/material';
import {
  SaveOutlined,
  CancelOutlined,
  AddOutlined,
  DeleteOutlined,
} from '@mui/icons-material';
import FileUpload from '../common/FileUpload';

const ServiceForm = ({ service, devices, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    deviceId: '',
    deviceType: '',
    facility: '',
    date: '',
    engineer: '',
    type: 'Preventive',
    purpose: '',
    status: 'Pending',
    duration: '',
    notes: '',
    attachments: [],
    checklist: [
      { item: 'Visual Inspection', completed: false },
      { item: 'Performance Tests', completed: false },
      { item: 'Software Updates', completed: false },
      { item: 'Calibration', completed: false },
      { item: 'Safety Checks', completed: false },
    ],
    nextServiceDate: '',
    partsReplaced: [],
    cost: ''
  });

  const [newPart, setNewPart] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      setFormData({
        ...service,
        attachments: service.attachments || [],
        checklist: service.checklist || formData.checklist,
        partsReplaced: service.partsReplaced || []
      });
    }
  }, [service]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.deviceId) newErrors.deviceId = 'Device is required';
    if (!formData.facility) newErrors.facility = 'Facility is required';
    if (!formData.engineer) newErrors.engineer = 'Engineer is required';
    if (!formData.date) newErrors.date = 'Service date is required';
    if (!formData.purpose) newErrors.purpose = 'Purpose is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
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

  const handleChecklistChange = (index, completed) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.map((item, i) =>
        i === index ? { ...item, completed } : item
      )
    }));
  };

  const addPart = () => {
    if (newPart.trim()) {
      setFormData(prev => ({
        ...prev,
        partsReplaced: [...prev.partsReplaced, newPart.trim()]
      }));
      setNewPart('');
    }
  };

  const removePart = (index) => {
    setFormData(prev => ({
      ...prev,
      partsReplaced: prev.partsReplaced.filter((_, i) => i !== index)
    }));
  };

  const handleAttachmentsChange = (newAttachments) => {
    setFormData(prev => ({
      ...prev,
      attachments: newAttachments
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const serviceTypes = [
    'Preventive',
    'Breakdown',
    'Emergency',
    'Calibration',
    'Upgrade',
    'Installation Support'
  ];

  const statusOptions = [
    'Pending',
    'In Progress',
    'Completed',
    'Cancelled'
  ];

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Service Details
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
            label="Service Date *"
            type="date"
            value={formData.date}
            onChange={handleChange('date')}
            error={!!errors.date}
            helperText={errors.date}
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
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Duration"
            value={formData.duration}
            onChange={handleChange('duration')}
            placeholder="e.g., 2 hours, 1 day"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Service Type</InputLabel>
            <Select
              value={formData.type}
              onChange={handleChange('type')}
              label="Service Type"
            >
              {serviceTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={handleChange('status')}
              label="Status"
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Purpose *"
            value={formData.purpose}
            onChange={handleChange('purpose')}
            error={!!errors.purpose}
            helperText={errors.purpose}
            placeholder="Describe the purpose of this service visit"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Next Service Date"
            type="date"
            value={formData.nextServiceDate}
            onChange={handleChange('nextServiceDate')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Cost"
            type="number"
            value={formData.cost}
            onChange={handleChange('cost')}
            placeholder="Service cost in USD"
          />
        </Grid>

        {/* Service Checklist */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
            Service Checklist
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        <Grid item xs={12}>
          <List>
            {formData.checklist.map((item, index) => (
              <ListItem key={index} dense>
                <ListItemIcon>
                  <Checkbox
                    checked={item.completed}
                    onChange={(e) => handleChecklistChange(index, e.target.checked)}
                  />
                </ListItemIcon>
                <ListItemText primary={item.item} />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Parts Replaced */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
            Parts Replaced
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label="Add part"
              value={newPart}
              onChange={(e) => setNewPart(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPart())}
              size="small"
              sx={{ flex: 1 }}
            />
            <Button
              variant="outlined"
              onClick={addPart}
              startIcon={<AddOutlined />}
              disabled={!newPart.trim()}
            >
              Add
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.partsReplaced.map((part, index) => (
              <Chip
                key={index}
                label={part}
                onDelete={() => removePart(index)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Grid>

        {/* File Attachments */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
            Attachments
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <FileUpload
            files={formData.attachments}
            onFilesChange={handleAttachmentsChange}
            accept="image/*,.pdf,.doc,.docx"
            title="Upload Service Documents"
            description="Upload photos, reports, or other service documentation"
          />
        </Grid>

        {/* Notes */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Service Notes"
            multiline
            rows={4}
            value={formData.notes}
            onChange={handleChange('notes')}
            placeholder="Add detailed notes about the service performed..."
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
          {service ? 'Update Service' : 'Save Service'}
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceForm;