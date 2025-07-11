import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  EditOutlined,
  DeleteOutlined,
  BatteryFullOutlined,
  LocationOnOutlined,
} from '@mui/icons-material';
import styles from '../../styles/components/DeviceCard.module.scss';

const DeviceCard = ({ device, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Online': return 'success';
      case 'Offline': return 'error';
      case 'Maintenance': return 'warning';
      default: return 'default';
    }
  };

  const getAmcStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Expiring Soon': return 'warning';
      case 'Expired': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card className={styles.deviceCard}>
      <CardContent>
        <Box className={styles.cardHeader}>
          <Typography variant="h6" noWrap>
            {device.type}
          </Typography>
          <Box>
            <IconButton size="small" onClick={onEdit}>
              <EditOutlined />
            </IconButton>
            <IconButton size="small" onClick={onDelete} color="error">
              <DeleteOutlined />
            </IconButton>
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          ID: {device.deviceId}
        </Typography>

        <Box className={styles.statusSection}>
          <Chip
            label={device.status}
            color={getStatusColor(device.status)}
            size="small"
          />
          <Chip
            label={`AMC: ${device.amcStatus}`}
            color={getAmcStatusColor(device.amcStatus)}
            size="small"
            variant="outlined"
          />
        </Box>

        <Box className={styles.facilityInfo}>
          <LocationOnOutlined sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2">{device.facility}</Typography>
        </Box>

        <Box className={styles.batterySection}>
          <Box className={styles.batteryHeader}>
            <BatteryFullOutlined sx={{ fontSize: 16 }} />
            <Typography variant="body2">
              Battery: {device.batteryLevel}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={device.batteryLevel}
            color={device.batteryLevel > 50 ? 'success' : device.batteryLevel > 20 ? 'warning' : 'error'}
            sx={{ mt: 0.5 }}
          />
        </Box>

        <Box className={styles.serviceInfo}>
          <Typography variant="caption" display="block">
            Last Service: {device.lastServiceDate}
          </Typography>
          <Typography variant="caption" display="block">
            Installed: {device.installationDate}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;