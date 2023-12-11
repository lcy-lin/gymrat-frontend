import Link from 'next/link';
import AccountMenu from './AccountMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

export default function Header() {
  const cookies = parseCookies();
  const [userPic, setUserPic] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${cookies.userId}/profile`,{
      headers: {
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    }).then((res) => {
      setUserPic(res.data.data.user.picture);
    }).catch((err) => {
      console.log(err);
    });
  });
  return (
    <header className="bg-gray-200 dark:bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="font-semibold text-3xl text-blue-400">🐭Gym<span className='text-gray-700 dark:text-white'>Rat</span></span>
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Dashboard
          </Link>
          <Link href="/activities" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Activities
          </Link>
          <Link href="/meals" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Meals
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <AccountMenu userPic={userPic}/>
        </div>
      </nav>
    </header>
  )
}