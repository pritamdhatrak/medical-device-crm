import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  installations: JSON.parse(localStorage.getItem('installations')) || [
    {
      id: '1',
      deviceId: 'MRI-001',
      deviceType: 'MRI Scanner',
      facility: 'City Hospital',
      installationDate: '2023-06-20',
      engineer: 'John Smith',
      status: 'Completed',
      trainingCompleted: true,
      checklist: [
        { id: '1', item: 'Device Unboxing', completed: true, notes: 'All components present' },
        { id: '2', item: 'Hardware Setup', completed: true, notes: 'Installation completed successfully' },
        { id: '3', item: 'Software Installation', completed: true, notes: 'Latest firmware installed' },
        { id: '4', item: 'Testing & Calibration', completed: true, notes: 'All tests passed' },
        { id: '5', item: 'Staff Training', completed: true, notes: '5 staff members trained' }
      ],
      photos: [
        {
          id: '1',
          name: 'unboxing.jpg',
          type: 'unboxing',
          uploadDate: '2023-06-20T10:00:00Z'
        }
      ],
      notes: 'Installation completed successfully with full staff training.',
      trainingAttendees: ['Dr. Sarah Johnson', 'Tech Mike Wilson', 'Nurse Lisa Brown'],
      nextMaintenanceDate: '2023-09-20'
    }
  ],
  loading: false,
  error: null,
};

const installationSlice = createSlice({
  name: 'installations',
  initialState,
  reducers: {
    addInstallation: (state, action) => {
      const newInstallation = {
        ...action.payload,
        id: uuidv4(),
        checklist: action.payload.checklist || [],
        photos: action.payload.photos || [],
        trainingAttendees: action.payload.trainingAttendees || []
      };
      state.installations.push(newInstallation);
      localStorage.setItem('installations', JSON.stringify(state.installations));
    },
    updateInstallation: (state, action) => {
      const index = state.installations.findIndex(inst => inst.id === action.payload.id);
      if (index !== -1) {
        state.installations[index] = { ...state.installations[index], ...action.payload };
        localStorage.setItem('installations', JSON.stringify(state.installations));
      }
    },
    deleteInstallation: (state, action) => {
      state.installations = state.installations.filter(inst => inst.id !== action.payload);
      localStorage.setItem('installations', JSON.stringify(state.installations));
    },
    updateChecklist: (state, action) => {
      const { installationId, checklistItem } = action.payload;
      const installation = state.installations.find(inst => inst.id === installationId);
      if (installation) {
        const itemIndex = installation.checklist.findIndex(item => item.id === checklistItem.id);
        if (itemIndex !== -1) {
          installation.checklist[itemIndex] = checklistItem;
        } else {
          installation.checklist.push(checklistItem);
        }
        localStorage.setItem('installations', JSON.stringify(state.installations));
      }
    },
    addInstallationPhoto: (state, action) => {
      const { installationId, photo } = action.payload;
      const installation = state.installations.find(inst => inst.id === installationId);
      if (installation) {
        installation.photos.push({
          ...photo,
          id: uuidv4(),
          uploadDate: new Date().toISOString()
        });
        localStorage.setItem('installations', JSON.stringify(state.installations));
      }
    },
  },
});

export const { 
  addInstallation, 
  updateInstallation, 
  deleteInstallation, 
  updateChecklist, 
  addInstallationPhoto 
} = installationSlice.actions;
export default installationSlice.reducer;
