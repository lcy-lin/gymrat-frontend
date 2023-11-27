import { useState } from "react";
import Row from "./sheet/Row";

export default function Sheet() {
  const [numOfRows, setNumOfRows] = useState(1);
  const addMove = () => {
    setNumOfRows(prevNum => prevNum + 1);
  };    
  const deleteMove = () => {
    setNumOfRows(prevNum => prevNum - 1);
  };
  return (

    <div className="flex flex-col items-center mb-2">
      {Array.from({ length: numOfRows }, (_, index) => (
        <Row key={index + 1} num={index + 1} />
      ))}
      <div className="flex flex-row gap-2">
        <button onClick={addMove} type="button" className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-gray-400 dark:focus:ring-blue-800">
            Add move 🟢
        </button>
        <button  onClick={deleteMove} type="button" className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-gray-400 dark:focus:ring-blue-800">
            Delete move 🔴
        </button>
        <button  type="button" className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-gray-400 dark:focus:ring-blue-800">
            Create workout 🟡
        </button>
      </div>
      
    </div>
  );
}
