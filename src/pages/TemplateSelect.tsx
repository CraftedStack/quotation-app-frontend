import { useNavigate } from 'react-router-dom';

const templates = [
  { id: 1, name: "Classic Quotation", description: "Simple professional layout" },
  { id: 2, name: "Modern Invoice", description: "Clean and bold styling" },
  { id: 3, name: "Compact Estimate", description: "Minimal, space-saving format" },
  { id: 4, name: "Custom", description: "Make your Own" },
];



const TemplateSelect = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: number) => {
    console.log(`Selected template ${templateId}`);
    // Store selected template in state/context if needed
    navigate('/form');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Select a Template</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
            <p className="text-gray-600 mb-4">{template.description}</p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              onClick={() => handleTemplateSelect(template.id)}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelect;
