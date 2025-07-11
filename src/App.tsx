import { Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import Login from './pages/Login';
import TemplateSelect from './pages/TemplateSelect';
import DetailsForm from './pages/DetailsForm';
import QuotationPreview from './pages/QuotationPreview'; // next step
// 
function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/templates" element={<TemplateSelect />} />
        <Route path="/form" element={<DetailsForm />} />
        <Route path="/preview" element={<QuotationPreview />} />
      </Routes>
    </FormProvider>
  );
}

export default App;
