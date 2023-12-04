export default function Tag({ children }) {
    const tags = [
        {
            name: "Default",
            color: "bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
        },
        {
            name: "Dark",
            color: "bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
        },
        {
            name: "Red",
            color: "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-700 dark:text-white"
        },
        {
            name: "Green",
            color: "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
        },
        {
            name: "Yellow",
            color: "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-700 dark:text-white"
        },
        {
            name: "Indigo",
            color: "bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300"
        },
        {
            name: "Purple",
            color: "bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-600 dark:text-white"
        },
        {
            name: "Pink",
            color: "bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300"
        },
    ] 
  
    const getTagColor = (tag) => {
        if (tag === "breakfast") {
            return tags[0].color;
        }
        else if (tag === "lunch") {
            return tags[3].color;
        }
        else if (tag === "dinner") {
            return tags[4].color;
        }
        else if (tag === "snack") {
            return tags[2].color;
        }
        else return tags[0].color;
    };
  
    const tagColor = getTagColor(children);
  
    return <span className={`${tagColor}`}>{children}</span>;
  }