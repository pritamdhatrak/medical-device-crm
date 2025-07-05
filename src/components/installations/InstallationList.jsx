import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  AddOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addInstallation, updateInstallation, deleteInstallation } from '../../store/slices/installationSlice';

const InstallationList = () => {
  const [open, setOpen] = useState(false);
  const [editInstallation, setEditInstallation] = useState(null);
  const installations = useSelector(state => state.installations.installations);
  const devices = useSelector(state => state.devices.devices);
  const dispatch = useDispatch();

  const handleSubmit = (installationData) => {
    if (editInstallation) {
      dispatch(updateInstallation({ ...installationData, id: editInstallation.id }));
    } else {
      dispatch(addInstallation(installationData));
    }
    setOpen(false);
    setEditInstallation(null);
  };

  const handleEdit = (installation) => {
    setEditInstallation(installation);
    setOpen(true);
  };

  const handleDelete = (installationId) => {
    if (window.confirm('Are you sure you want to delete this installation record?')) {
      dispatch(deleteInstallation(installationId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'warning';
      case 'Pending': return 'info';
      default: return 'default';
    }
  };

  const getCompletionPercentage = (checklist) => {
    if (!checklist || checklist.length === 0) return 0;
    const completed = checklist.filter(item => item.completed).length;
    return (completed / checklist.length) * 100;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Installation & Training
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage device installations, training, and completion tracking
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          onClick={() => setOpen(true)}
        >
          New Installation
        </Button>
      </Box>

      <Grid container spacing={3}>
        {installations.map((installation) => {
          const completionPercentage = getCompletionPercentage(installation.checklist);
          
          return (
            <Grid item xs={12} md={6} lg={4} key={installation.id}>
              <Card sx={{ height: '100%', boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {installation.deviceType}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID: {installation.deviceId}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => handleEdit(installation)}>
                        <EditOutlined />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(installation.id)} color="error">
                        <DeleteOutlined />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={installation.status}
                      color={getStatusColor(installation.status)}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    {installation.trainingCompleted && (
                      <Chip
                        label="Training Complete"
                        color="success"
                        size="small"
                        icon={<CheckCircleOutlined />}
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      📍 {installation.facility}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      👨‍🔧 {installation.engineer}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      📅 {new Date(installation.installationDate).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        Installation Progress
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {completionPercentage.toFixed(0)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={completionPercentage}
                      sx={{ height: 6, borderRadius: 3 }}
                      color={completionPercentage === 100 ? 'success' : 'primary'}
                    />
                  </Box>

                  {installation.notes && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Notes: {installation.notes.substring(0, 100)}
                        {installation.notes.length > 100 && '...'}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}

        {installations.length === 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No installations recorded yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Start by adding your first device installation
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddOutlined />}
                  onClick={() => setOpen(true)}
                >
                  Add Installation
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editInstallation ? 'Edit Installation' : 'New Installation'}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ p: 2 }}>
            Installation form will be available soon...
          </Typography>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default InstallationList;