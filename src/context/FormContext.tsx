import React, { createContext, useState, useContext } from 'react';

/*type Item = {
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
});*/

const FormContext = createContext<any>(null);

// export const useFormData = () => useContext(FormContext);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <FormContext.Provider value={{ data, setData, isLoggedIn, setIsLoggedIn }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);
