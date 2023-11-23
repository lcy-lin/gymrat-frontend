import SetBox from "./SetBox";
import { useState } from "react";
export default function Row({num}) {
    const [numOfSets, setNumOfSets] = useState(3);

    const addSet = () => {
        setNumOfSets(prevNum => prevNum + 1);
    };
    const deleteSet = () => {
        setNumOfSets(prevNum => prevNum - 1);
    };

    return (
      <div className="flex flex-col rounded-xl bg-gray-200 h-fit mb-3">
        <div className="flex flex-row flex-grow p-4 gap-2 rounded-xl items-center m-1">
            <p className="w-10 border-r pr-2">#{num}</p>
            <span className="flex items-center">
                <p className="border border-gray-300 rounded-lg h-9 font-medium p-2 bg-gray-300 flex items-center">name</p>
                <input type="text" id="name" className="block w-48 h-9 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: bench press" />
            </span>
            <span className="flex items-center">
                <p className="border border-gray-300 rounded-lg h-9 font-medium p-2 bg-gray-300 flex items-center">sets</p>
                <input type="number" id="#sets" aria-describedby="helper-text-explanation" className="bg-gray-50 w-20 h-9 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: 3" required />
            </span>
            <span className="flex items-center">
                <p className="border border-gray-300 rounded-lg h-9 font-medium p-2 bg-gray-300 flex items-center">reps</p>
                <input type="number" id="#reps" aria-describedby="helper-text-explanation" className="bg-gray-50 w-20 h-9 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: 8" required />
            </span> 

            <span className="flex items-center">
                <p className="border border-gray-300 rounded-lg h-9 font-medium p-2 bg-gray-300 flex items-center">weight</p>
                <input type="text" id="weight" className="block w-20 h-9 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: 10kg"/> 
            </span>
        </div>
        <span className="flex items-center flex-grow ml-16 mr-4 mb-4">
            <p className="border border-gray-300 rounded-lg h-20 font-medium p-2 bg-gray-300 flex items-center">description</p>
            <textarea id="message" rows="3" className="block p-2.5 flex-grow text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </span>
        {/* <div className="flex ml-16 mb-4 gap-2">
            {[...Array(numOfSets)].map((_, index) => (
            <SetBox key={index} num={index + 1} />
            ))}
            <span className="flex flex-col">
                <button onClick={addSet} type="button" className="mb-1 text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                    <span className="sr-only">Add set</span>
                </button>
                <button onClick={deleteSet} type="button" className="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                    </svg>
                    <span className="sr-only">delete set</span>
                </button>
            </span>
        </div> */}
        <div className="flex flex-wrap ml-16 mb-4 gap-2">
            {[...Array(numOfSets)].map((_, index) => (
            <SetBox key={index} num={index + 1} />
            ))}
            <span className="flex flex-col">
                <button onClick={addSet} type="button" className="mb-1 text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                    <span className="sr-only">Add set</span>
                </button>
                <button onClick={deleteSet} type="button" className="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                    </svg>
                    <span className="sr-only">delete set</span>
                </button>
            </span>
      </div>
        

      </div>
    );
  }