import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Edit, UserPlus, Users, Loader2 } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/getuser');
      if (res.ok) {
        const result = await res.json();
        setUsers(result);
      }
    } catch (error) {
      console.log("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const response = await fetch(`http://localhost:8000/api/auth/deleteuser/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== id));
      }
    } catch (error) {
      console.log("Delete error", error.message);
    }
  };

  return (
    <div className='min-h-screen w-full bg-[#f8fafc] p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        
        {/* Header Section */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
          <div className='flex items-center gap-3'>
            <div className='bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200'>
              <Users color='white' size={24} />
            </div>
            <div>
              <h1 className='text-xl md:text-2xl font-bold text-slate-800 tracking-tight'>User Directory</h1>
              <p className='text-slate-500 text-xs md:text-sm'>Manage and monitor all active profiles</p>
            </div>
          </div>
          
          <Link to={'/adduser'} className='w-full md:w-auto flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md active:scale-95'>
            <UserPlus size={18} />
            Add New User
          </Link>
        </div>

        {/* Table Wrapper */}
        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-175'>
              <thead>
                <tr className='bg-slate-50/50 border-b border-slate-200'>
                  <th className='px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Full Name</th>
                  <th className='px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Age</th>
                  <th className='px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Email Address</th>
                  <th className='px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {loading ? (
                   <tr><td colSpan="4" className="py-10 text-center text-slate-400">Loading users...</td></tr>
                ) : users.map((user) => (
                  <tr key={user._id} className='hover:bg-slate-50/80 transition-colors'>
                    <td className='px-6 py-4 font-medium text-slate-700'>{user.name}</td>
                    <td className='px-6 py-4 text-slate-600'>{user.age}</td>
                    <td className='px-6 py-4 text-slate-500 font-mono text-sm'>{user.email}</td>
                    <td className='px-6 py-4'>
                      <div className='flex justify-center gap-2'>
                        <button onClick={() => navigate(`/update/${user._id}`)} className='p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all'><Edit size={18}/></button>
                        <button onClick={() => handleDelete(user._id)} className='p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-all'><Trash2 size={18}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && !loading && (
            <div className='py-20 text-center bg-white'>
              <p className='text-slate-400'>No users found in the database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;