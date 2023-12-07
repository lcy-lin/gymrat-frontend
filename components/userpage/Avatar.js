import Image from "next/image";
import Chip from '@mui/material/Chip';
export default function Avatar({data}) {
    return (
        <div className="mt-2 flex flex-col items-center gap-4 bg-white border dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] w-fit p-6 rounded-xl">
            <Image className="w-20 h-20 rounded-full" src="/girl.jpg" alt="user avatar" width={300} height={300}/>
            <div className="flex flex-col items-center font-medium dark:text-white">
                <div className="flex flex-row">
                    <div>{data?.name}</div>
                    {data?.role.includes('admin') && (
                        <span class="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
                            <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
                            </svg>
                            <span class="sr-only">Icon description</span>
                        </span>
                    )}
                    
                </div>
                
                <div className="text-m text-gray-500 dark:text-gray-400 mb-2">Joined in {data?.created_at.split(' ')[0]}</div>
                <div className="grid grid-cols-2 gap-1">
                    {data?.role.map((item) => (
                        <Chip key={item.id} label={`${item}`} color="primary" />
                    ))}
                </div>
            </div>
        </div>
    );
}