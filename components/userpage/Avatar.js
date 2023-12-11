import { useState, } from "react";
import Image from "next/image";
import Chip from '@mui/material/Chip';
import EditRole from "./EditRole";
import axios from "axios";
import { Alert } from "@mui/material";
import AlertMessages from "@/utils/alertMessages";

export default function Avatar(props) {
    const {cookies, data, setUserData, isUserPage} = props;
    const [edit, setEdit] = useState(false);
    const handlePictureUpdate = ((event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("picture", file);
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/users/${cookies.userId}/picture`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${cookies.accessToken}`
            },
        }).then((res) => {
            setUserData((data) => {
                return {...data, picture: res.data.data.picture};
            });
            AlertMessages.success("Picture has been updated");
        }).catch((err) => {
            console.log(err);
            AlertMessages.error(err);
        });
    });
    return (
        <div className="flex flex-col items-center gap-4 bg-white border dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] w-fit p-6 rounded-xl">
            <span className="text-2xl font-bold dark:text-white">Profile</span>
            <span className="relative inline-block group">
                { isUserPage && (
                    <input
                        type="file"
                        id="file"
                        accept=".png, .jpg, .jpeg"
                        className="w-20 h-20 opacity-0 absolute inset-0 z-10 cursor-pointer"
                        onChange={handlePictureUpdate}
                    />
                )}
                {data?.picture != null ? (
                    <Image className="w-20 h-20 border rounded-full object-cover dark:border-gray-700" src={`${data?.picture}`} alt="user avatar" width={300} height={300}/>
                ) : (
                    <Image className="w-20 h-20 border rounded-full object-cover dark:border-gray-700" src="/avatar.png" alt="user avatar" width={20} height={20}/>
                )}
                {isUserPage && (
                <label htmlFor="file" className="w-20 h-20 rounded-full absolute inset-0 z-0 cursor-pointer opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 text-semibold transition-opacity flex items-center justify-center dark:text-white">
                    Upload
                </label>
                )}
            </span>

            
            <div className="flex flex-col items-center font-medium dark:text-white">
                <div className="flex flex-row">
                    <div>{data?.name}</div>
                    {data?.role.includes('admin') && (
                        <span class="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
                            <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
                            </svg>
                            <span class="sr-only">Icon description</span>
                        </span>
                    )}
                    
                </div>
                <div className="text-m text-gray-500 dark:text-gray-400 mb-2">Joined in {data?.created_at.split(' ')[0]}</div>
                {isUserPage && (
                    <>
                        {data && edit 
                            ? (<EditRole roles={data.role} edit={edit} setEdit={setEdit} setUserData={setUserData} cookies={cookies} />)
                            : (
                                <>
                                    <div className="grid grid-cols-2 gap-1 mb-2">
                                        {data?.role
                                            .filter((item) => item !== 'user')
                                            .map((filteredItem) => (
                                                <Chip key={filteredItem.id} label={`${filteredItem}`} color="primary" />
                                            ))}
                                    </div>
                                    <button className="px-4 py-2 font-md rounded-lg bg-gray-700 text-white" onClick={() => setEdit(true)}>Edit</button>
                                </>
                            )
                        }
                    </>
                )}

            </div>
        </div>
    );
}