import Link from 'next/link'
import React from 'react'

const sidebar = () => {
  return (
    <div className='flex flex-col sidebar'>
      <div className='lang mt-4'>
        <Link href='/editor/javascript'>
          <img src="/icons/js.png" alt="" />
        </Link>
        </div>
      <div className='lang'>
        <Link href='/editor/python'>
          <img src="/icons/python.png" alt="" />
        </Link>
      </div>
      <div className="lang">
        <Link href='/editor/go'>
          <img src="/icons/go.webp" alt="" />
        </Link>
      </div>
      <div className="lang">
      <Link href='/editor/php'>
        <img src="/icons/php.png" alt="" />
      </Link>
      </div>
      <div className="lang">
      <Link href='/editor/swift'>
        <img src="/icons/swift.png" alt="" />
      </Link>
      </div>
      <div className="lang">
      <Link href='/editor/rust'>
        <img src="/icons/rust.png" alt="" />
      </Link>
      </div>
      <div className="lang">
      <Link href='/editor/c'>
        <img src="/icons/C.png" alt="" />
      </Link>
      </div>
    </div>
  )
}

export default sidebar