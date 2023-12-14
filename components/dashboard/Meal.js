import DateComponent from "./DatePicker";
import AlertMessages from "@/utils/alertMessages";
import getDateString from "@/utils/getDateString";
import { useRef, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import Swal from "sweetalert2";

export default function Meal() {
    const mealRef = useRef(null);
    const cookies = parseCookies();
    const [selectedType, setSelectedType] = useState(null);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const mealDescription = mealRef.current.value.trim();
        if (!mealDescription) {
            AlertMessages.error("Please enter a valid description for your meal.");
            return;
        }

        if (!selectedType) {
            AlertMessages.error("Please select a meal type.");
            return;
        }

        if (!date) {
            AlertMessages.error("Please select a date.");
            return;
        }
        setLoading(true);
        const dateString = getDateString(date);
        const data = {
            user_id: cookies.userId,
            description: mealRef.current.value,
            meal_type: selectedType,
            date: dateString
        };
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/cals/create`, {data}, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            }})
            .then(res => {
                setLoading(false); 
                Swal.fire({
                    title: 'Meal created!',
                      text: "You can now view your workout in the meals page.",
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'Go to meals page'
                }).then((result) => {
                      if (result.isConfirmed) {
                        window.location.href = "/meals";
                      }
                    })
            })
            .catch(err => {
                console.log(err);
                AlertMessages.error(err);
            });
    }
    return (
        <div className="rounded-xl bg-gray-200 dark:bg-gray-700 p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <label className="font-semibold dark:text-white">What did you eat?</label>
                <input
                    ref={mealRef}
                    type="text"
                    placeholder="30g oats and 3 eggs"
                    className="rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                />
                <p className="dark:text-gray-400">Please enter a string containing food or drink items. If you wish to calculate a specific quantity, you may prefix a quantity before an item. For example, 3 tomatoes or 1lb beef brisket. If no quantity is specified, the default quantity is 100 grams. The string cannot exceed 1500 characters.</p>
                <label className="font-semibold dark:text-white">When did you eat?</label>
                <DateComponent setDate={setDate} />
                <span>
                    <label htmlFor="countries" className="font-semibold dark:text-white">Select meal type</label>
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
                <button
                    disabled={loading}
                    type="submit"
                    className="self-center w-fit rounded-xl bg-blue-500 text-white font-semibold p-2">
                    {loading ? "Submitting...": "Submit"}
                </button>
            </form>
            
        </div>
    );
}