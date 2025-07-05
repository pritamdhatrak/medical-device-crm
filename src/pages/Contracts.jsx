import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  AddOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Contracts = () => {
  const contracts = useSelector(state => state.contracts.contracts);

  const getDaysUntilExpiry = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Expiring Soon': return 'warning';
      case 'Expired': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Contract Management (AMC/CMC)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track maintenance contracts and renewal dates
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddOutlined />}>
          New Contract
        </Button>
      </Box>

      <Grid container spacing={3}>
        {contracts.map((contract) => {
          const daysUntilExpiry = getDaysUntilExpiry(contract.endDate);
          
          return (
            <Grid item xs={12} md={6} lg={4} key={contract.id}>
              <Card sx={{ height: '100%', boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">
                      {contract.deviceType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {contract.deviceId} • {contract.contractNumber}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={contract.type}
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={contract.status}
                      color={getStatusColor(contract.status)}
                      size="small"
                      icon={contract.status === 'Active' ? <CheckCircleOutlined /> : <WarningOutlined />}
                    />
                  </Box>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    🏢 {contract.facility}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    🤝 {contract.provider}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    💰 ${contract.amount.toLocaleString()} {contract.currency}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📅 Start: {new Date(contract.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    📅 End: {new Date(contract.endDate).toLocaleDateString()}
                  </Typography>

                  {daysUntilExpiry <= 30 && daysUntilExpiry > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="warning.main" sx={{ fontWeight: 600 }}>
                        ⚠️ Expires in {daysUntilExpiry} days
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.max(0, (30 - daysUntilExpiry) / 30 * 100)}
                        color="warning"
                        sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  )}

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Contact: {contract.contactPerson}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      📞 {contract.contactPhone}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}

        {contracts.length === 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No contracts found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Start by adding your first maintenance contract
                </Typography>
                <Button variant="contained" startIcon={<AddOutlined />}>
                  Add Contract
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Contracts;