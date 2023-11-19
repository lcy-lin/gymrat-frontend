import Image from "next/image";
export default function Card() {
    return (
        <div className="flex space-x-4 py-16 bg-blue-500 text-white dark:bg-gray-800 dark:text-gray-300">
            <div className="p-4 self-center">
                <h1 className="text-3xl font-bold">Sculpt Your Body,</h1>
                <h1 className="text-3xl font-bold">Calculate Your Victory</h1>
                <p className="mt-4">
                    Gym Rat is a web application that allows users to track their
                </p>
                <p className="mb-4">
                    workouts and calculate their BMI, BMR, and TDEE.
                </p>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Start Your Journey
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
            </div>
            <div className="overflow-hidden">
                <Image src="/giphy.gif" alt="girl pic" width="500" height="500" />
            </div>
        </div>
        
    );
}