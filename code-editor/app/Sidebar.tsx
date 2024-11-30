"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

const languages = [
  { name: 'javascript', icon: 'js' },
  { name: 'python', icon: 'python' },
  { name: 'php', icon: 'php' },
  { name: 'swift', icon: 'swift' },
  { name: 'rust', icon: 'rust' },
  { name: 'c', icon: 'C' }
];

const Sidebar = () => {
  const path = usePathname();
  const activeLanguage = path.split('/')[2];
  const { theme } = useTheme();

  const isActive = (language: string) => activeLanguage === language;

  const getImageSrc = (icon: string) => {
    return theme === "dark" ? `/icons/${icon}.png` : `/icons/lightmode/${icon}dark.png`;
  };

  return (
    <div className='flex flex-col sidebar'>
      {languages.map(({ name, icon }) => (
        <Link
          key={name}
          href={`/editor/${name}`}
          className={`lang ${isActive(name) ? 'lang-active' : ''} mt-3`}
        >
          <img
            src={getImageSrc(icon)}
            alt={`${name} Icon`}
          />
        </Link>
      ))}

      <Link href='/editor/go' className={`lang mt-3 ${isActive('go') ? 'lang-active' : ''}`}>
          <img src={theme === "dark" ?  '/icons/go.webp': "/icons/lightmode/Godark.webp"} alt='Go' />
      </Link>
    </div>
  );
};

export default Sidebar;
