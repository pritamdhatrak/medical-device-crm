import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  services: JSON.parse(localStorage.getItem('services')) || [
    {
      id: '1',
      deviceId: 'MRI-001',
      deviceType: 'MRI Scanner',
      facility: 'City Hospital',
      date: '2024-01-15',
      engineer: 'Admin',
      type: 'Preventive',
      purpose: 'Routine Maintenance',
      status: 'Completed',
      duration: '4 hours',
      notes: 'All systems functioning normally. Replaced air filters and performed calibration.',
      attachments: [
        {
          id: '1',
          name: 'service_report.pdf',
          type: 'document',
          uploadDate: '2024-01-15T16:00:00Z'
        }
      ],
      checklist: [
        { item: 'Visual Inspection', completed: true },
        { item: 'Performance Tests', completed: true },
        { item: 'Software Updates', completed: true },
        { item: 'Calibration', completed: true }
      ],
      nextServiceDate: '2024-04-15',
      partsReplaced: ['Air Filter', 'Cooling Fan'],
      cost: 125000
    }
  ],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    addService: (state, action) => {
      const newService = {
        ...action.payload,
        id: uuidv4(),
        attachments: action.payload.attachments || [],
        checklist: action.payload.checklist || []
      };
      state.services.push(newService);
      localStorage.setItem('services', JSON.stringify(state.services));
    },
    updateService: (state, action) => {
      const index = state.services.findIndex(service => service.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = { ...state.services[index], ...action.payload };
        localStorage.setItem('services', JSON.stringify(state.services));
      }
    },
    deleteService: (state, action) => {
      state.services = state.services.filter(service => service.id !== action.payload);
      localStorage.setItem('services', JSON.stringify(state.services));
    },
    addServiceAttachment: (state, action) => {
      const { serviceId, attachment } = action.payload;
      const service = state.services.find(s => s.id === serviceId);
      if (service) {
        service.attachments.push({
          ...attachment,
          id: uuidv4(),
          uploadDate: new Date().toISOString()
        });
        localStorage.setItem('services', JSON.stringify(state.services));
      }
    },
  },
});

export const { addService, updateService, deleteService, addServiceAttachment } = serviceSlice.actions;
export default serviceSlice.reducer;
