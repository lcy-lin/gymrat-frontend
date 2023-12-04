import DateComponent from "./DatePicker";
import AlertMessages from "@/utils/alertMessages";
import { useRef, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import Swal from "sweetalert2";

export default function Meal() {
    const mealRef = useRef(null);
    const cookies = parseCookies();
    const [selectedType, setSelectedType] = useState(null);
    const [date, setDate] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const data = {
            user_id: cookies.userId,
            description: mealRef.current.value,
            meal_type: selectedType,
            date: `${year}-${month}-${day}`
        };
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/cals/create`, {data}, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            }})
            .then(res => {
                console.log(res.data);
                AlertMessages.success("Meal added!");
            })
            .catch(err => {
                console.log(err);
                AlertMessages.error(err);
            });
    }
    return (
        <div className="rounded-xl dark:bg-gray-700 p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <label className="font-semibold dark:text-white">What did you eat?</label>
                <input
                    ref={mealRef}
                    type="text"
                    placeholder="30g oats and 3 eggs"
                    className="rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <DateComponent setDate={setDate} />
                <span>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select meal type</label>
                    <select
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="" disabled selected hidden>
                            Choose a type
                        </option>
                        <option value="breakfast">breakfast</option>
                        <option value="lunch">lunch</option>
                        <option value="dinner">dinner</option>
                        <option value="snack">snack</option>
                    </select>

                </span>
                <button type="submit" className=" self-center w-fit rounded-xl bg-blue-500 text-white font-semibold p-2">Submit</button>
            </form>
            
        </div>
    );
}