import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SideBar from "@/components/activites/SideBar";
import ActTable from "@/components/activites/ActTable";
import axios from "axios";
import { parseCookies } from "nookies";

export default function Activities() {
    const cookies = parseCookies();
    const user_id = cookies.userId;
    const [selectedTag, setSelectedTag] = useState({category: 'All', emoji: '🎯'});
    const [actData, setActData] = useState(null);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/activities/search?category=${selectedTag.category.toLocaleLowerCase()}&user_id=${user_id}`,
        {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
        }).then((res) => {
            setActData(res.data.activities);
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }, [cookies.accessToken, selectedTag, user_id]);
    return (
        <div className="dark:bg-gray-800">
            <Header />
            <div className="flex flex-row gap-4">
                <SideBar setSelectedTag={setSelectedTag}/>
                <ActTable selectedTag={selectedTag} actData={actData} />
            </div>
            
        </div>
    );
}