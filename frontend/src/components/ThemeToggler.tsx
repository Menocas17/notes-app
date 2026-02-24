import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { type Theme } from '../context/ThemeContext';

export default function ThemeToggler() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = e.currentTarget.value as Theme;
    toggleTheme(newTheme);
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative inline-block leading-none '>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className='cursor-pointer'
      >
        <img src={'/themeSelectorIcon.svg'} alt='Theme Icon' width={30} />
      </button>

      {isOpen && (
        <div className='absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-gray-100 border border-gray-200  text-black dark:bg-[#242424] dark:border dark:border-[#6A7282]'>
          <div className='py-1 flex flex-col'>
            <button
              onClick={handleClick}
              className=' w-full px-4 py-2 text-left text-sm font-bold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#1A1A1A] flex gap-2 items-center '
              value={'light'}
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
              className={`w-full px-4 py-2 text-left text-sm font-bold ${theme === 'dark' ? 'bg-[#1A1A1A]' : ''} text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#1A1A1A] flex gap-2 items-center`}
              value={'dark'}
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
            <button
              onClick={handleClick}
              className='w-full px-4 py-2 text-left text-sm font-bold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#1A1A1A] flex gap-2 items-center'
              value={'system'}
            >
              <img
                src={
                  theme === 'light'
                    ? '/systemBorderBlackIcon.svg'
                    : 'systemIcon.svg'
                }
                alt='Theme Icon'
              />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
