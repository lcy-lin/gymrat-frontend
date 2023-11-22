import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Image from 'next/image';
import AccountMenu from './AccountMenu';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {

  return (
    <header className="bg-gray-200 dark:bg-gray-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="font-semibold text-blue-400">Gym<span className='text-gray-700 dark:text-white'>Rat</span></span>
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
          <Link href="/body" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Body
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/userpage/1" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            <AccountMenu />
          </Link>
        </div>
      </nav>
    </header>
  )
}