"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const path = usePathname();
  const Activelanguage: string = path.split('/')[2];
  const isActive = (language: string) => Activelanguage === language


  return (
    <div className='flex flex-col sidebar'>
      <Link href='/editor/javascript' className={`lang mt-4 ${isActive('javascript') ? 'lang-active' : ''}`}>
          <img src='/icons/js.png' alt='JavaScript Icon' />
      </Link>
      <Link href='/editor/python' className={`lang ${isActive('python') ? 'lang-active' : ''}`}>
          <img src='/icons/python.png' alt='Python Icon' />
      </Link>
      <Link href='/editor/go' className={`lang ${isActive('go') ? 'lang-active' : ''}`}>
          <img src='/icons/go.webp' alt='Go Icon' />
      </Link>
      <Link href='/editor/php' className={`lang ${isActive('php') ? 'lang-active' : ''}`}>
          <img src='/icons/php.png' alt='PHP Icon' />
      </Link>
      <Link href='/editor/swift' className={`lang ${isActive('swift') ? 'lang-active' : ''}`}>
          <img src='/icons/swift.png' alt='Swift Icon' />
      </Link>
      <Link href='/editor/rust' className={`lang ${isActive('rust') ? 'lang-active' : ''}`}>
          <img src='/icons/rust.png' alt='Rust Icon' />
      </Link>
      <Link href='/editor/c' className={`lang ${isActive('c') ? 'lang-active' : ''}`}>
          <img src='/icons/C.png' alt='C Icon' />
      </Link>
    </div>
  );
};

export default Sidebar;
