import SetBox from "./SetBox";
import { useState } from "react";
export default function Row({num, data, index, onInputChange}) {

    const [numOfSets, setNumOfSets] = useState(3);
    const [setBoxData, setSetBoxData] = useState(Array.from({ length: 3 }, () => ({})));
    // const handleSetBoxDataChange = (setIndex, setData) => {
    //     const newSetBoxData = [...setBoxData];
    //     newSetBoxData[setIndex] = setData;
    //     setSetBoxData(newSetBoxData);
    //     const newRowData = {
    //         ...data,
    //         num_of_sets: numOfSets,
    //         sets: newSetBoxData,
    //     };
    //     onInputChange(index, newRowData);
    // };
    const handleSetBoxDataChange = (setIndex, setData) => {
        const newSetBoxData = [...setBoxData];
        newSetBoxData[setIndex] = { ...setData, set_num: setIndex + 1 };
        setSetBoxData(newSetBoxData);
    
        const newRowData = {
          ...data,
          num_of_sets: numOfSets,
          sets: newSetBoxData,
        };
    
        onInputChange(index, newRowData);
      };
    
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        const newValue = id === "rep_goal" ? parseInt(value, 10) : value;
        let newData = {
          ...data,
          num_of_sets: numOfSets,
          [id]: newValue,
          sets: setBoxData,
        }
        onInputChange(index, newData);
    };
    return (
      <div className="flex flex-col rounded-xl bg-gray-200 h-fit mb-3 w-5/6 shadow-xl dark:bg-gray-700">
            <div className="flex flex-row flex-grow p-4 gap-2 rounded-xl items-center m-1">
                <p className="w-10 pr-2 font-semibold dark:text-white">#{num}</p>
                <span className="flex items-center">
                    <p className="border border-gray-300 rounded-lg h-9 font-medium p-2 bg-gray-300 flex items-center dark:bg-gray-500 dark:text-white dark:border-none">name</p>
                    <input
                        type="text"
                        id="name"
                        onChange={handleInputChange}
                        className="block w-48 h-9 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="ex: bench press" 
                        required
                    />
                </span>
                <span className="flex items-center">
                    <p className="border border-gray-300 rounded-lg h-9 font-medium p-2 bg-gray-300 flex items-center dark:bg-gray-500 dark:text-white dark:border-none">sets</p>
                    <input
                        value={numOfSets}
                        onChange={(e) => setNumOfSets(Math.max(1, e.target.value))}
                        type="number"
                        id="num_of_sets"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 w-20 h-9 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="ex: 3"
                        required
                    />
                </span>
                <span className="flex items-center">
                    <p className="border border-gray-300 rounded-lg h-9 font-medium p-2 bg-gray-300 flex items-center dark:bg-gray-500 dark:text-white dark:border-none">reps</p>
                    <input
                        type="number"
                        id="rep_goal"
                        onChange={handleInputChange}
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 w-20 h-9 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="ex: 8"
                        required
                    />
                </span> 

                <span className="flex items-center">
                    <p className="border border-gray-300 rounded-lg h-9 font-medium p-2 bg-gray-300 flex items-center dark:bg-gray-500 dark:text-white dark:border-none">weight</p>
                    <input
                        type="text"
                        id="weight"
                        onChange={handleInputChange}
                        className="block w-20 h-9 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="ex: 10kg"/> 
                </span>
            </div>
            <span className="flex items-center flex-grow ml-16 mr-4 mb-4">
                <p className="border border-gray-300 rounded-lg h-20 font-medium p-2 bg-gray-300 flex items-center dark:bg-gray-500 dark:text-white dark:border-none">description</p>
                <textarea
                    id="description"
                    rows="3"
                    onChange={handleInputChange}
                    className="block p-2.5 flex-grow text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    required />
            </span>
        
        <div className="flex flex-wrap ml-16 mb-4 gap-2">
            {Array.from({ length: numOfSets }).map((_, index) => (
                <SetBox
                    key={index}
                    num={index + 1}
                    data={setBoxData[index]}
                    index={index}
                    onDataChanged={handleSetBoxDataChange}
                />
            ))}
        </div>
      </div>
    );
  }