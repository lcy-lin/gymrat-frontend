import SideBarButton from "./SideBarButton";
import Toggle from "./Toggle";

export default function SideBar({setSelectedTag}) {
    const tags = [
        { category: 'All', emoji: '🎯' },
        { category: 'Chest', emoji: '🏋️' },
        { category: 'Back', emoji: '🧗' },
        { category: 'Legs', emoji: '🦵' },
        { category: 'Arms', emoji: '💪' },
        { category: 'Shoulders', emoji: '🤷' },
        { category: 'Others', emoji: '🌐' }
    ];

    return (
        <div className="relative flex flex-col bg-clip-border bg-gray-100 text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 dark:bg-gray-900">
            <div className="mb-2 p-4">
                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900 dark:text-white">Activity Record Tags</h5>
            </div>
            <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                {tags.map(({ category, emoji }) => (
                    <SideBarButton
                        key={category}
                        emoji={emoji}
                        category={category}
                        onClick={() => setSelectedTag({category: category, emoji: emoji})}
                    />
                ))}
            </nav>
        </div>
    );
}
