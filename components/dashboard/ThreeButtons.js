export default function ThreeButtons({setRecords}) {    
    return (
        <div className="inline-flex rounded-md shadow-sm">
            <button onClick={() => setRecords('weight')} className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:bg-gray-200 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-500 dark:focus:text-white">
                Weight
            </button>
            <button onClick={() => setRecords('activity')} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:bg-gray-200 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-500 dark:focus:text-white">
                Activity
            </button>
            <button onClick={() => setRecords('meal')} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:bg-gray-200 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-500 dark:focus:text-white">
                Meal
            </button>
        </div>

    );
}