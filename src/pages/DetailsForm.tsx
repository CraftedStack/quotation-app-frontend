import { useFormData } from '../context/FormContext';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

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

const DetailsForm = () => {
  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      items: [{ name: '', quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: FormData) => {
    setData(data);
    navigate('/preview');
  };
  const { setData } = useFormData();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Enter Quotation Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Customer Name</label>
          <input {...register("customerName")} className="w-full border rounded px-4 py-2 mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium">Customer Email</label>
          <input type="email" {...register("customerEmail")} className="w-full border rounded px-4 py-2 mt-1" />
        </div>

        <div>
          <h3 className="text-lg font-semibold mt-6 mb-2">Items</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3 mb-3">
              <input
                {...register(`items.${index}.name`)}
                placeholder="Item Name"
                className="flex-1 border px-3 py-2 rounded"
              />
              <input
                type="number"
                {...register(`items.${index}.quantity`)}
                placeholder="Qty"
                className="w-20 border px-3 py-2 rounded"
              />
              <input
                type="number"
                {...register(`items.${index}.price`)}
                placeholder="Price"
                className="w-24 border px-3 py-2 rounded"
              />
              <button type="button" onClick={() => remove(index)} className="text-red-500">
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ name: '', quantity: 1, price: 0 })}
            className="mt-2 text-blue-600"
          >
            + Add Item
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default DetailsForm;
