export default function TagBadge({tag}) {
    const parts = {
        'chest': 'bg-gray-200 text-gray-800 dark:bg-white/10 dark:text-white',
        'back': 'bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500',
        'legs': 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
        'arms': 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500',
        'shoulders': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500',
        'others': 'bg-white/[.1] text-white', 
      };
    return (
        <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium m-1 ${parts[tag]}`}>{tag}</span>
    );
}