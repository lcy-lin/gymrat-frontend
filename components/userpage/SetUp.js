import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { parseCookies } from "nookies";
import EditIcon from '@mui/icons-material/Edit';

export default function SetUp(props) {
    const [bodyData, setBodyData] = useState(null);
    const [edit, setEdit] = useState(false);
    const [selectedSex, setSelectedSex] = useState(null);
    const [selectedAct, setSelectedAct] = useState(null);
    const cookies = parseCookies();
    const heightRef = useRef(null);
    const weightRef = useRef(null);
    const ageRef = useRef(null);
    const actFactor = ['sedentary (little to no exercise + work a desk job)', 'lightly active (light exercise 1-3 days / week)', 'moderately active (exercise 3-5 days / week) ', 'very active (heavy exercise 6-7 days / week)', 'extra active  (very heavy exercis, training 2x / day) '];
    const { userid, isUserPage } = props;
    useEffect(() => {
        if (!cookies.accessToken || !userid) {
            return;
        };
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/bodies/${userid}`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
            },
        }).then((res) => {
            setBodyData(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [cookies.accessToken, userid]);

    useEffect(() => {
        if (bodyData) {
            setSelectedSex(bodyData.sex);
            setSelectedAct(bodyData.act_level);
        }
    }, [bodyData]);

    const handleEditClick = () => {
        setEdit(true);
    }
    const handleSaveClick = () => {
        setEdit(false);
        axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/bodies/${cookies.userId}`,
            {
                data: {
                    height: heightRef.current.value,
                    weight: weightRef.current.value,
                    age: ageRef.current.value,
                    sex: selectedSex,
                    act_level: selectedAct,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`,
                },
            }
        )
            .then((res) => {
                setBodyData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    return (
        <div className="border p-4 m-2 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            <span className="flex flex-row gap-2 mb-4">
               <h1 className="text-2xl font-semibold ">Basic Information</h1>
               {isUserPage && !edit && (
                <EditIcon className="text-gray-400 hover:text-gray-600 cursor-pointer" onClick={handleEditClick}/> )
                }
                
            </span>
            
            <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-row mb-2 items-center">
                    <p className="font-semibold">Height:</p>
                    {edit
                        ? <input
                            ref={heightRef}
                            className="border-gray-600 rounded-md ml-2 w-20 h-9 dark:bg-gray-700"
                            type="text"
                            defaultValue={bodyData?.height}
                        />
                        : <p className="ml-2">{bodyData?.height} cm</p>}
                </div>
                <div className="flex flex-row mb-2 items-center">
                    <p className="font-semibold">Latest Weight:</p>
                    <p className="ml-2">{bodyData?.weight} kg</p>
                </div>
                <div className="flex flex-row mb-2 items-center">
                    <p className="font-semibold">Age:</p>
                    {edit
                        ? <input
                            ref={ageRef}
                            className="border-gray-600 rounded-md ml-2 w-20 h-9 dark:bg-gray-700"
                            type="number"
                            defaultValue={bodyData?.age}
                        />
                        : <p className="ml-2">{bodyData?.age}</p>}
                </div>
                <div className="flex flex-row mb-2 items-center">
                    <p className="font-semibold">Sex:</p>
                    {edit
                        ? <select
                            id="sex"
                            className="ml-2 w-30 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue={selectedSex}
                            onChange={(e) => setSelectedSex(e.target.value)}
                            >
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="non-binary">non binary</option>
                            </select>
                        : <p className="ml-2">{bodyData?.sex}</p>}
                </div>
                <div className="col-span-2 flex flex-row mb-2 items-center">
                    <p className="font-semibold">Activity Level:</p>
                    {edit
                        ? <select
                            id="actLevel"
                            className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue={selectedAct}
                            onChange={(e) => setSelectedAct(e.target.value)}
                            >
                                <option value="0">sedentary</option>
                                <option value="1">lightly active</option>
                                <option value="2">moderately active</option>
                                <option value="3">very active</option>
                                <option value="4">extra active</option>
                            </select>
                        : <p className="ml-2">{actFactor[bodyData?.act_level]}</p>}
                </div>
                { (bodyData?.sex === 'female' || bodyData?.sex === 'male') && (
                    <>
                       
                        <div className="flex flex-row mb-2 items-center">
                            <p className="font-semibold">BMR:</p>
                            <p className="ml-2">{Math.round(bodyData?.bmr)} cals</p>
                        </div>
                        <div className="flex flex-row mb-2 items-center">
                            <p className="font-semibold">TDEE:</p>
                            <p className="ml-2">{`${Math.round(bodyData?.tdee)} cals`}</p>
                        </div>
                    </>
                        
                    )}
                {edit && (
                    <div>
                        <button
                            className="text-white w-20 p-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                            onClick={handleSaveClick}
                        >
                            Save
                        </button>
                        <button
                            className="ml-2 text-white w-20 p-2 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            type="button"
                            onClick={() => setEdit(false)}
                        >
                            Cancel
                        </button>
                    </div>
                    
                )}
            </div>
        </div>
    );
}
