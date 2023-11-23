export default function SideBarButton ({emoji, category, onClick}) {
    return (
        <div role="button" tabindex="0" className="flex items-center w-full p-3 font-semibold rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none dark:text-white" onClick={onClick}>
            <div className="grid place-items-center mr-4">
                {emoji}
            </div>
            {category}
        </div>
    )
}