import ThreeButtons from "./ThreeButtons";
export default function Title({setRecords}) {
    return (
        <div className="flex flex-row items-center font-bold text-xl m-4">
            <p className="mr-2 dark:text-white ">Add a new</p>
            <ThreeButtons setRecords={setRecords} />
            <p className="ml-2 dark:text-white">Record!</p>
        </div>
    );
}