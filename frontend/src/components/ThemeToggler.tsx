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
    <div className='relative inline-block leading-none'>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img
          src={theme === 'dark' ? '/darkIcon.svg' : '/lightBorderBlackIcon.svg'}
          alt='Theme Icon'
          width={30}
        />
      </button>

      {isOpen && (
        <div className='absolute right-0 z-10 mt-2 w-25 origin-top-right rounded-md bg-white text-black dark:bg-[#242424] dark:border dark:border-[#6A7282]'>
          <div className='py-1 flex flex-col'>
            <button
              onClick={handleClick}
              className=' w-full px-4 py-2 text-left text-sm font-bold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#242424] flex gap-2 items-center'
            >
              <img
                src={
                  theme === 'light'
                    ? '/lightBorderBlackIcon.svg'
                    : 'lightIcon.svg'
                }
                alt='Theme Icon'
              />
              Light
            </button>
            <button
              onClick={handleClick}
              className='w-full px-4 py-2 text-left text-sm font-bold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#242424] flex gap-2 items-center'
            >
              <img
                src={
                  theme === 'light'
                    ? '/darkBorderBlackIcon.svg'
                    : 'darkIcon.svg'
                }
                alt='Theme Icon'
              />
              Dark
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
