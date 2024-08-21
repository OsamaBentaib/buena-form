import create from 'zustand';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  salary: string;
}

interface FormStore {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  formData: {
    fullName: '',
    email: '',
    phoneNumber: '',
    salary: '',
  },
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
  })),
  resetForm: () => set({
    formData: {
      fullName: '',
      email: '',
      phoneNumber: '',
      salary: '',
    },
  }),
}));
