import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  age: z.coerce.number().min(1, "Age must be positive"),
  email: z.string().email("Invalid email address"),
});

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', age: '', email: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/auth/getedite/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({ name: data.name, age: data.age, email: data.email });
        }
      } catch (error) { console.log(error.message); }
    };
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = userSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0]] = err.message; });
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/auth/updateuser/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) navigate('/');
    } catch (error) { console.log(error); }
  };

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-slate-50 p-4'>
      <button onClick={() => navigate('/')} className='absolute top-6 left-4 md:top-10 md:left-10 flex items-center text-slate-500 transition-all'>
        <ArrowLeft size={20} className='mr-1' /> <span className='font-medium'>Cancel</span>
      </button>

      <div className='w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-slate-100'>
        <h1 className='text-2xl font-bold text-slate-800 mb-8'>Update Profile</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {['name', 'age', 'email'].map((field) => (
            <div key={field} className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-slate-600 uppercase'>{field}</label>
              <input 
                type={field === 'age' ? 'number' : 'text'}
                className={`w-full p-4 bg-slate-50 border ${errors[field] ? 'border-rose-500' : 'border-slate-200'} rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20`}
                value={formData[field]}
                onChange={(e) => {
                    setFormData({...formData, [field]: e.target.value});
                    setErrors({...errors, [field]: null});
                }}
              />
              {errors[field] && <p className='text-rose-500 text-xs flex items-center gap-1'><AlertCircle size={12}/>{errors[field]}</p>}
            </div>
          ))}
          <button type='submit' className='w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 shadow-lg transition-all flex items-center justify-center gap-2'>
            <Save size={20} /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;