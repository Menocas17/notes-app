import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { type Theme } from '../context/ThemeContext';

const themeOptions = ['light', 'dark', 'system'];

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
        <img
          src='/themeSelectorBlackBorderIcon.svg'
          alt='Theme Icon'
          width={30}
          className='block dark:hidden'
        />

        <img
          src='/themeSelectorIcon.svg'
          alt='Theme Icon'
          width={30}
          className='hidden dark:block'
        />
      </button>

      {isOpen && (
        <div className='absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-lg bg-gray-100 border border-gray-200  text-black dark:bg-[#242424] dark:border dark:border-[#6A7282]'>
          <div className='p-2 flex flex-col gap-2'>
            {themeOptions.map((option) => (
              <button
                onClick={handleClick}
                className={`w-full px-2 py-2 text-left text-sm font-bold ${theme === option ? ' bg-gray-300 dark:bg-[#010101]' : ''} text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-[#1A1A1A] flex gap-2 items-center rounded-xl capitalize cursor-pointer`}
                value={option}
                key={option}
              >
                <img
                  src={
                    theme === 'light'
                      ? `/${option}BorderBlackIcon.svg`
                      : `/${option}Icon.svg`
                  }
                  alt='Theme Icon'
                />
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
