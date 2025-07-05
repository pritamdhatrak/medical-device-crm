import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  alerts: JSON.parse(localStorage.getItem('alerts')) || [
    {
      id: '1',
      deviceId: 'CT-002',
      deviceType: 'CT Scanner',
      facility: 'Metro Clinic',
      type: 'warning',
      category: 'contract',
      title: 'Contract Expiring Soon',
      message: 'CMC contract expires in 30 days. Please initiate renewal process.',
      date: '2024-01-20T10:00:00Z',
      status: 'active',
      priority: 'high',
      acknowledgedBy: null,
      acknowledgedDate: null,
      photos: [],
      notes: '',
      resolution: null,
      dueDate: '2024-03-15'
    },
    {
      id: '2',
      deviceId: 'MRI-001',
      deviceType: 'MRI Scanner',
      facility: 'City Hospital',
      type: 'info',
      category: 'maintenance',
      title: 'Scheduled Maintenance Due',
      message: 'Quarterly maintenance scheduled for next week.',
      date: '2024-01-25T14:30:00Z',
      status: 'active',
      priority: 'medium',
      acknowledgedBy: null,
      acknowledgedDate: null,
      photos: [],
      notes: 'Routine quarterly maintenance check',
      resolution: null,
      dueDate: '2024-02-01'
    },
    {
      id: '3',
      deviceId: 'XR-003',
      deviceType: 'X-Ray Machine',
      facility: 'Community Health Center',
      type: 'error',
      category: 'equipment',
      title: 'Low Battery Warning',
      message: 'Battery level below 20%. Please charge or replace.',
      date: '2024-01-26T09:15:00Z',
      status: 'active',
      priority: 'high',
      acknowledgedBy: null,
      acknowledgedDate: null,
      photos: [],
      notes: 'Battery showing signs of degradation',
      resolution: null,
      dueDate: '2024-01-27'
    }
  ],
  loading: false,
  error: null,
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      const newAlert = {
        ...action.payload,
        id: uuidv4(),
        date: new Date().toISOString(),
        status: 'active',
        photos: action.payload.photos || [],
        acknowledgedBy: null,
        acknowledgedDate: null
      };
      state.alerts.push(newAlert);
      localStorage.setItem('alerts', JSON.stringify(state.alerts));
    },
    updateAlert: (state, action) => {
      const index = state.alerts.findIndex(alert => alert.id === action.payload.id);
      if (index !== -1) {
        state.alerts[index] = { ...state.alerts[index], ...action.payload };
        localStorage.setItem('alerts', JSON.stringify(state.alerts));
      }
    },
    deleteAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
      localStorage.setItem('alerts', JSON.stringify(state.alerts));
    },
    acknowledgeAlert: (state, action) => {
      const { alertId, acknowledgedBy } = action.payload;
      const alert = state.alerts.find(alert => alert.id === alertId);
      if (alert) {
        alert.acknowledgedBy = acknowledgedBy;
        alert.acknowledgedDate = new Date().toISOString();
        alert.status = 'acknowledged';
        localStorage.setItem('alerts', JSON.stringify(state.alerts));
      }
    },
    resolveAlert: (state, action) => {
      const { alertId, resolution, resolvedBy } = action.payload;
      const alert = state.alerts.find(alert => alert.id === alertId);
      if (alert) {
        alert.status = 'resolved';
        alert.resolution = resolution;
        alert.resolvedBy = resolvedBy;
        alert.resolvedDate = new Date().toISOString();
        localStorage.setItem('alerts', JSON.stringify(state.alerts));
      }
    },
    addAlertPhoto: (state, action) => {
      const { alertId, photo } = action.payload;
      const alert = state.alerts.find(a => a.id === alertId);
      if (alert) {
        alert.photos.push({
          ...photo,
          id: uuidv4(),
          uploadDate: new Date().toISOString()
        });
        localStorage.setItem('alerts', JSON.stringify(state.alerts));
      }
    },
  },
});

export const { 
  addAlert, 
  updateAlert, 
  deleteAlert, 
  acknowledgeAlert, 
  resolveAlert, 
  addAlertPhoto 
} = alertSlice.actions;
export default alertSlice.reducer;
