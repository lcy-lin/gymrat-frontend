import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
// import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import Avatar from "@/components/userpage/Avatar";
// import OrgCard from "@/components/userpage/OrgCard";
// import ActCard from "@/components/userpage/ActCard";
import CoachCard from "@/components/userpage/CoachCard";
import ChartBar from "@/components/userpage/ChartBar";
import BasicLineChart from "@/components/userpage/LineChart";
import CoachBar from "@/components/userpage/CoachBar";
import StudentCard from "@/components/userpage/StudentCard";
// import Timeline from "@/components/userpage/Timeline";
// import { CookieOutlined } from "@mui/icons-material";
import SetUp from "@/components/userpage/SetUp";
import Swal from "sweetalert2";
import { Co2Sharp } from "@mui/icons-material";

export default function Userpage() {
    const cookies = parseCookies();
    const [userData, setUserData] = useState(null);
    const [studentsData, setStudentsData] = useState(null);
    const router = useRouter()
    const query = router.query
    const userid = query?.userid;
    const [isUserPage, setIsUserPage] = useState(null);
    useEffect(() => {
        if (!cookies.accessToken || !userid || !cookies.userId) {
            return;
        }
        setIsUserPage(cookies.userId === userid);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userid}/profile`,{
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
        }).then((res) => {
            setUserData(res.data.data.user);
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userid}/students`,{
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
        }).then((res) => {
            console.log(res.data.data);
            setStudentsData(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [cookies.accessToken, cookies.userId, userid]);
    

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
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800 ">
            <Header />
            <div className="flex flex-row gap-2 justify-center my-auto">
                <div className="flex flex-col gap-2">
                    <Avatar data={userData} setUserData={setUserData} cookies={cookies} isUserPage={isUserPage}/>
                    {userData?.coach_id ? (
                        <CoachBar cookies={cookies} coach_id={userData.coach_id} />
                    ): (
                        userData?.role?.includes('student') && isUserPage && <CoachCard cookies={cookies} setUserData={setUserData} />
                    )}
                    {userData?.role?.includes('coach') && (<StudentCard studentsData={studentsData} />)}
                    {/* <OrgCard orgs={userData?.organizations}/> */}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <ChartBar cookies={cookies} userid={userid} />
                        <BasicLineChart cookies={cookies} userid={userid} isUserPage={isUserPage} />
                    </div>
                    <SetUp userid={userid} isUserPage={isUserPage}/>
                    {/* <Timeline /> */}
                </div>
            </div>
        </div>
    );
}