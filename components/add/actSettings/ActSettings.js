import Toggle from "./Toggle";
import MultiSelect from "../Select";
export default function ActSettings({setTags, descriptionRef, publicity, setPublicity}) {
    return (
        <div className="w-5/6 bg-gray-300 p-3 rounded-xl shadow-lg mb-4 dark:bg-gray-700">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Activity Settings</h1>

            <div className="flex flex-row items-center space-around gap-2">
                <MultiSelect setTags={setTags}/>
                <Toggle publicity={publicity} setPublicity={setPublicity} />
            </div>
            <span className="flex items-center flex-grow">
                <p className="border border-gray-200 rounded-lg h-20 font-medium p-2 bg-gray-200 flex items-center dark:bg-gray-500 dark:text-white dark:border-none">description</p>
                <textarea
                    id="message"
                    rows="3"
                    className="block p-2.5 flex-grow text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Add a description for this workout..."
                    ref={descriptionRef}
                    required />
            </span>
            
        </div>
    );
}