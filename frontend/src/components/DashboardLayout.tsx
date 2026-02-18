import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboarLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className='max-w-[90%] lg:max-w-5/6 m-auto'>
      <header className='flex flex-col mt-4 md:mt-10'>
        <div className='flex gap-4 justify-between items-center pb-6 border-b'>
          <div className='flex items-center gap-4'>
            <img
              src={user?.picture}
              alt={`${user?.name}'s photo`}
              className='rounded-full w-14'
            />
            <div>
              <h2 className='text-xl font-bold'>Welcome Back </h2>{' '}
              <span className='font-light'>{user?.name} </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className='font-bold  bg-primary text-black hover:bg-yellow-500 dark:text-[#e3e3e3] dark:border dark:border-red-900 dark:bg-[#242424] dark:hover:bg-red-900 dark:hover:text-white py-1.5 px-3 rounded-lg'
          >
            Logout
          </button>
        </div>

        {/* bg-[#3b3e3f] */}

        <div className='flex flex-wrap items-center justify-center mt-10 mb-5 gap-3'>
          <nav className='  flex  gap-5 min-[413px]:gap-6 md:gap-8 justify-center bg-gray-100 dark:bg-transparent border border-gray-200 dark:border-gray-500 rounded-2xl py-3 font-bold md:max-w-4/5 px-5'>
            <NavLink
              to='/myNotes'
              className={({ isActive }) =>
                ` ${isActive ? 'border-b-2 border-gray-600 dark:border-primary' : ''}`
              }
            >
              My notes
            </NavLink>
            <NavLink
              to='archivedNotes'
              className={({ isActive }) =>
                ` ${isActive ? 'border-b-2 border-gray-600 dark:border-primary' : ''}`
              }
            >
              Archived Notes
            </NavLink>
          </nav>
          <NavLink
            to='createNote'
            className={
              'bg-yellow-200 border border-gray-200 dark:border-gray-400 text-black rounded-2xl py-2 px-3 font-bold transition-transform duration-300 hover:scale-103'
            }
          >
            Create Note
          </NavLink>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
