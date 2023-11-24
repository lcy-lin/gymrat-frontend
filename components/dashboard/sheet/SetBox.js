export default function SetBox({ num }) {
  return (
    <div className="bg-white dark:bg-gray-600 shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-center items-center bg-gray-300 p-2 dark:bg-gray-500 dark:text-white">
        <p className="text-xl font-bold">Set {num}</p>
      </div>
      <div className="p-2 flex space-x-2">
        <input className="h-9 w-28 border-2 border-gray-300 p-2 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400" type="number" placeholder="Reps done" />
        <input className="h-9 w-32 border-2 border-gray-300 p-2 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400" type="number" placeholder="Strength left" />
      </div>
    </div>
  );
}
