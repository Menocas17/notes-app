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
    <div className='max-w-[90%] lg:max-w-3/5 m-auto'>
      <header className='flex flex-col mt-4 md:mt-10'>
        <div className='flex gap-4 justify-between items-center'>
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

        <nav className='mt-8 mb-4 flex  gap-5 min-[413px]:gap-6 md:gap-20 justify-center bg-gray-100 dark:bg-[#3b3e3f] border border-gray-200 dark:border-[#202122] rounded-2xl py-2 font-bold md:max-w-4/5 m-auto px-5'>
          <NavLink
            to='/myNotes'
            className={({ isActive }) =>
              `hover:text-[#8D7315] dark:hover:text-primary ${isActive ? 'text-[#8D7315] dark:text-primary' : ''}`
            }
          >
            My notes
          </NavLink>
          <NavLink
            to='archivedNotes'
            className={({ isActive }) =>
              `hover:text-[#8D7315] dark:hover:text-primary ${isActive ? 'text-[#8D7315] dark:text-primary' : ''}`
            }
          >
            Archived Notes
          </NavLink>
          <NavLink
            to='createNote'
            className={({ isActive }) =>
              `hover:text-[#8D7315] dark:hover:text-primary ${isActive ? 'text-[#8D7315] dark:text-primary' : ''}`
            }
          >
            Create Note
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
