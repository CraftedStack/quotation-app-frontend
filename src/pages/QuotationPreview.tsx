//import React from 'react';
import { useFormData } from '../context/FormContext';
import { useNavigate } from 'react-router-dom';

// PDF DOWNLOAD
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';


const QuotationPreview = () => {
  const { data } = useFormData();
  const navigate = useNavigate();
  const quoteRef = useRef<HTMLDivElement>(null);


  if (!data) {
    return (
      <>
      <div ref={quoteRef} className="max-w-4xl mx-auto p-6 bg-white shadow mt-6 print:p-0 print:shadow-none print:bg-white">
      <div className="text-center mt-10">
        <p className="text-red-600">No data found. Please fill the form first.</p>
        <button
          onClick={() => navigate('/form')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Form
        </button>
      </div>
      </div>
      </>
    );
  }

 const total = data.items.reduce(
  (acc: number, item: { quantity: number; price: number }) => acc + item.quantity * item.price,
  0
)

  const handleDownload = () => {
  if (!quoteRef.current) return;

  html2pdf()
    .set({
      margin: 0.5,
      filename: 'quotation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    })
    .from(quoteRef.current)
    .save();
};
    return (
    <div ref={quoteRef} className="max-w-4xl mx-auto p-6 bg-white shadow mt-6 print:p-0 print:shadow-none print:bg-white">
        <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold">Quotation</h1>
        <p className="text-sm text-gray-500">Generated on: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="mb-6">
        <h2 className="text-lg font-semibold">Customer Details</h2>
        <p><strong>Name:</strong> {data.customerName}</p>
        <p><strong>Email:</strong> {data.customerEmail}</p>
        </div>

        <div>
        <h2 className="text-lg font-semibold mb-2">Items</h2>
        <table className="w-full border-collapse">
            <thead>
            <tr className="bg-gray-100 text-left">
                <th className="border px-4 py-2">Item</th>
                <th className="border px-4 py-2">Qty</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Total</th>
            </tr>
            </thead>
            <tbody>
            {data.items.map((item: { name: string; quantity: number; price: number }, index: number) => (
            <tr key={index}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">₹{item.price}</td>
                <td className="border px-4 py-2">₹{item.quantity * item.price}</td>
            </tr>
            ))}
            <tr className="font-semibold">
                <td colSpan={3} className="border px-4 py-2 text-right">Grand Total</td>
                <td className="border px-4 py-2">₹{total}</td>
            </tr>
            </tbody>
        </table>
        </div>

        <div className="mt-8 flex gap-4">
        <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
            Download as PDF
        </button>
        <button
            onClick={() => navigate('/form')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
            Edit Details
        </button>
        </div>
    </div>
    );

};

export default QuotationPreview;
