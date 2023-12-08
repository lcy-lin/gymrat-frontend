import { useState, useEffect } from "react";
import Image from "next/image";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import AlertMessages from "@/utils/alertMessages";
import Swal from "sweetalert2";

export default function CoachCard(props) {
    const { cookies, setUserData} = props;
    const [edit, setEdit] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [coachData, setCoachData] = useState(null);
    const [selectedCoach, setSelectedCoach] = useState(null);
    useEffect(() => {
        if (!keyword || !cookies.accessToken ) {
            setCoachData(null);
            return;
        }
        if (selectedCoach?.name === keyword) {
            return;
        }

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/users/search?keyword=${keyword}`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
        }).then((res) => {
            setCoachData(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    },[cookies.accessToken, keyword, selectedCoach]);
    const handleCancel = () => {
        setEdit(false);
        setKeyword("");
        setCoachData(null);
        setSelectedCoach(null);
    }
    const handleSave = () => {
        if (!selectedCoach) {
            return;
        }
        axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/users/${cookies.userId}/coach`, {
            coach_id: selectedCoach.id,
        }, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
        }).then((res) => {
            AlertMessages.success("Coach has been set");
            setUserData((data) => {
                return {...data, coach_id: selectedCoach.id};
            
            })
        }).catch((err) => {
            console.log(err);
            AlertMessages.error("Something went wrong");
        });
        setKeyword("");
        setEdit(false);
    };
    const handleSelect = (id, name) => () => {
        setKeyword(name);
        setCoachData(null);
        setSelectedCoach({ id, name });
    };
    return (
        <div className="bg-gray-800 border dark:border-gray-700 rounded-lg p-2 dark:text-white flex flex-col items-center">
            <span className="flex flex-row justify-between mb-2">
                <h1 className="font-bold">Update your coach</h1>
                {!edit && <EditIcon onClick={() => {setEdit(true)}} />}
            </span>
            {edit && 
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Coach name"
                        className="dark:bg-gray-800 rounded-xl w-44"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <div className="z-10">
                        {coachData && coachData?.map((item, index) => (
                            <div onClick={handleSelect(item.id, item.name)} key={item.id} className="flex flex-row items-center bg-gray-700 rounded-xl p-2 w-44">
                                <Image src="/avatar.png" height={50} width={50} alt="coach avatar"className="rounded-full"/>
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* {selectedCoach ? (
                        <div className="flex flex-row items-center bg-gray-700 rounded-xl p-2 w-44">
                            <Image src="/avatar.png" height={50} width={50} alt="coach avatar" className="rounded-full" />
                            <span>{selectedCoach.name}</span>
                        </div>
                    ) : (
                        <div className="z-10">
                            {coachData && coachData?.map((item, index) => (
                                <div key={item.id} className="flex flex-row items-center bg-gray-700 rounded-xl p-2 w-44" onClick={handleSelect(item.id, item.name)}>
                                    <Image src="/avatar.png" height={50} width={50} alt="coach avatar" className="rounded-full" />
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                     */}
                    <div className="self-center flex gap-2">
                        <button onClick={handleSave} className="bg-blue-500 w-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
                            Save
                        </button>
                        <button onClick={handleCancel} className="bg-red-500 w-20 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">
                            Cancel
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}