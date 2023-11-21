import React from "react";

const ButtonPrimary = ({ children, color = 'blue', addClass }) => {
  const buttonColor = color === 'red' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800' : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

  return (
    <button type="button" className={`text-white ${buttonColor} focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-2`}>
      {children}
      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </button>
  );
};

export default ButtonPrimary;
