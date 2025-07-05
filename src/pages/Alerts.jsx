import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  AddOutlined,
  WarningOutlined,
  ErrorOutlined,
  InfoOutlined,
  CheckCircleOutlined,
  NotificationsActiveOutlined,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Alerts = () => {
  const alerts = useSelector(state => state.alerts.alerts);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return <ErrorOutlined />;
      case 'warning': return <WarningOutlined />;
      case 'info': return <InfoOutlined />;
      default: return <NotificationsActiveOutlined />;
    }
  };

  const getAlertColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'error';
      case 'acknowledged': return 'warning';
      case 'resolved': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Alerts & Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monitor system alerts and device notifications
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddOutlined />}>
          New Alert
        </Button>
      </Box>

      <Grid container spacing={3}>
        {alerts.map((alert) => (
          <Grid item xs={12} md={6} key={alert.id}>
            <Card sx={{ 
              height: '100%', 
              boxShadow: 2,
              border: alert.priority === 'high' ? '2px solid #f44336' : 'none'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: alert.type === 'error' ? 'error.main' : 
                              alert.type === 'warning' ? 'warning.main' : 'info.main',
                      mr: 2 
                    }}
                  >
                    {getAlertIcon(alert.type)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {alert.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {alert.deviceType} • {alert.deviceId}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={alert.priority.toUpperCase()}
                    color={getAlertColor(alert.priority)}
                    size="small"
                  />
                  <Chip
                    label={alert.status.toUpperCase()}
                    color={getStatusColor(alert.status)}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={alert.category}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  {alert.message}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    📍 {alert.facility}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📅 {new Date(alert.date).toLocaleDateString()} at {new Date(alert.date).toLocaleTimeString()}
                  </Typography>
                  {alert.dueDate && (
                    <Typography variant="body2" color="text.secondary">
                      ⏰ Due: {new Date(alert.dueDate).toLocaleDateString()}
                    </Typography>
                  )}
                </Box>

                {alert.notes && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Notes: {alert.notes}
                    </Typography>
                  </Box>
                )}

                {alert.acknowledgedBy && (
                  <Box sx={{ mt: 2, p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                    <Typography variant="caption">
                      ✅ Acknowledged by {alert.acknowledgedBy}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(alert.acknowledgedDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}

                {alert.resolution && (
                  <Box sx={{ mt: 2, p: 1, bgcolor: 'success.light', borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ color: 'success.dark' }}>
                      ✅ Resolved: {alert.resolution}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}

        {alerts.length === 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircleOutlined sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No active alerts
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  All systems are running smoothly
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Alerts;