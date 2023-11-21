import Image from "next/image";
export default function Avatar({name="username", joined="default date"}) {
    return (
        <div className="flex flex-col items-center gap-4 bg-white border dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] w-fit p-6 rounded-xl">
            <Image className="w-20 h-20 rounded-full" src="/girl.jpg" alt="user avatar" width={300} height={300}/>
            <div className="flex flex-col items-center font-medium dark:text-white">
                <div>{name}</div>
                <div className="text-m text-gray-500 dark:text-gray-400">Joined in {joined}</div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
                Edit Profile
            </button>
        </div>
    );
}