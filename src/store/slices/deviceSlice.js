import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  devices: JSON.parse(localStorage.getItem('devices')) || [
    {
      id: '1',
      type: 'MRI Scanner',
      deviceId: 'MRI-001',
      facility: 'City Hospital',
      status: 'Online',
      batteryLevel: 85,
      lastServiceDate: '2024-01-15',
      installationDate: '2023-06-20',
      amcStatus: 'Active',
      amcExpiryDate: '2024-06-20',
      location: 'Radiology Department',
      model: 'Siemens MAGNETOM',
      serialNumber: 'SN123456789',
      photos: [],
      notes: 'High-performance MRI scanner for detailed imaging'
    },
    {
      id: '2',
      type: 'CT Scanner',
      deviceId: 'CT-002',
      facility: 'Metro Clinic',
      status: 'Maintenance',
      batteryLevel: 65,
      lastServiceDate: '2024-01-10',
      installationDate: '2023-08-15',
      amcStatus: 'Expiring Soon',
      amcExpiryDate: '2024-03-15',
      location: 'Imaging Center',
      model: 'GE Revolution',
      serialNumber: 'SN987654321',
      photos: [],
      notes: 'Advanced CT scanner with 3D imaging capabilities'
    },
    {
      id: '3',
      type: 'X-Ray Machine',
      deviceId: 'XR-003',
      facility: 'Community Health Center',
      status: 'Online',
      batteryLevel: 92,
      lastServiceDate: '2024-01-20',
      installationDate: '2023-09-10',
      amcStatus: 'Active',
      amcExpiryDate: '2024-09-10',
      location: 'Emergency Department',
      model: 'Philips DigitalDiagnost',
      serialNumber: 'SN445566778',
      photos: [],
      notes: 'Digital X-ray system for emergency diagnostics'
    }
  ],
  loading: false,
  error: null,
};

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice: (state, action) => {
      const newDevice = {
        ...action.payload,
        id: uuidv4(),
        photos: [],
        notes: action.payload.notes || ''
      };
      state.devices.push(newDevice);
      localStorage.setItem('devices', JSON.stringify(state.devices));
    },
    updateDevice: (state, action) => {
      const index = state.devices.findIndex(device => device.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = { ...state.devices[index], ...action.payload };
        localStorage.setItem('devices', JSON.stringify(state.devices));
      }
    },
    deleteDevice: (state, action) => {
      state.devices = state.devices.filter(device => device.id !== action.payload);
      localStorage.setItem('devices', JSON.stringify(state.devices));
    },
    addDevicePhoto: (state, action) => {
      const { deviceId, photo } = action.payload;
      const device = state.devices.find(d => d.id === deviceId);
      if (device) {
        device.photos = device.photos || [];
        device.photos.push({
          id: uuidv4(),
          name: photo.name,
          url: photo.url,
          uploadDate: new Date().toISOString(),
          type: photo.type || 'condition'
        });
        localStorage.setItem('devices', JSON.stringify(state.devices));
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addDevice, updateDevice, deleteDevice, addDevicePhoto, setLoading, setError } = deviceSlice.actions;
export default deviceSlice.reducer;
