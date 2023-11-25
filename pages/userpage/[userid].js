import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
// import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import Avatar from "@/components/userpage/Avatar";
import OrgCard from "@/components/userpage/OrgCard";
import ActCard from "@/components/userpage/ActCard";
import ChartBar from "@/components/userpage/ChartBar";
import BasicLineChart from "@/components/userpage/LineChart";
import Timeline from "@/components/userpage/Timeline";
export default function Userpage() {
    const cookies = parseCookies();
    const [userData, setUserData] = useState(null);
    const router = useRouter()
    const query = router.query
    const userid = query?.userid;
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userid}/profile`,{
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
        }).then((res) => {
            setUserData(res.data.data.user);
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }, [cookies.accessToken, userid]);
    

    const mockData = [
        {
            'id': '1', 
            'description': 'new pr 100kg 5 reps',
            'timestamp': '2023-10-01 12:00:00',
            'part': 'chest',
        },
        {
            'id': '3', 
            'description': 'legs day',
            'timestamp': '2023-9-30 13:00:00',
            'part': 'legs', 
        },
        {
            'id': '4', 
            'description': 'new pr pull up 10 reps',
            'timestamp': '2023-9-28 13:00:00',
            'part': 'back', 
        },
        {
            'id': '6', 
            'description': '',
            'timestamp': '2023-9-25 13:00:00',
            'part': 'arms', 
        },
    ];
    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 ">
            <Header />
            <div className="flex flex-row justify-center gap-4 py-6">
                <div className="flex flex-col gap-2">
                    <Avatar data={userData} />
                    {/* <OrgCard orgs={userData?.organizations}/> */}
                </div>
                <div>
                    <div className="flex items-center">
                        {mockData?.slice(0,4).map((item, index) => (
                            <ActCard userid={userid} data={item} key={item.id}>{item.part}</ActCard>
                        ))}
                        <button type="button" className="text-white h-7 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            More
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex mb-4">
                        <ChartBar />
                        <BasicLineChart />
                    </div>
                    <Timeline />
                </div>
            </div>
        </div>
    );
}