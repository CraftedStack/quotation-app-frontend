import React, { createContext, useState, useContext } from 'react';

type Item = {
  name: string;
  quantity: number;
  price: number;
};

type FormData = {
  customerName: string;
  customerEmail: string;
  items: Item[];
};

const FormContext = createContext<{
  data: FormData | null;
  setData: (data: FormData) => void;
}>({
  data: null,
  setData: () => {},
});

export const useFormData = () => useContext(FormContext);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<FormData | null>(null);
  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
};
