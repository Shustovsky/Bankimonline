import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определение интерфейса для данных формы
interface FormData {
  propertyCost: number;
  purchaseCity: string;
  timeRegistration: string,
  initialPayment: number,
  propertyType: string,
  propertyOwn: string,
  period: number,
  monthlyPayment: number,
}

const initialState: FormData = {
  propertyCost: 1000000,
  purchaseCity: '',
  timeRegistration: '',
  initialPayment: 500000,
  propertyType: '',
  propertyOwn: '',
  period: 30,
  monthlyPayment: 2654,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<FormData>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateFormData } = formSlice.actions;
export default formSlice.reducer;
