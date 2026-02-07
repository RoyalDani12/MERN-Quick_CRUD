import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, Send, AlertCircle } from 'lucide-react';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  age: z.coerce.number().min(1, "Age must be positive").max(120, "Invalid age"),
  email: z.string().email("Invalid email address"),
});

const Adduser = () => {
  const [formData, setFormData] = useState({ name: "", age: "", email: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handlesubmite = async (e) => {
    e.preventDefault();
    const result = userSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/adduser', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-slate-50 p-4'>
      <button onClick={() => navigate('/')} className='absolute top-6 left-4 md:top-10 md:left-10 flex items-center text-slate-500 hover:text-indigo-600 transition-all'>
        <ArrowLeft size={20} className='mr-1' /> <span className='font-medium'>Back</span>
      </button>

      <div className='w-full max-w-md bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-slate-100'>
        <div className='text-center mb-8'>
          <div className='bg-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4'>
            <UserPlus color='white' size={28} />
          </div>
          <h1 className='text-2xl font-bold text-slate-800'>Create User</h1>
        </div>

        <form onSubmit={handlesubmite} className='space-y-5'>
          {['name', 'age', 'email'].map((field) => (
            <div key={field} className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-slate-500 uppercase ml-1'>{field}</label>
              <input 
                type={field === 'age' ? 'number' : 'text'}
                className={`w-full p-3.5 bg-slate-50 border ${errors[field] ? 'border-rose-500' : 'border-slate-200'} rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20`}
                value={formData[field]}
                onChange={(e) => {
                    setFormData({...formData, [field]: e.target.value});
                    setErrors({...errors, [field]: null});
                }}
              />
              {errors[field] && <p className='text-rose-500 text-xs flex items-center gap-1'><AlertCircle size={12}/>{errors[field]}</p>}
            </div>
          ))}
          <button type='submit' className='w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2'>
            <Send size={18} /> Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Adduser;