import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';

// Form validation schema
const recordSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, 'Phone must be in format: 123-456-7890'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  status: z.enum(['Unique', 'Potential Duplicate'])
});

const EditRecordForm = ({ record, onSave, onCancel }) => {
  const [isDirty, setIsDirty] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(recordSchema),
    defaultValues: record
  });

  // Watch form changes for auto-save
  const formValues = watch();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDirty && isValid) {
        handleAutoSave();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [formValues]);

  // Phone number masking
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      setValue('phone', value);
    }
  };

  // Auto-save functionality
  const handleAutoSave = async () => {
    setAutoSaveStatus('Saving...');
    try {
      await onSave(formValues);
      setAutoSaveStatus('Changes saved');
      setTimeout(() => setAutoSaveStatus(''), 2000);
    } catch (error) {
      setAutoSaveStatus('Error saving');
    }
  };

  // Handle cancel with unsaved changes
  const handleCancel = () => {
    if (isDirty) {
      if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Edit Record</h2>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => {
                register('name').onChange(e);
                setIsDirty(true);
              }}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register('email')}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => {
                register('email').onChange(e);
                setIsDirty(true);
              }}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              {...register('phone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => {
                handlePhoneChange(e);
                setIsDirty(true);
              }}
              placeholder="123-456-7890"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              {...register('city')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => {
                register('city').onChange(e);
                setIsDirty(true);
              }}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              {...register('status')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => {
                register('status').onChange(e);
                setIsDirty(true);
              }}
            >
              <option value="Unique">Unique</option>
              <option value="Potential Duplicate">Potential Duplicate</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>

          {autoSaveStatus && (
            <div className="text-sm text-gray-600 italic">{autoSaveStatus}</div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty || !isValid}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecordForm; 