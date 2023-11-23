import { useState } from "react";
import Header from "@/components/Header";
import SideBar from "@/components/activites/SideBar";
import ActTable from "@/components/activites/ActTable";

export default function Activities() {
    const [selectedTag, setSelectedTag] = useState({category: 'All', emoji: '🎯'});
    return (
        <div className="dark:bg-gray-800">
            <Header />
            <div className="flex flex-row gap-4">
                <SideBar setSelectedTag={setSelectedTag}/>
                <ActTable selectedTag={selectedTag}/>
            </div>
            
        </div>
    );
}