import Link from 'next/link'
import React from 'react'

const sidebar = () => {
  return (
    <div className='flex flex-col sidebar'>
        <Link href='/editor/python'>Python</Link>
        <Link href='/editor/javascript'>JavScript</Link>
        <Link href='/editor/go'>Go</Link>
        <Link href='/editor/php'>PHP</Link>
        <Link href='/editor/swift'>Swift</Link>
        <Link href='/editor/rust'>Rust</Link>
        <Link href='/editor/c'>C</Link>
    </div>
  )
}

export default sidebar