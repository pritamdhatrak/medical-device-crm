import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  contracts: JSON.parse(localStorage.getItem('contracts')) || [
    {
      id: '1',
      deviceId: 'MRI-001',
      deviceType: 'MRI Scanner',
      facility: 'City Hospital',
      type: 'AMC',
      contractNumber: 'AMC-2023-001',
      startDate: '2023-06-20',
      endDate: '2024-06-20',
      status: 'Active',
      amount: 50000,
      currency: 'IND',
      contactPerson: 'Contact Person',
      contactPhone: 'Not Available',
      contactEmail: 'contact@example.com',
      provider: 'MedTech Services Inc.',
     
      renewalDate: '2024-05-20',
      terms: 'Annual maintenance with 24/7 support, quarterly inspections, and emergency response within 4 hours.',
      coverage: ['Preventive Maintenance', '24/7 Support', 'Parts Replacement', 'Software Updates'],
      attachments: [
        {
          id: '1',
          name: 'contract_signed.pdf',
          uploadDate: '2023-06-20T10:00:00Z'
        }
      ],
      renewalReminders: [
        { date: '2024-04-20', sent: false },
        { date: '2024-05-01', sent: false }
      ]
    },
    {
      id: '2',
      deviceId: 'CT-002',
      deviceType: 'CT Scanner',
      facility: 'Metro Clinic',
      type: 'CMC',
      contractNumber: 'CMC-2023-002',
      startDate: '2023-08-15',
      endDate: '2024-03-15',
      status: 'Expiring Soon',
      amount: 35000,
      currency: 'IND',
      provider: 'HealthTech Solutions',
      contactPerson: 'Contact Person',
      contactPhone: 'Not Available',
      contactEmail: 'contact@example.com',
      
      renewalDate: '2024-02-15',
      terms: 'Comprehensive maintenance contract including all parts and labor.',
      coverage: ['Comprehensive Maintenance', 'Parts & Labor', 'Training Support'],
      attachments: [],
      renewalReminders: [
        { date: '2024-01-15', sent: true },
        { date: '2024-02-01', sent: false }
      ]
    }
  ],
  loading: false,
  error: null,
};

const contractSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    addContract: (state, action) => {
      const newContract = {
        ...action.payload,
        id: uuidv4(),
        attachments: action.payload.attachments || [],
        renewalReminders: action.payload.renewalReminders || []
      };
      state.contracts.push(newContract);
      localStorage.setItem('contracts', JSON.stringify(state.contracts));
    },
    updateContract: (state, action) => {
      const index = state.contracts.findIndex(contract => contract.id === action.payload.id);
      if (index !== -1) {
        state.contracts[index] = { ...state.contracts[index], ...action.payload };
        localStorage.setItem('contracts', JSON.stringify(state.contracts));
      }
    },
    deleteContract: (state, action) => {
      state.contracts = state.contracts.filter(contract => contract.id !== action.payload);
      localStorage.setItem('contracts', JSON.stringify(state.contracts));
    },
    addContractAttachment: (state, action) => {
      const { contractId, attachment } = action.payload;
      const contract = state.contracts.find(c => c.id === contractId);
      if (contract) {
        contract.attachments.push({
          ...attachment,
          id: uuidv4(),
          uploadDate: new Date().toISOString()
        });
        localStorage.setItem('contracts', JSON.stringify(state.contracts));
      }
    },
    markReminderSent: (state, action) => {
      const { contractId, reminderDate } = action.payload;
      const contract = state.contracts.find(c => c.id === contractId);
      if (contract) {
        const reminder = contract.renewalReminders.find(r => r.date === reminderDate);
        if (reminder) {
          reminder.sent = true;
        }
        localStorage.setItem('contracts', JSON.stringify(state.contracts));
      }
    },
  },
});

export const { 
  addContract, 
  updateContract, 
  deleteContract, 
  addContractAttachment, 
  markReminderSent 
} = contractSlice.actions;
export default contractSlice.reducer;
