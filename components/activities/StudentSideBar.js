import axios from "axios";
import SideBarButton from "./SideBarButton";
import StudentButton from "./StudentButton";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

export default function StudentSideBar(props) {
    const { cookies, setSelectedStudent } = props;
    const [studentsData, setStudentsData] = useState(null);
    useEffect(() => {
        if(!cookies.accessToken || !cookies.userId) return;
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/users/${cookies.userId}/students`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`,
                },
            }).then((res) => {
                console.log(res.data.data);
                setStudentsData(res.data.data);
            }).catch((err) => {
                console.log(err);
            });
    },[cookies.accessToken, cookies.userId]);

    return (
        <div className="relative flex flex-col bg-clip-border bg-gray-100 text-gray-700 min-h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 dark:bg-gray-900">
            <div className="mb-2 p-4">
                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900 dark:text-white">Students</h5>
            </div>
            <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                {/* <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full p-2 mb-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white pl-8"
                    />
                    <SearchIcon className="absolute left-2 top-2 text-gray-500 dark:text-gray-300" />
                </div> */}
                {studentsData?.map(({ id, name, picture }) => (
                    <StudentButton
                        key={id}
                        user_id={id}
                        name={name}
                        picture={picture}
                        onClick={() => setSelectedStudent({id: id, name: name, picture: picture})}
                    />
                ))}
            </nav>
        </div>
    );
}
