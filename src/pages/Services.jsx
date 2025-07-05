import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  AddOutlined,
  BuildOutlined,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Services = () => {
  const services = useSelector(state => state.services.services);

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Service Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track maintenance visits and service schedules
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddOutlined />}>
          New Service
        </Button>
      </Box>

      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} md={6} lg={4} key={service.id}>
            <Card sx={{ height: '100%', boxShadow: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BuildOutlined sx={{ mr: 1, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="h6">
                      {service.deviceType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.deviceId}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={service.status}
                  color={service.status === 'Completed' ? 'success' : 'warning'}
                  size="small"
                  sx={{ mb: 2 }}
                />

                <Typography variant="body2" sx={{ mb: 1 }}>
                  📍 {service.facility}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  👨‍🔧 {service.engineer}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  📅 {new Date(service.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  🔧 {service.type}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  {service.purpose}
                </Typography>

                {service.cost && (
                  <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                    💰 ${service.cost}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}

        {services.length === 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No service records found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Start by adding your first service visit
                </Typography>
                <Button variant="contained" startIcon={<AddOutlined />}>
                  Add Service
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Services;