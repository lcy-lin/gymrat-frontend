export default function ActCard({children,userid, data}) {

    const parts = {
        'chest': 'bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white',
        'back': 'bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500',
        'legs': 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
        'arms': 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500',
        'shoulders': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500',
        'others': 'bg-white/[.1] text-white', 
      };
    return (
        <div className="flex flex-col bg-white m-2 border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="p-4 md:p-7">
                <time className="text-lg font-bold text-gray-800 dark:text-white">
                {data?.timestamp.split(' ')[0].replaceAll('-', '/')}
                </time>
                <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${parts[children]}`}>{children}</span>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                {data?.description ? data.description : 'No Description Yet!'}
                </p>
                <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href={`/records?userid=${userid}&recordid=${data?.id}`}>
                    Details
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </a>
                
            </div>
        </div>
    
    );
}