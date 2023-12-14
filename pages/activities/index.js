import { useState, useEffect, use } from "react";
import Header from "@/components/Header";
import SideBar from "@/components/activities/SideBar";
import ActTable from "@/components/activities/ActTable";
import axios from "axios";
import { parseCookies } from "nookies";
import StudentSideBar from "@/components/activities/StudentSideBar";

export default function Activities() {
    const cookies = parseCookies();
    const user_id = cookies.userId;
    const [selectedTag, setSelectedTag] = useState({category: 'All', emoji: '🎯'});
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [coach, setCoach] = useState(false);
    const [studentMode, setStudentMode] = useState(false);
    const [actData, setActData] = useState(null);
    useEffect(() => {
        if(!cookies.accessToken || !user_id ) return;
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user_id}/profile`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`,
                },
            }).then((res) => {
                const roles = res.data.data.user.role;
                if (roles.includes('coach')) {
                    setCoach(true);
                }
            }).catch((err) => {
                console.log(err);
            });
    },[cookies.accessToken, user_id]);
    useEffect(() => {
        if(!cookies.accessToken || !user_id ) return;
        if (studentMode) {
            if (!selectedStudent) {
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/activities/records/students/${user_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                }).then((res) => {
                    setActData(res.data.data);
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/activities/search?category=all&user_id=${selectedStudent?.id}&pub_only=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${cookies.accessToken}`,
                        },
                    }).then((res) => {
                        setActData(res.data.activities);
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        } else {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/activities/search?category=${selectedTag.category.toLocaleLowerCase()}&user_id=${user_id}`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`,
                },
            }).then((res) => {
                setActData(res.data.activities);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [cookies.accessToken, selectedStudent, selectedStudent?.id, selectedTag, studentMode, user_id]);

    return (
        <div className="bg-gray-100 dark:bg-gray-800">
            <Header />
            <div className="flex flex-row gap-4">
                { studentMode 
                    ? <StudentSideBar
                        cookies={cookies}
                        setSelectedStudent={setSelectedStudent}
                        />
                    : <SideBar setSelectedTag={setSelectedTag}/>
                }
                
                <ActTable
                    coach={coach}
                    selectedTag={selectedTag}
                    actData={actData}
                    studentMode={studentMode}
                    setStudentMode={setStudentMode}
                    selectedStudent={selectedStudent}
                    setSelectedStudent={setSelectedStudent}
                    />
            </div>
            
        </div>
    );
}