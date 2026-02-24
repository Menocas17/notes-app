import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggler() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img
          src={theme === 'dark' ? '/darkIcon.svg' : '/lightIcon.svg'}
          alt='Theme Icon'
        />
      </button>

      {isOpen && (
        <div className='absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 dark:bg-[#1a1a1a] dark:border dark:border-gray-600'>
          <div className='py-1 flex flex-col'>
            <button
              onClick={handleClick}
              className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#242424]'
            >
              Light
            </button>
            <button
              onClick={handleClick}
              className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#242424]'
            >
              Dark
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
