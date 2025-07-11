import { Routes, Route, Navigate  } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import Login from './pages/Login';
import TemplateSelect from './pages/TemplateSelect';
import DetailsForm from './pages/DetailsForm';
import QuotationPreview from './pages/QuotationPreview'; // next step
import { useFormData } from './context/FormContext';
import type { JSX } from 'react';


// 

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useFormData();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <FormProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/template" element={<ProtectedRoute><TemplateSelect /></ProtectedRoute>} />
      <Route path="/form" element={<ProtectedRoute><DetailsForm /></ProtectedRoute>} />
      <Route path="/preview" element={<ProtectedRoute><QuotationPreview /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    </FormProvider>
  );
}

export default App;
